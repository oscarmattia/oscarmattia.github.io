import { useState, useEffect } from "react";
import { Star, GitFork, ExternalLink, Loader2 } from "lucide-react";

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  CSS: "bg-purple-500",
  Shell: "bg-green-500",
  Python: "bg-blue-400",
  HTML: "bg-orange-500",
  Java: "bg-red-500",
  C: "bg-gray-500",
  "C++": "bg-blue-600",
  Go: "bg-cyan-500",
  Rust: "bg-orange-700",
  Ruby: "bg-red-600",
  PHP: "bg-indigo-500",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-600",
  Dart: "bg-blue-400",
  Scala: "bg-red-600",
  R: "bg-blue-500",
  MATLAB: "bg-yellow-600",
};

const CodeRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.github.com/users/oscarmattia/repos?sort=updated&per_page=6");
        
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        
        const data: Repo[] = await response.json();
        // Filter out forks and sort by stars
        const publicRepos = data
          .filter((repo) => !repo.name.includes("fork"))
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        
        setRepos(publicRepos);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching repos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="code" className="section-padding bg-surface-subtle">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">Code</h2>
        <p className="text-text-secondary mb-12">Open source projects and experiments.</p>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-accent animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">Unable to load repositories</p>
            <a
              href="https://github.com/oscarmattia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
            >
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : repos.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 bg-background border border-border rounded-lg hover:border-accent/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-mono text-sm font-medium group-hover:text-accent transition-colors">
                      {repo.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {repo.description || "No description available"}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-tertiary">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${languageColors[repo.language] || "bg-gray-400"}`} />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://github.com/oscarmattia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
              >
                View more on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">No repositories found</p>
            <a
              href="https://github.com/oscarmattia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
            >
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default CodeRepos;
