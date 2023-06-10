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
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        hidden: z.boolean(),
        length: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.title.length == 0 || !input.length) {
        return {
          err: "necessary data not provided",
        };
      }
      const neweventtype = await ctx.prisma.eventType.create({
        data: {
          title: input.title,
          description: input.description,
          hidden: input.hidden,
          length: input.length,
          userId: input.userId,
        },
      });
      return neweventtype;
    }),
});
