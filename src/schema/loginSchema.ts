import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be atleast two characters" })
    .max(20, { message: "Username must be no more than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username must not contain special character",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
