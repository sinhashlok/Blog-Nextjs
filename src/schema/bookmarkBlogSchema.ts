import { z } from "zod";

export const bookmarkBlogSchema = z.object({
  blogId: z.string(),
});
