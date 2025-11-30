import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/domains/auth/lib/server";

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(),
    query: {
      disableCookieCache: true,
    },
  });

  return session?.user;
});
