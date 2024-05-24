import { z } from "zod";

export const addBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title should be atleast 1 character long")
    .max(60, "Title cannot be longer that 60 character"),
  content: z.string().min(1, "Please type some content"),
  coverImgURL: z.union([z.string(), z.undefined()]),
});
