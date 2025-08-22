import { z } from "zod";

export const skillCategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  color: z.string(),
});
export type SkillCategory = z.infer<typeof skillCategorySchema>;

export const buildSkillSchema = (categorySlugs: [string, ...string[]]) =>
  z.object({
    slug: z.string(),
    name: z.string(),
    category: z.enum(categorySlugs),
    level: z.enum([
      "learning",
      "familiar",
      "intermediate",
      "proficient",
      "expert",
    ]),
    since: z.number().int().min(1998).max(new Date().getFullYear()),
    lastUsed: z
      .number()
      .int()
      .min(1998)
      .max(new Date().getFullYear())
      .optional(),
    story: z.string(),
  });
export type Skill = z.infer<ReturnType<typeof buildSkillSchema>>;

export const buildProjectSchema = (skillSlugs: [string, ...string[]]) =>
  z.object({
    slug: z.string(),
    title: z.string(),
    year: z.number(),
    skills: z.array(z.enum(skillSlugs)), // only allow known skills
    summary: z.string(),
    screenshot: z.string().optional(),
    link: z.string().optional(),
  });
export type Project = z.infer<ReturnType<typeof buildProjectSchema>>;
