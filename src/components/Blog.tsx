import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { publishedBlogPosts, blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const posts = publishedBlogPosts(blogPosts);
  const displayedPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="section-padding">
      <div className="container-narrow">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Blog</h2>
            <p className="text-text-secondary">Thoughts on engineering, research, and technology.</p>
          </div>
          {posts.length > 3 && (
            <Link
              to="/#blog"
              className="hidden md:inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
            >
              View all posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid gap-8">
          {displayedPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
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
              <p className="text-text-secondary text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        {posts.length > 3 && (
          <Link
            to="/#blog"
            className="md:hidden mt-8 inline-flex items-center gap-2 text-sm text-accent"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Blog;
