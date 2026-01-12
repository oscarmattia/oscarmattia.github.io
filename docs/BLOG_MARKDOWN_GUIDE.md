# Blog Post Markdown Guide

This guide explains how to write blog posts using markdown with full support for code highlighting, images, and extended features.

## Markdown Features Supported

### Headings

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`inline code`
```

### Code Blocks with Syntax Highlighting

```markdown
\`\`\`python
def example_function():
    return "Hello, World!"
\`\`\`

\`\`\`javascript
const example = () => {
  console.log("Hello, World!");
};
\`\`\`
```

Supported languages: python, javascript, typescript, java, c, cpp, go, rust, bash, and many more.

### Mermaid Diagrams

Create diagrams directly in markdown:

\`\`\`mermaid
graph LR
    A[Start] --> B[Process]
    B --> C[End]
\`\`\`

See [Mermaid documentation](https://mermaid.js.org/) for all diagram types and syntax.

### Images

**Static images from public/blog/:**

```markdown
![Description of image](/blog/image-name.png)
```

**External images:**

```markdown
![Description](https://example.com/image.png)
```

### Links

```markdown
[Link text](https://example.com)
[Internal link](/blog/another-post)
```

### Lists

**Unordered:**
```markdown
- Item 1
- Item 2
  - Nested item
```

**Ordered:**
```markdown
1. First item
2. Second item
3. Third item
```

### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```

### Tables (GitHub Flavored Markdown)

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Horizontal Rules

```markdown
---
```

## Example Blog Post Structure

```markdown
# Blog Post Title

## Introduction

Introduction paragraph here.

## Section 1

Content with **bold** and *italic* text.

### Subsection

![Diagram](/blog/diagram.png)

Code example:

\`\`\`python
def example():
    pass
\`\`\`

## Section 2

| Feature | DSP-Based | Analog |
|---------|-----------|--------|
| Power   | High      | Low    |
| Accuracy| Medium    | High   |

## Conclusion

Final thoughts here.
```

## Tips

1. **Code Blocks**: Always specify the language for proper syntax highlighting
2. **Images**: Use descriptive alt text for accessibility
3. **Tables**: Keep tables simple and readable
4. **Links**: Use descriptive link text
5. **Formatting**: Use formatting sparingly for emphasis

## Image Generation

See [BLOG_IMAGES.md](./BLOG_IMAGES.md) for details on generating images from data-converter-toolbox scripts.
