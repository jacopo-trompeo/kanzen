import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/domains/auth/lib/server";

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
      query: {
        disableCookieCache: true,
      },
    });

    if (!session) {
      throw redirect({
        to: "/sign-in",
      });
    }

    return next({
      context: { session },
    });
  },
);
