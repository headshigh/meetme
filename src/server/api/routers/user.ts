import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.prisma.user.create({
        data: {
          name: input.name,
          username: input.username,
          password: input.password,
          email: input.email,
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
});
