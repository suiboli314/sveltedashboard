import { sequence } from "@sveltejs/kit/hooks";
import {
  sessionCookieName,
  validateSessionToken,
  setSessionTokenCookie,
  deleteSessionTokenCookie
} from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";
import { paraglideMiddleware } from "$lib/paraglide/server";

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale)
    });
  });

const handleAuth: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(sessionCookieName);

  if (!sessionToken) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(sessionToken);

  if (session) setSessionTokenCookie(event, sessionToken, session.expiresAt);
  else deleteSessionTokenCookie(event);

  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleAuth);
