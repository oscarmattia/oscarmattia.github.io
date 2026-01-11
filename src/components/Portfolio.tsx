import { ExternalLink, Award } from "lucide-react";

const projects = [
  {
    title: "Inverter-Based Analog Design for High-Speed Communications",
    description: "IEEE ESSCIRC 2023 Invited Tutorial on modern analog design techniques for high-speed communication systems.",
    tags: ["IEEE ESSCIRC 2023", "Tutorial", "Analog Design"],
    type: "publication",
    featured: true,
  },
  {
    title: "A Compact 28 GS/s 8-bit Switched-Capacitor DAC in 16nm FinFET CMOS",
    description: "IEEE JSSC 2021 - Enabling high-bandwidth data-converter based I/O. Published with Caragiulo et al.",
    tags: ["IEEE JSSC 2021", "16nm FinFET", "DAC"],
    type: "publication",
    featured: true,
  },
  {
    title: "80 GS/s 5.5 ENOB Time-Interleaved CMOS Track-And-Hold",
    description: "Electronics Letters 2020 - Pushing boundaries of data acquisition. Co-authored with B. Murmann.",
    tags: ["Electronics Letters 2020", "Data Acquisition", "Time-Interleaved"],
    type: "publication",
    featured: true,
  },
  {
    title: "Charge-steering Transmitter",
    description: "US Patent 10,418,976 - Power-efficient data transmission architecture for high-speed communication systems.",
    tags: ["US Patent", "Transmitter", "Power Efficiency"],
    type: "patent",
    featured: false,
  },
  {
    title: "Logic Gates with Data-Independent Delay",
    description: "US Patents 10,305,487 & 10,333,524 - Timing reliability improvements for high-speed digital circuits.",
    tags: ["US Patent", "Timing", "Digital Circuits"],
    type: "patent",
    featured: false,
  },
  {
    title: "DFE Hysteresis Compensation",
    description: "US Patent 10,230,359 - Signal integrity optimization for high-speed serial data links.",
    tags: ["US Patent", "Signal Integrity", "DFE"],
    type: "patent",
    featured: false,
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="section-padding bg-surface-subtle">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">Publications & Patents</h2>
        <p className="text-text-secondary mb-12">Selected publications and granted patents from my research and engineering work.</p>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group p-6 bg-background border border-border rounded-lg hover:border-accent/30 transition-all ${
                project.featured ? "md:p-8" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-secondary text-text-secondary rounded font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {project.type === "patent" && (
                    <Award className="w-5 h-5 text-text-secondary" aria-label="Patent" />
                  )}
                  {project.type === "publication" && (
                    <ExternalLink className="w-5 h-5 text-text-secondary" aria-label="Publication" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
