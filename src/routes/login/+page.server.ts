import { hash, verify } from "@node-rs/argon2";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
  invalidateSession,
  deleteSessionTokenCookie
} from "$lib/server/auth";
import { db } from "$lib/server/db";
import { user as userTable } from "$lib/server/db/schema";
import type { Actions, PageServerLoad } from "./$types";
import { m } from "$lib/paraglide/messages";
import { getRandomValues, randomUUID } from "node:crypto";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) redirect(302, "/user/" + event.locals.user.username);
  return {};
};

export const actions = {
  login: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (!validateUsername(username))
      return fail(400, {
        message: m.invalid_login({
          query: "username",
          hint: "3-31 characters, lowercase letters, numbers, underscores, and hyphens"
        })
      });

    if (!validatePassword(password))
      return fail(400, {
        message: m.invalid_login({
          query: "password",
          hint: "min 6, max 255 characters"
        })
      });

    try {
      const results = await db
        .select({ id: userTable.id, passwordHash: userTable.passwordHash })
        .from(userTable)
        .where(eq(userTable.username, username));

      const existingUser = results.at(0);
      if (!existingUser)
        return fail(400, { message: m.invalid_login_attempt() });

      const validPassword = await verify(existingUser.passwordHash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
      });

      if (!validPassword)
        return fail(400, { message: m.invalid_login_attempt() });

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, existingUser.id);
      setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (e) {
      console.error("Error during login:", e);
      return fail(500, { message: m.server_error() });
    }
    redirect(302, "/user/" + username);
  },
  register: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (!validateUsername(username))
      return fail(400, {
        message: m.invalid_login({
          query: "username",
          hint: "3-31 characters, lowercase letters, numbers, underscores, and hyphens"
        })
      });

    if (!validatePassword(password))
      return fail(400, {
        message: m.invalid_login({
          query: "password",
          hint: "min 6, max 255 characters"
        })
      });

    const userId = generateUserId();
    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });

    try {
      const [result] = await db
        .select({ id: userTable.id })
        .from(userTable)
        .where(eq(userTable.username, username));

      if (result) return fail(400, { message: m.user_already_exists() });

      await db.insert(userTable).values({ id: userId, username, passwordHash });

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, userId);
      setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (e) {
      console.error("Error during registration:", e);
      return fail(500, { message: m.server_error() });
    }
    return redirect(302, "/user/" + username);
  },
  logout: async (event) => {
    if (!event.locals.session) return fail(401);

    await invalidateSession(event.locals.session.id);
    deleteSessionTokenCookie(event);

    return redirect(302, "/login");
  }
} satisfies Actions;

function generateUserId() {
  // ID with 120 bits of entropy, or about the same as UUID v4.
  const bytes = getRandomValues(new Uint8Array(15));
  const id = randomUUID();
  return id;
}

function validateUsername(username: unknown): username is string {
  return (
    typeof username === "string" &&
    username.length >= 3 &&
    username.length <= 31 &&
    /^[a-z0-9_-]+$/.test(username)
  );
}

function validatePassword(password: unknown): password is string {
  return (
    typeof password === "string" &&
    password.length >= 6 &&
    password.length <= 255
  );
}
