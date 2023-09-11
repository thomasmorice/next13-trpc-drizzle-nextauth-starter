import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth/next";

const t = initTRPC.context().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const session = await getServerSession({
    callbacks: {
      async session({ session, token }) {
        if (token.sub) {
          session.user = {
            ...session.user,
            id: token.sub,
          };
        }
        return session;
      },
    },
  });
  if (!session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: session,
    },
  });
});

// /**
//  * Protected procedure
//  **/
export const protectedProcedure = t.procedure.use(isAuthed);
