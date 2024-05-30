import { z } from "zod";

export const getBlogSchema = z.object({
  blogId: z.string(),
});
