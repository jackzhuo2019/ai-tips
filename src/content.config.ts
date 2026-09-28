import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const tips = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tips" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    difficulty: z.enum(["入门", "进阶", "高阶"]).default("入门"),
    date: z.coerce.date(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { tips };
