import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    lang: z.enum(['en', 'ko']).default('en'), order: z.number().int().positive(),
    title: z.string().min(1), titleEn: z.string().min(1), titleKo: z.string().optional(),
    context: z.string(), period: z.string(), team: z.string().optional(), role: z.string(),
    status: z.enum(['completed', 'ended', 'ongoing', 'design']),
    summary: z.string().min(1), outcome: z.string().min(1), teamScope: z.string().min(1),
    contributions: z.array(z.string().min(1)).min(1), technologies: z.array(z.string()).min(3).max(5),
    github: z.url().optional(), githubVisibility: z.enum(['public','private']).default('public'), demo: z.url().optional(),
    thumbnail: z.object({ src: z.string().startsWith('/media/'), alt: z.string().min(1), caption: z.string().optional() }).strict().optional(),
    featured: z.boolean().default(true),
  }).strict(),
});
export const collections = { projects };
