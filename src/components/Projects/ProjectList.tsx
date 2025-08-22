"use client";

import React from "react";
import ProjectItem from "./ProjectItem";
import { motion } from "framer-motion";
import { Project, Skill } from "@/lib/schema";

interface ProjectListProps {
  projects: Project[];
  skills: Skill[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, skills }) => {
  return (
    <motion.div layout className="flex flex-col gap-6">
      {projects.map((project) => (
        <ProjectItem key={project.slug} project={project} skills={skills} />
      ))}
    </motion.div>
  );
};

export default ProjectList;
