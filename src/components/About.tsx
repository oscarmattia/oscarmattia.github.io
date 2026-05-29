import { useState } from "react";
import {
  Briefcase,
  ChevronDown,
  GraduationCap,
  Github,
  Linkedin,
  MapPin,
  Mail,
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
    title: "Display Silicon Engineer",
    subtitle: "Meta",
    period: "2025 — Present",
  },
  {
    title: "SMTS AMS IC Design Engineer",
    subtitle: "AMD",
    period: "2024 - 2025",
  },
  {
    title: "Principal/Senior Engineer",
    subtitle: "d-Matrix & Luminous Computing",
    period: "2022 - 2024",
  },
  {
    title: "Mixed-Signal IC Design Engineer",
    subtitle: "Apple",
    period: "2020 - 2022",
  },
  {
    title: "Post-Doctoral Research Fellow",
    subtitle: "Stanford University/DARPA",
    period: "2019 - 2020",
  },
];

const education: TimelineItem[] = [
  {
    title: "Post-doc in Electrical Engineering",
    subtitle: "Murmann Lab, Stanford University",
    period: "2020",
  },
  {
    title: "Stanford Ignite Entrepreneurship Certificate",
    subtitle: "Stanford University",
    period: "2020",
  },
  {
    title: "PhD in Engineering Sciences",
    subtitle: "imec and Vrije Universiteit Brussels, Belgium",
    period: "2019",
  },
  {
    title: "MSc in Microelectronics",
    subtitle: "Federal University of Rio Grande do Sul, Brazil",
    period: "2014",
  },
  {
    title: "BSc in Electrical and Electronics Engineering",
    subtitle: "University of Caxias do Sul, Brazil",
    period: "2011",
  },
];

const skills = [
  "Engineering Leadership",
  "Cross-functional Communication",
  "System Architecture",
  "AI Infrastructure Silicon",
  "FinFET (3nm-16nm)",
  "High-speed SerDes",
  "Data Converters",
  "Python & MATLAB",
  "Power Optimization",
  "Silicon Photonics",
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
              I'm an analog / mixed-signal hardware architect with 11+ years developing high-performance silicon solutions 
              in varied settings from academia to startups to big tech. Broad background in high-speed wired, optical and 
              wireless links, data converters, code modulated radars and more recently micro-displays.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Proven track record leading engineering teams while maintaining rigorous technical standards and fostering 
              collaborative innovation. Passionate about technology and innovation, hands-dirty get-it-done mindset and 
              eager to learn and expand into new areas.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent" />
                Seattle, WA
              </div>
              <div className="flex items-center gap-1">
                <a
                  href="mailto:oscar.mattia@gmail.com"
                  className="p-2 text-text-secondary hover:text-accent transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
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
