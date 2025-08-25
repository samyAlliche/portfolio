"use client";
import React, { useState } from "react";
import SkillPill from "@/components/Skills/SkillPill";
import { Project, Skill, SkillCategory } from "@/lib/schema";
import { Input } from "../ui/input";
import clsx from "clsx";
import { Item, Root } from "@radix-ui/react-toggle-group";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

export interface SkillListProps {
  skills: Skill[];
  skillCategories: SkillCategory[];
  projects: Project[];
}

const SkillList: React.FC<SkillListProps> = ({
  skills,
  skillCategories,
  projects,
}) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    SkillCategory["slug"] | undefined
  >();

  return (
    <motion.div
      className="flex flex-col gap-4 border-2 p-4 rounded-3xl relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
    >
      <h3 className="font-bold text-lg bg-background -top-4 absolute left-7 px-2">
        my skillset
      </h3>
      <div className="flex xl:flex-row flex-col gap-4 xl:items-center">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <Input
            placeholder="Looking for a skill?"
            className="rounded-lg pl-9"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Root
          className="flex flex-wrap gap-1"
          type="single"
          defaultValue=""
          aria-label="Skill Category"
          onValueChange={(val) => setSelectedCategory(val || undefined)}
        >
          {skillCategories.map((category, key) => (
            <Item
              key={key}
              style={
                {
                  color: category.color,
                  borderColor: category.color,
                  "--cat-color": category.color,
                } as React.CSSProperties
              }
              className={clsx(
                "px-3 text-sm border-2 rounded-full font-mono select-none",
                "transition-colors duration-200 ease-in-out",
                "hover:bg-[var(--cat-color)] hover:!text-background",
                category.slug === selectedCategory &&
                  "bg-[var(--cat-color)] !text-background"
              )}
              value={category.slug}
            >
              <span>{category.name.toUpperCase()}</span>
            </Item>
          ))}
        </Root>
      </div>
      <LayoutGroup>
        <motion.div className="flex flex-wrap gap-1" layout>
          <AnimatePresence mode="sync">
            {skills
              .filter(
                (s) =>
                  query === "" ||
                  s.name.toLowerCase().includes(query.toLowerCase())
              )
              .filter(
                (s) => !selectedCategory || s.category === selectedCategory
              )
              .map((skill: Skill) => {
                const relatedProjects =
                  projects?.filter((p) => p.skills.includes(skill.slug)) ?? [];
                return (
                  <SkillPill
                    key={skill.slug}
                    skill={skill}
                    projects={relatedProjects}
                  />
                );
              })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
};

export default SkillList;
