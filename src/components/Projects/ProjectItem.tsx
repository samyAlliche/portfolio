"use client";

import React from "react";
import Image from "next/image";
import { Project, Skill } from "@/lib/schema";
import { motion } from "framer-motion";
import SkillPill from "../Skills/SkillPill";
import { ExternalLinkIcon } from "lucide-react";
import clsx from "clsx";

interface ProjectItemProps {
  project: Project;
  skills: Skill[];
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, skills }) => {
  return (
    <motion.div
      layout
      className="flex flex-col sm:flex-row gap-5 rounded-xl bg-card text-card-foreground"
    >
      <a
        className="group relative w-full sm:w-1/3 h-56 bg-muted rounded-xl flex items-center justify-center text-muted-foreground overflow-hidden"
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            className={clsx(
              "object-cover",
              project.link &&
                "transition-transform duration-300 group-hover:scale-105"
            )}
          />
        ) : (
          <span>Screenshot</span>
        )}
        {project.link && (
          <div className="absolute inset-0 flex items-center justify-center bg-background opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-background/60 ease-in-out ">
            <ExternalLinkIcon className="text-foreground" />
          </div>
        )}
      </a>

      <div className="flex flex-col gap-2 sm:w-2/3">
        <div className="flex sm:flex-col sm:gap-1 gap-3 items-center sm:items-start">
          <a
            className="text-xl sm:text-2xl font-black transition duration-200"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.title}
          </a>
          <p className="text-muted-foreground">{project.year}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {project.skills.map((skillSlug) => {
            const skill = skills.find((s) => s.slug === skillSlug);
            return skill ? <SkillPill key={skillSlug} skill={skill} /> : null;
          })}
        </div>
        <p className="text-muted-foreground">{project.summary}</p>
      </div>
    </motion.div>
  );
};

export default ProjectItem;
