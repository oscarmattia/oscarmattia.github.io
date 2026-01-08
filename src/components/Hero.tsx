import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16">
      <div className="container-narrow">
        <div className="max-w-2xl">
          <p className="text-accent font-mono text-sm mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            Hi, my name is
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            John Doe
          </h1>
          <h2 className="text-2xl md:text-4xl text-text-secondary font-medium mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
            I build things for the web.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-xl mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            I'm a software engineer specializing in building exceptional digital experiences. 
            Currently focused on creating accessible, human-centered products.
          </p>
          <div className="flex gap-4 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors"
            >
              View My Work
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-md font-medium hover:bg-secondary transition-colors"
            >
              About Me
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
