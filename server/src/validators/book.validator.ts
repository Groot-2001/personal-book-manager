import { z } from "zod";

export const createBookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100),

  author: z
    .string()
    .trim()
    .min(1, "Author is required")
    .max(100),

  status: z.enum([
    "want-to-read",
    "reading",
    "completed",
  ]),

  tags: z.array(z.string().trim()).optional(),
});

export const updateBookSchema =
  createBookSchema.partial();

export const bookQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  search: z.string().optional(),
  tag: z.string().optional(),
  status: z
    .enum([
      "want-to-read",
      "reading",
      "completed",
    ])
    .optional(),

  sortBy: z
    .enum([
      "createdAt",
      "title",
      "author",
    ])
    .default("createdAt"),

  order: z
    .enum(["asc", "desc"])
    .default("desc"),
});