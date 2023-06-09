import { exampleRouter } from "n/server/api/routers/example";
import { createTRPCRouter } from "n/server/api/trpc";
import { eventTypeRouter } from "./routers/eventType";
import { bookingRouter } from "./routers/booking";
import { userRouter } from "./routers/user";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  eventType: eventTypeRouter,
  booking: bookingRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
