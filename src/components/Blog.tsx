import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    title: "Building Accessible React Components",
    excerpt: "A deep dive into creating accessible UI components that work for everyone.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    slug: "#",
  },
  {
    title: "TypeScript Best Practices in 2024",
    excerpt: "Modern TypeScript patterns and practices for cleaner, more maintainable code.",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    slug: "#",
  },
  {
    title: "The Art of Code Review",
    excerpt: "How to give constructive feedback and improve team collaboration.",
    date: "Oct 12, 2024",
    readTime: "5 min read",
    slug: "#",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="section-padding">
      <div className="container-narrow">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Blog</h2>
            <p className="text-text-secondary">Thoughts on code, design, and craft.</p>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid gap-8">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.slug}
              className="group block pb-8 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4 text-xs text-text-tertiary mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-text-secondary text-sm">
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>

        <a
          href="#"
          className="md:hidden mt-8 inline-flex items-center gap-2 text-sm text-accent"
        >
          View all posts
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default Blog;
