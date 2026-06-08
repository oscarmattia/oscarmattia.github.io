const Blog = () => {
  return (
    <section id="blog" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">Blog</h2>
        <p className="text-text-secondary mb-12">
          Thoughts on engineering, research, and technology.
        </p>

        <div className="text-center py-12 rounded-lg border border-border bg-secondary/30">
          <p className="text-lg font-medium text-foreground">Coming soon</p>
          <p className="mt-2 text-sm text-text-secondary">
            New posts are on the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
