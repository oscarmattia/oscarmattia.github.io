import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getActiveSectionId, navigateToSection } from "@/lib/sectionScroll";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "blog", label: "Blog" },
  { id: "code", label: "Code" },
  { id: "gallery", label: "Gallery" },
] as const;

const sectionIds = sections.map((section) => section.id);

const SectionScrollBar = () => {
  const [activeId, setActiveId] = useState<(typeof sections)[number]["id"]>("home");

  useEffect(() => {
    const updateActiveSection = () => {
      setActiveId(getActiveSectionId(sectionIds) as (typeof sections)[number]["id"]);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative flex flex-col items-center gap-4 py-2 before:absolute before:left-1/2 before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:-translate-x-1/2 before:bg-border before:content-['']">
        {sections.map((section) => {
          const isActive = activeId === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => navigateToSection(`#${section.id}`)}
              aria-label={section.label}
              aria-current={isActive ? "true" : undefined}
              className="group relative z-10 flex h-8 w-8 items-center justify-center"
            >
              <span
                className={cn(
                  "pointer-events-none absolute right-full mr-3 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-text-tertiary opacity-0 transition-opacity group-hover:opacity-100",
                  isActive && "text-accent opacity-100",
                )}
              >
                {section.label}
              </span>
              <span
                className={cn(
                  "block w-1.5 rounded-full transition-all duration-300",
                  isActive ? "h-8 bg-accent" : "h-4 bg-border group-hover:bg-text-tertiary",
                )}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SectionScrollBar;
