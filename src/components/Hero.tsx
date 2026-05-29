import { ArrowDown } from "lucide-react";
import { handleSectionNavClick } from "@/lib/sectionScroll";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16">
      <div className="container-narrow">
        <div className="max-w-2xl">
          <p className="text-accent font-mono text-sm mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            Hi, my name is
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            Oscar Mattia, PhD
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-text-secondary font-medium mb-6 whitespace-nowrap animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
            Engineering Leader | AMS Architect
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-xl mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            Analog / mixed-signal hardware architect with 11+ years developing high-performance silicon solutions. 
            Depth and breadth in silicon electronic systems, from high-speed wired, optical and wireless links to next-generation micro-displays.
          </p>
          <div className="flex gap-4 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            <a
              href="#about"
              onClick={(event) => handleSectionNavClick(event, "#about")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors"
            >
              About Me
            </a>
            <a
              href="#portfolio"
              onClick={(event) => handleSectionNavClick(event, "#portfolio")}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-md font-medium hover:bg-secondary transition-colors"
            >
              View Publications
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-text-tertiary" />
      </div>
    </section>
  );
};

export default Hero;
