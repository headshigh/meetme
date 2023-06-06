import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventTypeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.eventType.findMany();
    return result;
  }),
  getUserEventTypes: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.eventType.findMany({
        where: {
          userId: input.userId,
        },
      });
      return result;
    }),
  getSingle: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.eventType.findUnique({
        where: {
          id: input.id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
});
