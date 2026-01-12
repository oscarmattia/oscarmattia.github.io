# Blog Post Setup Summary

## What Was Implemented

### 1. Markdown Rendering with Full Support

The blog post component now uses `react-markdown` with:
- **Full markdown support**: Headings, paragraphs, lists, blockquotes, etc.
- **GitHub Flavored Markdown**: Tables, strikethrough, task lists via `remark-gfm`
- **Syntax highlighting**: Code blocks with language-specific highlighting using `react-syntax-highlighter`
- **Image support**: Both static images (from `public/blog/`) and external URLs
- **Custom styling**: Integrated with your design system using Tailwind Typography

### 2. Image Support

**Two approaches for diagrams:**

1. **Copy Existing Diagrams**: Use `scripts/copy-toolbox-images.py` to copy existing diagrams from your toolbox repository
2. **Mermaid Diagrams**: Create diagrams directly in markdown using Mermaid syntax

### 3. Image Structure

- **Static Images**: Stored in `public/blog/`, accessible via `/blog/image-name.png`
- **Mermaid Diagrams**: Written in markdown, rendered client-side
- **Formats**: PNG, JPG, SVG, GIF for static images; all Mermaid diagram types for diagrams

## How to Use

### Writing Blog Posts

Edit `src/data/blogPosts.ts` and add your markdown content:

```typescript
{
  title: "Your Post Title",
  excerpt: "Brief description",
  date: "Jan 10, 2026",
  readTime: "10 min read",
  slug: "your-post-slug",
  content: `# Your Post Title

Your markdown content here with:

- Code blocks with syntax highlighting
- Images
- Tables
- And more!

\`\`\`python
def example():
    pass
\`\`\`

![Image Description](/blog/your-image.png)
`
}
```

### Adding Images and Diagrams

**Option 1: Copy existing diagrams from toolbox**
```bash
python scripts/copy-toolbox-images.py
```

**Option 2: Use Mermaid diagrams in markdown**
\`\`\`mermaid
graph LR
    A[Input] --> B[Process]
    B --> C[Output]
\`\`\`

**Option 3: Add static images manually**
Place images in `public/blog/` and reference:
```markdown
![Description](/blog/image-name.png)
```

### Code Examples

Use fenced code blocks with language specification:

\`\`\`python
# Python code
def example():
    return "Hello"
\`\`\`

\`\`\`javascript
// JavaScript code
const example = () => "Hello";
\`\`\`

## Features

✅ Full markdown support  
✅ Syntax highlighting for code blocks  
✅ Mermaid diagram support (flowcharts, sequence diagrams, etc.)  
✅ Static image support (from toolbox or manual)  
✅ Tables (GitHub Flavored Markdown)  
✅ Custom styling matching your design system  
✅ Dark mode support for diagrams  
✅ Responsive and accessible  

## Next Steps

1. Run `npm install` to install the new packages (if not already installed)
2. Generate images using the script (update TOOLBOX_DIR path first)
3. Add image references to your blog post content
4. Test the blog post at `/blog/calibration-of-time-interleaved-adcs`

## Documentation

- [Blog Markdown Guide](./BLOG_MARKDOWN_GUIDE.md) - How to write markdown
- [Blog Images Guide](./BLOG_IMAGES.md) - How to add and generate images
