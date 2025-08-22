import PillNav from "@/components/PillNav";
import HomeHero from "@/components/Home/HomeHero";
import SkillList from "@/components/Skills/SkillList";
import { loadProjects, loadSkillCategories, loadSkills } from "@/lib/loadData";
import ProjectList from "@/components/Projects/ProjectList";
import AboutMeContent from "@/components/About/AboutMeContent";
import LocalClock from "@/components/LocalClock";
import ContactContent from "@/components/Contact/ContactContent";
import { ThemeToggle } from "@/components/ToggleDarkMode";
export default function Home() {
  const skills = loadSkills();
  const skillCategories = loadSkillCategories();
  const projects = loadProjects();

  const sectionTitleClass = "text-5xl font-bold uppercase";

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-2 pb-10 gap-12 sm:px-10 lg:px-12 2xl:px-18 w-full">
      <header className="sticky top-1 z-[9999] flex justify-center">
        <div className="relative w-full pointer-events-auto flex justify-between items-center">
          <div className="sm:flex flex-1 justify-start hidden">
            <ThemeToggle />
          </div>
          <div className="flex justify-center">
            <PillNav
              items={[
                { label: "Home", href: "/#home" },
                { label: "Projects", href: "/#projects" },
                { label: "About me", href: "/#about-me" },
                { label: "Contact", href: "/#contact" },
              ]}
              activeHref="/"
              className="custom-nav"
              ease="power2.easeOut"
              baseColor="var(--foreground)"
              pillColor="var(--background)"
              hoveredPillTextColor="var(--background)"
              pillTextColor="var(--foreground)"
            />
          </div>
          <div className="md:flex-1 md:flex md:justify-end md:right-auto md:top-auto md:static absolute right-60 top-0">
            <LocalClock />
          </div>
        </div>
      </header>
      <main className="flex flex-col px-5 xl:px-32 gap-20 mt-10 sm:mt-18 w-full">
        <section id="home" className="flex justify-between w-full">
          <HomeHero
            skills={skills}
            skillCategories={skillCategories}
            projects={projects}
          />
        </section>
        <section id="skills" className="block lg:hidden">
          <SkillList
            skills={skills}
            skillCategories={skillCategories}
            projects={projects}
          />
        </section>
        <section id="projects" className="flex flex-col gap-8">
          <h2 className={sectionTitleClass}>featured projects</h2>
          <ProjectList projects={projects} skills={skills} />
        </section>
        <section id="about-me" className="flex flex-col gap-8">
          <h2 className={sectionTitleClass}>about me</h2>
          <AboutMeContent />
        </section>
        <section id="contact" className="py-8 sm:px-12 md:px-20 lg:px-50">
          <div className="flex flex-col gap-10 p-10 sm:p-16 rounded-3xl border bg-muted justify-center">
            <h2 className={"text-4xl sm:text-6xl font-black uppercase"}>
              LET&apos;S MAKE IT HAPPEN
            </h2>
            <ContactContent />
          </div>
        </section>
      </main>
      <footer className=" flex justify-center items-center ">
        <div className="font-bold text-sm rounded-full border border-muted py-1.5 px-4 flex gap-3">
          <p>made with</p> <p className="animate-bounce">❤️</p>{" "}
          <p>by Samy Alliche</p>
        </div>
      </footer>
    </div>
  );
}
