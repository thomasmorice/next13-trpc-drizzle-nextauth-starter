import { router, publicProcedure, protectedProcedure } from "./trpc";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// const client = postgres(process.env.DATABASE_URL || "");
// export const db = drizzle(client);

export const whoAmIRouter = router({
  getPing: publicProcedure.query(async ({}) => {
    return {
      name: "Testing",
      ping: "success",
    };
  }),
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session.user;
  }),
});
