"use client";

import React from "react";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import WhoAmI from "./WhoAmI";
import SkillList, { SkillListProps } from "../Skills/SkillList";
import HireMeButtons from "./HireMeButtons";
import { motion } from "framer-motion";

const HomeHero: React.FC<SkillListProps> = ({
  skills,
  skillCategories,
  projects,
}) => {
  return (
    <div className="flex gap-5 md:flex-row flex-col w-full justify-between items-start">
      <div className="flex flex-col gap-8 w-full">
        <WhoAmI />
        <div className="hidden lg:block">
          <SkillList
            skills={skills}
            skillCategories={skillCategories}
            projects={projects}
          />
        </div>
      </div>

      <motion.div
        className="flex flex-col justify-center items-center w-full gap-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
      >
        <ProfileCard
          avatarUrl="/image.png"
          grainUrl="/grain.webp"
          //innerGradient="repeating-linear-gradient(315deg, #00FFFF2E 92%, #073AFF00 100%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 21% 78%, #7B00FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #2000FFFF 0%, #073AFFFF 100%)"
          showBehindGradient={false}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={true}
          onContactClick={() => console.log("Contact clicked")}
        />
        <HireMeButtons />
      </motion.div>
    </div>
  );
};

export default HomeHero;
