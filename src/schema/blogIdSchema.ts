import { z } from "zod";

export const blogIdSchema = z.object({
  blogId: z.string(),
});
