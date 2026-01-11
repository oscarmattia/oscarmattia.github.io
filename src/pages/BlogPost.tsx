import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let currentCodeBlock: string[] = [];
    let inCodeBlock = false;
    let codeLanguage = "";

    lines.forEach((line, index) => {
      // Code blocks
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <pre
              key={`code-${index}`}
              className="bg-secondary p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm"
            >
              <code>{currentCodeBlock.join("\n")}</code>
            </pre>
          );
          currentCodeBlock = [];
          inCodeBlock = false;
          codeLanguage = "";
        } else {
          // Start code block
          inCodeBlock = true;
          codeLanguage = line.trim().replace("```", "").trim();
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock.push(line);
        return;
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4 first:mt-0">
            {line.substring(2)}
          </h1>
        );
        return;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mt-8 mb-4 first:mt-0">
            {line.substring(3)}
          </h2>
        );
        return;
      }
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
            {line.substring(4)}
          </h3>
        );
        return;
      }

      // Links
      if (line.includes("](") && line.includes(")")) {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        let lastIndex = 0;
        const parts: (string | JSX.Element)[] = [];

        while ((match = linkRegex.exec(line)) !== null) {
          parts.push(line.substring(lastIndex, match.index));
          parts.push(
            <a
              key={`link-${match.index}`}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-2"
            >
              {match[1]}
            </a>
          );
          lastIndex = match.index + match[0].length;
        }
        parts.push(line.substring(lastIndex));

        elements.push(
          <p key={index} className="text-text-secondary leading-relaxed mb-4">
            {parts}
          </p>
        );
        return;
      }

      // Inline code
      if (line.includes("`")) {
        const codeRegex = /`([^`]+)`/g;
        let match;
        let lastIndex = 0;
        const parts: (string | JSX.Element)[] = [];

        while ((match = codeRegex.exec(line)) !== null) {
          parts.push(line.substring(lastIndex, match.index));
          parts.push(
            <code
              key={`inline-code-${match.index}`}
              className="bg-secondary px-1.5 py-0.5 rounded font-mono text-sm text-foreground"
            >
              {match[1]}
            </code>
          );
          lastIndex = match.index + match[0].length;
        }
        parts.push(line.substring(lastIndex));

        elements.push(
          <p key={index} className="text-text-secondary leading-relaxed mb-4">
            {parts}
          </p>
        );
        return;
      }

      // Empty lines
      if (line.trim() === "") {
        return;
      }

      // Regular paragraphs
      elements.push(
        <p key={index} className="text-text-secondary leading-relaxed mb-4">
          {line}
        </p>
      );
    });

    // Handle any remaining code block
    if (inCodeBlock && currentCodeBlock.length > 0) {
      elements.push(
        <pre
          key="code-final"
          className="bg-secondary p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm"
        >
          <code>{currentCodeBlock.join("\n")}</code>
        </pre>
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <article className="section-padding pt-24">
        <div className="container-narrow max-w-3xl">
          {/* Back link */}
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-text-tertiary">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-text-secondary space-y-4">
              {renderContent(post.content)}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
