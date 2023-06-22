import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const userRouter = createTRPCRouter({
  getUserInfo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", msg: "user not found" });
      }
      return {
        username: user.username,
        name: user.name,
        image: user.image,
        workingHours: user.workingHours,
        id: user.id,
      };
    }),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        email: z.string(),
        password: z.string(),
        workingHours: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input.workingHours);
      const user = ctx.prisma.user.create({
        data: {
          name: input.name,
          username: input.username,
          password: input.password,
          email: input.email,
          workingHours: input.workingHours,
        },
      });
      return user;
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const existinguser = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (!existinguser) {
        return {
          msg: "no user exists with that email",
          status: false,
          user: null,
        };
      } else {
        if (existinguser.password != input.password) {
          return {
            status: false,
            msg: "Incorrect password",
            user: null,
          };
        }
        return {
          status: true,
          msg: `logged in`,
          user: existinguser,
        };
      }
    }),
  getUserWorikngHours: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });
      if (!user)
        return new TRPCError({ code: "NOT_FOUND", msg: "user not found" });
      return { workingHours: user.workingHours };
    }),
});
