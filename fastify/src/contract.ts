import { z } from "zod";
import { os } from "@orpc/server";

// Define a tiny contract (router + procedure)
export const appRouter = os.router({
  hello: os
    .input(z.object({ name: z.string().min(1) }))
    .handler(async ({ input }) => {
      return { message: `Hello, ${input.name}!` };
    }),
});

export type AppRouter = typeof appRouter;
