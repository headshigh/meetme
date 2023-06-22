import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import booking from "../../../interfaces/singleBooking";
export const bookingRouter = createTRPCRouter({
  createBooking: publicProcedure
    .input(
      z.object({
        eventTypeId: z.number(),
        startTime: z.string(),
        endTime: z.string(),
        date: z.string(),
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
          date: input.date,
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
  cancelBooking: publicProcedure
    .input(
      z.object({
        userId: z.string(), //get userid from usesession todo
        bookingId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedbookinguser = await ctx.prisma.bookingUser.deleteMany({
        where: {
          bookingId: input.bookingId,
        },
      });
      const deletedbooking = await ctx.prisma.booking.deleteMany({
        where: {
          userId: input.userId,
          id: input.bookingId,
        },
      });

      if (deletedbooking && deletedbookinguser)
        return { status: true, msg: "deleted booking successfully" };
      return { status: false, msg: "unable to delete" };
    }),
});
