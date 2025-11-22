import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/lib/auth/server";

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
      query: {
        disableCookieCache: true,
      },
    });
    return next({
      context: { session },
    });
  },
);
