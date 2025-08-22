import fs from "fs";
import path from "path";
import { z } from "zod";
import {
  skillCategorySchema,
  buildSkillSchema,
  buildProjectSchema,
  SkillCategory,
} from "@/lib/schema";

export function loadSkillCategories(): SkillCategory[] {
  const file = fs.readFileSync(
    path.join(process.cwd(), "content/skill_categories.json"),
    "utf-8"
  );
  const data = JSON.parse(file);
  return z.array(skillCategorySchema).parse(data);
}

export function loadSkills() {
  const categories = loadSkillCategories();
  const categorySlugs = categories.map((c) => c.slug) as [string, ...string[]];
  const skillSchema = buildSkillSchema(categorySlugs);

  const file = fs.readFileSync(
    path.join(process.cwd(), "content/skills.json"),
    "utf-8"
  );
  const data = JSON.parse(file);
  return z.array(skillSchema).parse(data);
}

export function loadProjects() {
  // Load & validate skills first to know the valid slugs
  const skills = loadSkills();
  const skillSlugs = skills.map((s) => s.slug) as [string, ...string[]];

  // Build a schema constrained to these slugs
  const projectSchema = buildProjectSchema(skillSlugs);

  const file = fs.readFileSync(
    path.join(process.cwd(), "content/projects.json"),
    "utf-8"
  );
  const data = JSON.parse(file);
  return z.array(projectSchema).parse(data);
}
