# Blog Image Scripts

This directory contains scripts to copy existing diagrams from the data-converter-toolbox repository for use in blog posts.

## Recommended Approach

### 1. Copy Existing Diagrams

Use `copy-toolbox-images.py` to copy existing diagrams from your toolbox repository:

```bash
python scripts/copy-toolbox-images.py
```

This script:
- Searches for existing diagrams in common locations (docs/images, images/, etc.)
- Copies them to `public/blog/` directory
- Preserves original filenames

### 2. Use Mermaid Diagrams for New Diagrams

For new diagrams, use Mermaid syntax directly in your markdown:

\`\`\`mermaid
graph LR
    A[Input] --> B[Process]
    B --> C[Output]
\`\`\`

Mermaid supports:
- Flowcharts
- Sequence diagrams
- Class diagrams
- State diagrams
- And more

See [Mermaid documentation](https://mermaid.js.org/) for syntax.

## Setup

1. Update the `TOOLBOX_DIR` path in `copy-toolbox-images.py` to point to your data-converter-toolbox repository

2. Run the script:
   ```bash
   python scripts/copy-toolbox-images.py
   ```

## Using Images in Blog Posts

### Static Images (from toolbox)

Reference copied images in your markdown:

```markdown
![Description](/blog/diagram-name.png)
```

### Mermaid Diagrams (in markdown)

Use Mermaid code blocks:

\`\`\`mermaid
graph TB
    A --> B
    B --> C
\`\`\`

Images are served from the `public/blog/` directory and will be accessible at `/blog/filename.png` in your application.
