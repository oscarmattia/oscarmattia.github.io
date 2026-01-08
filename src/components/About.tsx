import { Briefcase, GraduationCap, MapPin, Mail } from "lucide-react";

const experiences = [
  {
    title: "Silicon Display Engineer",
    company: "Meta",
    period: "2025 — Present",
    description: "LLM-driven architecture of silicon displays. Industry first ultra-fast pixel-level IR drop solver, running on Meta's production repo and cloud GPUs.",
  },
  {
    title: "SMTS",
    company: "AMD",
    period: "2024 - 2025",
    description: "Next-Gen SerDes. DAC-based TX Tech Lead.",
  },
  {
    title: "Principal Analog IC Design Engineer",
    company: "d-Matrix",
    period: "2023 - 2024",
    description: "D2D high-speed links. Clocking.",
  },
  {
    title: "Senior Analog IC Design Engineer",
    company: "Luminous Computing",
    period: "2022 - 2023",
    description: "Si-Photonics High-Speed Links. TIA-based RX Tech Lead, monolithic integration process.",
  },
  {
    title: "AMS IC Design Engineer",
    company: "Apple",
    period: "2020 - 2022",
    description: "Data converters for SoC on-chip measurements.",
  },
];

const skills = [
  "LLM-driven workflows",
  "Python stack",
  "Remote dev environments",
  "Analog and mixed-signal architecture",
  "High-speed links",
  "Data Converters",
  "Custom Silicon",
];

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">About</h2>
        {/*<p className="text-text-secondary mb-12">A bit about me and my journey.</p>/*}

        <div className="grid md:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-text-secondary leading-relaxed">
              I like tackling industry relevant problems. I have 10+ years of experience spanning research,
              startups and product at big tech. I learn fast and prefer to work independently.
            </p>
            <p className="text-text-secondary leading-relaxed">
              When I'm not working, you'll find me exploring outside surfing, with my camera, reading about 
              new technologies, and contributing to open-source projects.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-accent" />
                hello@johndoe.com
              </div>
            </div>

            {/* Skills */}
            <div className="pt-6">
              <h3 className="text-sm font-medium mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-secondary text-text-secondary rounded-md font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-sm font-medium mb-6 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-accent" />
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-4 border-l border-border">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
                  <p className="font-medium text-sm">{exp.title}</p>
                  <p className="text-text-secondary text-sm">{exp.company}</p>
                  <p className="text-text-tertiary text-xs font-mono mt-1">{exp.period}</p>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-medium mt-10 mb-6 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-accent" />
              Education
            </h3>
            <div className="pl-4 border-l border-border">
              <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
              <p className="font-medium text-sm">Post-Doc Electrical Engineering</p>
              <p className="text-text-secondary text-sm">Stanford University, USA</p>
              <p className="text-text-tertiary text-xs font-mono mt-1">2019 — 2020</p>
            </div>
            <div className="pl-4 border-l border-border">
              <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
              <p className="font-medium text-sm">PhD Engineering Sciences</p>
              <p className="text-text-secondary text-sm">imec, Belgium</p>
              <p className="text-text-tertiary text-xs font-mono mt-1">2014 — 2019</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
