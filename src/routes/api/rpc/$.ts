import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { createFileRoute } from "@tanstack/react-router";
import { createContext } from "@/domains/shared/server/orpc/context";
import { appRouter } from "@/domains/shared/server/orpc/routers";

const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error: Error) => {
      console.error(error);
    }),
  ],
});

async function handle({ request }: { request: Request }) {
  const rpcResult = await rpcHandler.handle(request, {
    prefix: "/api/rpc",
    context: await createContext({ req: request }),
  });
  if (rpcResult.response) return rpcResult.response;

  return new Response("Not Found", { status: 404 });
}

export const Route = createFileRoute("/api/rpc/$")({
  server: {
    handlers: {
      HEAD: handle,
      GET: handle,
      POST: handle,
      PUT: handle,
      PATCH: handle,
      DELETE: handle,
    },
  },
});
