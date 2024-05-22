import { z } from "zod";

export const signupSchema = z.object({
  fullname: z
    .string()
    .min(1, "Enter full name")
    .max(20, "Restrict name to 20 characters"),
  username: z
    .string()
    .min(2, { message: "Username must be atleast two characters" })
    .max(20, { message: "Username must be no more than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username must not contain special character",
    }),
  email: z.string().min(1, "Enter Email").email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
