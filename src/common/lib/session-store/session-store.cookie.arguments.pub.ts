import fastifySession from 'fastify-session';

export const sessionStore_cookie_Args: fastifySession.CookieOptions = {
    secure: true,
    maxAge: 3600,
    sameSite: true
  }