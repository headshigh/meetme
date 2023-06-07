import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
export const bookingRouter = createTRPCRouter({
  createBooking: publicProcedure
    .input(
      z.object({
        eventTypeId: z.number(),
        startTime: z.date(),
        endTime: z.date(),
        userId: z.string(),
        participants: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const participantsData = input.participants.map((participantId) => ({
        userId: participantId,
      }));
      const booking = await ctx.prisma.booking.create({
        data: {
          userId: input.userId,
          startTime: input.startTime,
          eventTypeId: input.eventTypeId,
          endTime: input.endTime,
          participants: {
            create: participantsData,
          },
        },
      });
      if (!booking) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return booking;
    }),
  getUserBooking: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.booking.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
});
