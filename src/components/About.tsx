import { Briefcase, GraduationCap, MapPin, Mail } from "lucide-react";

const experiences = [
  {
    title: "Display Silicon Engineer",
    company: "Meta",
    period: "2025 — Present",
    description: "Building next-generation micro-displays for smart glasses. Pioneered systematic integration of LLMs in silicon modeling workflows. Developed industry first million-equation sparse linear system solver for power distribution in complex silicon systems, GPU accelerated.",
  },
  {
    title: "SMTS AMS IC Design Engineer",
    company: "AMD",
    period: "2024 - 2025",
    description: "Led 10-engineer sub-system team developing next-generation DAC-based TX SerDes. Architected ultra-high-speed data converters in cutting-edge FinFET, pushing boundaries of what's technically feasible.",
  },
  {
    title: "Principal/Senior Engineer",
    company: "d-Matrix & Luminous Computing",
    period: "2022 - 2024",
    description: "Led development of novel D2D interfaces and silicon photonic links for AI acceleration. Built and mentored engineering teams, establishing design methodologies and documentation standards.",
  },
  {
    title: "Mixed-Signal IC Design Engineer",
    company: "Apple",
    period: "2020 - 2022",
    description: "Built in test mixed-signal architectures for modern SoCs. Created ultra-compact monitoring systems and built-in self-test infrastructure for high-speed interface characterization.",
  },
  {
    title: "Post-Doctoral Research Fellow",
    company: "Stanford University/DARPA",
    period: "2019 - 2020",
    description: "Advanced fundamental research in high-speed data conversion. Supervised 3 graduate students, 16nm CMOS FinFET tape-out from scratch in 6 months. Published results in top-tier venues.",
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
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent" />
                Seattle, WA
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-accent" />
                oscar.mattia@gmail.com
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
            <div className="space-y-6">
              <div className="relative pl-4 border-l border-border">
                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
                <p className="font-medium text-sm">Post-doc in Electrical Engineering</p>
                <p className="text-text-secondary text-sm">Murmann Lab, Stanford University</p>
                <p className="text-text-tertiary text-xs font-mono mt-1">2020</p>
              </div>
              <div className="relative pl-4 border-l border-border">
                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
                <p className="font-medium text-sm">Stanford Ignite Entrepreneurship Certificate</p>
                <p className="text-text-secondary text-sm">Stanford University</p>
                <p className="text-text-tertiary text-xs font-mono mt-1">2020</p>
              </div>
              <div className="relative pl-4 border-l border-border">
                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
                <p className="font-medium text-sm">PhD in Engineering Sciences</p>
                <p className="text-text-secondary text-sm">imec and Vrije Universiteit Brussels, Belgium</p>
                <p className="text-text-tertiary text-xs font-mono mt-1">2019</p>
              </div>
              <div className="relative pl-4 border-l border-border">
                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
                <p className="font-medium text-sm">MSc in Microelectronics</p>
                <p className="text-text-secondary text-sm">Federal University of Rio Grande do Sul, Brazil</p>
                <p className="text-text-tertiary text-xs font-mono mt-1">2014</p>
              </div>
              <div className="relative pl-4 border-l border-border">
                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
                <p className="font-medium text-sm">BSc in Electrical and Electronics Engineering</p>
                <p className="text-text-secondary text-sm">University of Caxias do Sul, Brazil</p>
                <p className="text-text-tertiary text-xs font-mono mt-1">2011</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
