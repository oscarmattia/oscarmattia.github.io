import { useState } from "react";
import {
  Briefcase,
  ChevronDown,
  GraduationCap,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_VISIBLE_ITEMS = 3;

type TimelineItem = {
  title: string;
  subtitle: string;
  period: string;
};

const experiences: TimelineItem[] = [
  {
    title: "World Models for AMS IC Design",
    subtitle: "Self-Employed",
    period: "2026 — present",
  },
  {
    title: "Member of Technical Staff",
    subtitle: "Gen Alpha Transistor",
    period: "2026",
  },
  {
    title: "Display Silicon Engineer",
    subtitle: "Meta Reality Labs",
    period: "2025 — 2026",
  },
  {
    title: "SMTS AMS IC Design Engineer",
    subtitle: "AMD",
    period: "2024 — 2025",
  },
  {
    title: "Principal AMS Engineer",
    subtitle: "d-Matrix",
    period: "2023 — 2024",
  },
  {
    title: "Senior AMS Engineer",
    subtitle: "Luminous Computing",
    period: "2022 — 2023",
  },
  {
    title: "Mixed-Signal IC Design Engineer",
    subtitle: "Apple",
    period: "2020 — 2022",
  },
  {
    title: "Post-Doctoral Research Fellow",
    subtitle: "Stanford University / DARPA",
    period: "2019 — 2020",
  },
];

const education: TimelineItem[] = [
  {
    title: "Post-doctoral Research Fellow in Electrical Engineering",
    subtitle: "Stanford University",
    period: "2020",
  },
  {
    title: "PhD in Engineering Sciences",
    subtitle: "Vrije Universiteit Brussels, Belgium",
    period: "2019",
  },
  {
    title: "MSc in Microelectronics",
    subtitle: "Federal University of Rio Grande do Sul, Brazil",
    period: "2014",
  },
  {
    title: "Stanford Ignite Entrepreneurship Certificate",
    subtitle: "Stanford University",
    period: "2020",
  },
  {
    title: "BSc in Electrical and Electronics Engineering",
    subtitle: "University of Caxias do Sul, Brazil",
    period: "2011",
  },
];

const skills = [
  "0–1 Engineering Leadership",
  "Cross-functional Communication",
  "System Architecture",
  "AI Infra Silicon",
  "FinFET (3nm–16nm)",
  "High-speed SerDes / D2D / SiPh",
  "AFEs & ADC/DAC Systems",
  "Python & MATLAB Modeling",
  "Agentic Workflows",
  "Power & Signal Integrity",
];

type CollapsibleTimelineProps = {
  title: string;
  icon: typeof Briefcase;
  items: TimelineItem[];
  expanded: boolean;
  onToggle: () => void;
  className?: string;
};

const CollapsibleTimeline = ({
  title,
  icon: Icon,
  items,
  expanded,
  onToggle,
  className,
}: CollapsibleTimelineProps) => {
  const visibleItems = expanded ? items : items.slice(0, DEFAULT_VISIBLE_ITEMS);
  const canExpand = items.length > DEFAULT_VISIBLE_ITEMS;

  return (
    <div className={className}>
      <h3 className="text-sm font-medium mb-6 flex items-center gap-2">
        <Icon className="w-4 h-4 text-accent" />
        {title}
      </h3>
      <div className="space-y-6">
        {visibleItems.map((item) => (
          <div key={`${item.title}-${item.period}`} className="relative pl-4 border-l border-border">
            <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
            <p className="font-medium text-sm">{item.title}</p>
            <p className="text-text-secondary text-sm">{item.subtitle}</p>
            <p className="text-text-tertiary text-xs font-mono mt-1">{item.period}</p>
          </div>
        ))}
      </div>
      {canExpand && (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors"
        >
          {expanded ? "Show less" : `Show ${items.length - DEFAULT_VISIBLE_ITEMS} more`}
          <ChevronDown className={cn("w-4 h-4 transition-transform", expanded && "rotate-180")} />
        </button>
      )}
    </div>
  );
};

const About = () => {
  const [experienceExpanded, setExperienceExpanded] = useState(false);
  const [educationExpanded, setEducationExpanded] = useState(false);

  return (
    <section id="about" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">About</h2>
        {/*<p className="text-text-secondary mb-12">A bit about me and my journey.</p>*/}

        <div className="grid md:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-text-secondary leading-relaxed">
              I'm an AMS silicon designer, architect and algorithms engineer with 12+ years developing high-performance
              solutions, from pathfinding to product, consumer to data-center. My core strength is full custom interface
              silicon for new system applications — I work across the stack and thrive in 0–1 scenarios with high ambiguity.
            </p>
            <p className="text-text-secondary leading-relaxed">
              I've supported cross-functional programs as silicon sub-system tech lead, coordinating teams of up to 10
              designers and layout leads, and interfaced with packaging, digital, photonics, system hardware, and
              opto-mech with custom silicon on the critical path. I've been in functional and matrix orgs, and hold 5 U.S. patents.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1">
                <a
                  href="https://github.com/oscarmattia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-secondary hover:text-accent transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/oscar-mattia-7170b834/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-secondary hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
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

          {/* Experience & Education */}
          <div>
            <CollapsibleTimeline
              title="Experience"
              icon={Briefcase}
              items={experiences}
              expanded={experienceExpanded}
              onToggle={() => setExperienceExpanded((open) => !open)}
            />

            <CollapsibleTimeline
              title="Education"
              icon={GraduationCap}
              items={education}
              expanded={educationExpanded}
              onToggle={() => setEducationExpanded((open) => !open)}
              className="mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
