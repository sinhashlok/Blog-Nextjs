import { z } from "zod";

export const addCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Title should be atleast 1 character long")
    .max(100, "Title cannot be longer that 60 character"),
  blogId: z.string(),
});
