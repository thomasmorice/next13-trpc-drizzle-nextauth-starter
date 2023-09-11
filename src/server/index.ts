import { router, publicProcedure } from "./trpc";

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { whoAmIRouter } from "./who-am-i-router";

// migrate(db, { migrationsFolder: "./drizzle" });

export const appRouter = router({
  whoAmI: whoAmIRouter,
});

export type AppRouter = typeof appRouter;
