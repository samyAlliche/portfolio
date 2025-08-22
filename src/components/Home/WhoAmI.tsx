"use client";
import React from "react";
import TextType from "@/components/TextType";
import clsx from "clsx";
import { LayoutGroup, motion } from "motion/react";
import RotatingText from "../RotatingText";

const WhoAmI = () => {
  const [cursorOneVisible, setCursorOneVisible] = React.useState(true);
  const handleTextType = () => {
    setTimeout(() => {
      setCursorOneVisible(false);
    }, 400);
  };
  return (
    <div className="flex flex-col gap-8 p-5 sm:p-0">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl sm:text-6xl font-extralight">
          <TextType
            text={["Hello, I'm"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={cursorOneVisible}
            cursorCharacter="|"
            onSentenceComplete={() => handleTextType()}
          />
        </h1>
        <h1
          className={clsx(
            "text-4xl sm:text-6xl font-bold",
            !cursorOneVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <TextType
            text={"Samy Alliche"}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            initialDelay={1100}
          />
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <LayoutGroup>
          <motion.h3
            className="flex items-center gap-2 text-lg xl:text-xl"
            layout
          >
            <motion.span
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              I&apos;m a{" "}
            </motion.span>
            <RotatingText
              texts={[
                "Full Stack Developer",
                "UI/UX Enthusiast",
                "Software Developer",
                "Tech Savvy",
              ]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-foreground text-background overflow-hidden py-0.5 sm:py-1 justify-center rounded-lg font-black"
              staggerFrom={"last"}
              staggerDuration={0.025}
              animatePresenceInitial={true}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
            <motion.span
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              from <span className="font-black">Brussels, Belgium 🇧🇪</span>
            </motion.span>
          </motion.h3>
        </LayoutGroup>
        <p className="">
          I&apos;m a recent{" "}
          <span className="font-black">Computer Science graduate</span> and full
          stack developer with{" "}
          <span className="font-black">hands-on experience</span> building
          modern web applications. Quick to learn, adaptable, and motivated to
          contribute to meaningful digital products in a collaborative
          environment.
        </p>
      </div>
    </div>
  );
};

export default WhoAmI;
