import type { RequestEvent } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import {
  user as userTable,
  session as sessionTable,
  type Session
} from "$lib/server/db/schema";
import { getRandomValues, createHash } from "node:crypto";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = "auth-session";

export function generateSessionToken() {
  const bytes = getRandomValues(new Uint8Array(18));
  // Convert to base64url (RFC 4648 §5)
  const token = Buffer.from(bytes).toString("base64url");
  return token;
}

export async function createSession(token: string, userId: string) {
  const sessionId = createHash("sha256").update(token).digest("hex");
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + DAY_IN_MS * 7)
  };
  await db.insert(sessionTable).values(session);
  return session;
}

export async function validateSessionToken(token: string) {
  const sessionId = createHash("sha256").update(token).digest("hex");
  const [result] = await db
    .select({
      // Adjust user table here to tweak returned data
      user: {
        id: userTable.id,
        username: userTable.username,
        avatar: userTable.avatar,
        email: userTable.email
      },
      session: sessionTable
    })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));

  if (!result) return { session: null, user: null };

  const { session, user } = result;

  const sessionExpired = Date.now() >= session.expiresAt.getTime();
  if (sessionExpired) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }

  const renewSession =
    Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 2;
  if (renewSession) {
    session.expiresAt = new Date(Date.now() + DAY_IN_MS * 4);
    await db
      .update(sessionTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionTable.id, session.id));
  }

  return { session, user };
}

export type SessionValidationResult = Awaited<
  ReturnType<typeof validateSessionToken>
>;

export const invalidateSession = async (sessionId: string) =>
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));

export const setSessionTokenCookie = (
  event: RequestEvent,
  token: string,
  expiresAt: Date
) =>
  event.cookies.set(sessionCookieName, token, {
    expires: expiresAt,
    path: "/"
  });

export const deleteSessionTokenCookie = (event: RequestEvent) =>
  event.cookies.delete(sessionCookieName, { path: "/" });
