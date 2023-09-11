import { appRouter } from "@/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: (opts) => {
      const { error, type, path, input, ctx, req } = opts;
      console.error("Error:", error);
      if (error.code === "UNAUTHORIZED") {
        console.log("Call to a protected procedure while not authorized");
      }
    },
    // onError(otps) {
    //   const { error, type, path, input, ctx, req } = opts;
    //   console.error('Error:', error);
    //   if (error.code === 'INTERNAL_SERVER_ERROR') {
    //     // send to bug reporting
    //   }
    // }
  });

export { handler as GET, handler as POST };
