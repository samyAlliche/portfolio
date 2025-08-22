import React from "react";
import { Project, Skill } from "@/lib/schema";
import { motion } from "motion/react";
import { Drawer } from "vaul";

interface SkillPillProps {
  skill: Skill;
  projects?: Project[];
}

const SkillPill: React.FC<SkillPillProps> = ({ skill, projects = [] }) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="">
        <motion.div
          className="px-3 text-sm border-2 rounded-full font-mono select-none transition-colors duration-200 ease-in-out hover:bg-foreground hover:text-background"
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <span className="">{skill.name}</span>
        </motion.div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] mt-24 mb-8 h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 bg-background rounded-t-[10px] flex-1">
            <div
              aria-hidden
              className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
            />
            <div className="max-w-md mx-auto flex flex-col gap-2">
              <Drawer.Title className="font-medium text-foreground flex items-center gap-2">
                <span
                  role="img"
                  aria-label={`${skill.name} icon`}
                  className="inline-block align-middle mr-2 text-foreground"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "currentColor",
                    WebkitMaskImage: `url(/skill_icons/${skill.slug}.svg)`,
                    maskImage: `url(/skill_icons/${skill.slug}.svg)`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                />
                {skill.name}
                <p className="text-muted-foreground italic text-sm">
                  since {skill.since}
                </p>
              </Drawer.Title>
              <p className="text-muted-foreground mb-2">{skill.story}</p>

              {projects.length > 0 && (
                <div className=" flex flex-col gap-2">
                  <h4 className="text-sm font-semibold">Used in</h4>
                  <ul className="flex flex-wrap gap-2">
                    {projects.map((p) => (
                      <li
                        key={p.slug}
                        className="text-xs px-2 py-1 rounded-full border border-border text-foreground/90 bg-card/50"
                        title={p.summary}
                      >
                        {p.link ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:underline transition-opacity duration-200"
                          >
                            {p.title}
                          </a>
                        ) : (
                          <span className="font-medium">{p.title}</span>
                        )}{" "}
                        <span className="text-muted-foreground">
                          ({p.year})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SkillPill;
