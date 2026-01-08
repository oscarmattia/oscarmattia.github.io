import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard for tracking user behavior and business metrics.",
    tags: ["TypeScript", "D3.js", "GraphQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team features.",
    tags: ["React", "Firebase", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Weather Application",
    description: "Beautiful weather app with location-based forecasts and interactive maps.",
    tags: ["React", "OpenWeather API", "Mapbox"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="section-padding bg-surface-subtle">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">Portfolio</h2>
        <p className="text-text-secondary mb-12">Selected projects I've worked on.</p>

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
                  <a
                    href={project.githubUrl}
                    className="p-2 text-text-secondary hover:text-foreground transition-colors"
                    aria-label="View source code"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.liveUrl}
                    className="p-2 text-text-secondary hover:text-accent transition-colors"
                    aria-label="View live site"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
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
