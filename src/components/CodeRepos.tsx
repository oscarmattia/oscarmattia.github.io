import { Star, GitFork, ExternalLink } from "lucide-react";

const repos = [
  {
    name: "react-hooks-toolkit",
    description: "A collection of essential React hooks for common use cases.",
    language: "TypeScript",
    stars: 342,
    forks: 45,
    url: "#",
  },
  {
    name: "css-reset-modern",
    description: "A modern CSS reset for consistent cross-browser styling.",
    language: "CSS",
    stars: 128,
    forks: 22,
    url: "#",
  },
  {
    name: "node-api-starter",
    description: "Production-ready Node.js API starter with TypeScript and Prisma.",
    language: "TypeScript",
    stars: 89,
    forks: 15,
    url: "#",
  },
  {
    name: "dotfiles",
    description: "My personal development environment configuration.",
    language: "Shell",
    stars: 56,
    forks: 8,
    url: "#",
  },
];

const languageColors: Record<string, string> = {
  TypeScript: "bg-accent",
  JavaScript: "bg-yellow-400",
  CSS: "bg-purple-500",
  Shell: "bg-green-500",
  Python: "bg-blue-500",
};

const CodeRepos = () => {
  return (
    <section id="code" className="section-padding bg-surface-subtle">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">Code</h2>
        <p className="text-text-secondary mb-12">Open source projects and experiments.</p>

        <div className="grid md:grid-cols-2 gap-4">
          {repos.map((repo, index) => (
            <a
              key={index}
              href={repo.url}
              className="group p-5 bg-background border border-border rounded-lg hover:border-accent/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-mono text-sm font-medium group-hover:text-accent transition-colors">
                  {repo.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {repo.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${languageColors[repo.language] || "bg-gray-400"}`} />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
          >
            View more on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CodeRepos;
