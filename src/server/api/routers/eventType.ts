import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const eventTypeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.eventType.findMany();
    return result;
  }),
  getPubllicPageEventtypes: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const eventtypes = await ctx.prisma.eventType.findMany({
        where: {
          userId: input.userId,
          hidden: false,
        },
      });
      if (!eventtypes)
        throw new TRPCError({ code: "NOT_FOUND", message: "usernot found" });
      return eventtypes;
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
  hideEvent: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.prisma.eventType.update({
        where: {
          id: input.id,
        },
        data: {
          hidden: true,
        },
      });
      if (!updated)
        return new TRPCError({ code: "NOT_FOUND", message: "id not found" });
    }),
  unhideEvent: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.prisma.eventType.update({
        where: {
          id: input.id,
        },
        data: {
          hidden: false,
        },
      });
      if (!updated)
        return new TRPCError({ code: "NOT_FOUND", message: "id not found" });
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
