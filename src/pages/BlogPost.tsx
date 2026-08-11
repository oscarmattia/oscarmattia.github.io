import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { getBrandCodeStyle } from "@/lib/brandCodeStyle";
import { brandColors } from "@/lib/brandTheme";
import { blogPosts, publishedBlogPosts } from "@/data/blogPosts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MermaidDiagram from "@/components/MermaidDiagram";
import { renderBlogDiagram } from "@/components/blog/BlogDiagram";

const brandCodeStyle = getBrandCodeStyle();

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = publishedBlogPosts(blogPosts).find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

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

          {/* Content with Markdown */}
          <div className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:text-foreground 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:first:mt-0
            prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
            prose-p:text-text-secondary prose-p:leading-relaxed prose-p:my-6
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-foreground prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:border prose-pre:border-[#333333] prose-pre:p-0 prose-pre:my-6
            prose-pre:bg-[#111111]
            prose-img:rounded-lg prose-img:my-8 prose-img:w-full
            prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:my-6 prose-blockquote:text-text-secondary prose-blockquote:italic
            prose-ul:my-6 prose-ol:my-6 prose-li:my-2
            prose-table:text-text-secondary prose-th:text-foreground prose-th:text-left prose-td:text-left prose-td:border-border prose-table:my-6
            prose-hr:my-8 prose-hr:border-border">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom heading components with better spacing
                h1({ node, children, ...props }: any) {
                  return (
                    <h1 className="text-4xl font-bold tracking-tight mt-12 mb-6 first:mt-0 text-foreground" {...props}>
                      {children}
                    </h1>
                  );
                },
                h2({ node, children, ...props }: any) {
                  return (
                    <h2 className="text-3xl font-bold tracking-tight mt-10 mb-5 text-foreground border-b border-border pb-2" {...props}>
                      {children}
                    </h2>
                  );
                },
                h3({ node, children, ...props }: any) {
                  return (
                    <h3 className="text-2xl font-semibold tracking-tight mt-8 mb-4 text-foreground" {...props}>
                      {children}
                    </h3>
                  );
                },
                h4({ node, children, ...props }: any) {
                  return (
                    <h4 className="text-xl font-semibold tracking-tight mt-6 mb-3 text-foreground" {...props}>
                      {children}
                    </h4>
                  );
                },
                // Custom paragraph with better spacing
                p({ node, children, ...props }: any) {
                  return (
                    <p className="text-text-secondary leading-relaxed my-6" {...props}>
                      {children}
                    </p>
                  );
                },
                // Custom code block with syntax highlighting and Mermaid support
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";
                  const codeContent = String(children).replace(/\n$/, "");
                  
                  // Handle Mermaid diagrams
                  if (!inline && language === "mermaid") {
                    return <MermaidDiagram chart={codeContent} />;
                  }

                  // Handle TypeScript-authored blog diagrams by id
                  if (!inline && language === "diagram") {
                    const diagram = renderBlogDiagram(codeContent);
                    if (diagram) return <>{diagram}</>;
                    return (
                      <div className="my-8 rounded-lg border border-orange-500/40 bg-orange-950/30 p-4 text-sm text-text-secondary">
                        Unknown blog diagram:{" "}
                        <code className="font-mono text-foreground">{codeContent.trim()}</code>
                      </div>
                    );
                  }
                  
                  return !inline && language ? (
                    <SyntaxHighlighter
                      style={brandCodeStyle}
                      language={language}
                      PreTag="div"
                      className="rounded-lg !p-4 my-6 border border-[#333333]"
                      customStyle={{
                        margin: 0,
                        borderRadius: "0.5rem",
                        background: brandColors.canvas,
                      }}
                      {...props}
                    >
                      {codeContent}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={`${className || ""} bg-secondary px-1.5 py-0.5 rounded font-mono text-sm text-foreground`} {...props}>
                      {children}
                    </code>
                  );
                },
                // Unwrap fenced blocks so Mermaid / TS diagrams are not nested in <pre>
                pre({ children }) {
                  return <>{children}</>;
                },
                // Custom image handling (supports both static and dynamic)
                img({ node, src, alt, ...props }: any) {
                  // Handle static images from public/blog folder
                  if (src?.startsWith("/blog/") || src?.startsWith("/")) {
                    return (
                      <img
                        src={src}
                        alt={alt || ""}
                        className="rounded-lg my-8 w-full h-auto"
                        loading="lazy"
                        {...props}
                      />
                    );
                  }
                  // Handle external/dynamic images
                  return (
                    <img
                      src={src}
                      alt={alt || ""}
                      className="rounded-lg my-8 w-full h-auto"
                      loading="lazy"
                      {...props}
                    />
                  );
                },
                // Custom table styling
                table({ node, children, ...props }: any) {
                  return (
                    <div className="my-8 overflow-x-auto">
                      <table className="w-full border-collapse text-left text-text-secondary" {...props}>
                        {children}
                      </table>
                    </div>
                  );
                },
                thead({ node, children, ...props }: any) {
                  return <thead {...props}>{children}</thead>;
                },
                tbody({ node, children, ...props }: any) {
                  return <tbody {...props}>{children}</tbody>;
                },
                tr({ node, children, ...props }: any) {
                  return <tr className="border-b border-border last:border-b-0" {...props}>{children}</tr>;
                },
                th({ node, children, ...props }: any) {
                  return (
                    <th
                      className="border-b border-border px-8 py-3 text-left align-top font-semibold text-foreground"
                      {...props}
                    >
                      {children}
                    </th>
                  );
                },
                td({ node, children, ...props }: any) {
                  return (
                    <td className="px-8 py-3 text-left align-top" {...props}>
                      {children}
                    </td>
                  );
                },
                // Custom list components with better spacing
                ul({ node, children, ...props }: any) {
                  return (
                    <ul className="my-6 ml-6 list-disc space-y-2 text-text-secondary" {...props}>
                      {children}
                    </ul>
                  );
                },
                ol({ node, children, ...props }: any) {
                  return (
                    <ol className="my-6 ml-6 list-decimal space-y-2 text-text-secondary" {...props}>
                      {children}
                    </ol>
                  );
                },
                li({ node, children, ...props }: any) {
                  return (
                    <li className="my-2 leading-relaxed" {...props}>
                      {children}
                    </li>
                  );
                },
                // Custom blockquote with better spacing
                blockquote({ node, children, ...props }: any) {
                  return (
                    <blockquote className="border-l-4 border-accent pl-6 my-6 italic text-text-secondary" {...props}>
                      {children}
                    </blockquote>
                  );
                },
                // Custom horizontal rule
                hr({ node, ...props }: any) {
                  return (
                    <hr className="my-8 border-border" {...props} />
                  );
                },
                // Custom link styling
                a({ node, href, children, ...props }: any) {
                  const isExternal = href?.startsWith("http");
                  return (
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="text-accent hover:underline underline-offset-2"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
