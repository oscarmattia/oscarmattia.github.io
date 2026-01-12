# Blog Images Guide

This guide explains how to add and use images and diagrams in blog posts.

## Two Approaches: Static Images and Mermaid Diagrams

### 1. Static Images (from Toolbox)

Copy existing diagrams from your data-converter-toolbox repository.

### 2. Mermaid Diagrams (Markdown-based)

Create diagrams directly in markdown using Mermaid syntax.

## Copying Existing Diagrams from Toolbox

### Setup

1. Update the `TOOLBOX_DIR` path in `scripts/copy-toolbox-images.py`:

```python
TOOLBOX_DIR = Path("/path/to/your/data_converter_toolbox")
```

2. Run the script:

```bash
python scripts/copy-toolbox-images.py
```

The script will:
- Search for images in common locations (docs/images, images/, etc.)
- Copy them to `public/blog/` directory
- Preserve original filenames

### Using Copied Images

Reference images in markdown:

```markdown
![Description](/blog/diagram-name.png)
```

## Creating Mermaid Diagrams

Mermaid diagrams are written directly in markdown and rendered automatically.

### Basic Flowchart

\`\`\`mermaid
graph LR
    A[Input] --> B[Process]
    B --> C[Output]
\`\`\`

### Architecture Diagram

\`\`\`mermaid
graph TB
    A[Input Signal] --> B[Channel 1]
    A --> C[Channel 2]
    A --> D[Channel 3]
    B --> E[MUX]
    C --> E
    D --> E
    E --> F[Output]
\`\`\`

### Comparison Diagram

\`\`\`mermaid
graph LR
    subgraph DSP["DSP-Based"]
        A1[ADC] --> A2[Digital]
        A2 --> A3[Output]
    end
    subgraph Analog["Analog"]
        B1[Clock] --> B2[Hardware]
        B2 --> B3[Output]
    end
\`\`\`

### Supported Diagram Types

- Flowcharts (`graph`, `flowchart`)
- Sequence diagrams (`sequenceDiagram`)
- Class diagrams (`classDiagram`)
- State diagrams (`stateDiagram`)
- Gantt charts (`gantt`)
- And more - see [Mermaid documentation](https://mermaid.js.org/)

## Image Best Practices

### Static Images
- **Resolution**: Use high-resolution images (300 DPI) for clarity
- **Format**: PNG for diagrams, JPG for photos
- **Size**: Optimize images for web
- **Naming**: Use descriptive, kebab-case names
- **Alt Text**: Always include descriptive alt text

### Mermaid Diagrams
- Keep diagrams simple and readable
- Use descriptive node labels
- Group related elements with subgraphs
- Test diagrams in both light and dark modes

## Example Blog Post

```markdown
## Architecture Overview

Time-interleaved ADCs use multiple channels:

\`\`\`mermaid
graph LR
    A[Input] --> B[Channel 1]
    A --> C[Channel 2]
    B --> D[MUX]
    C --> D
\`\`\`

## Existing Diagram

For complex diagrams from the toolbox:

![Complex Diagram](/blog/existing-diagram.png)
```

## Supported Formats

- **Static Images**: PNG, JPG/JPEG, SVG, GIF
- **Mermaid**: All diagram types supported by Mermaid.js
- **External Images**: Any URL (use with caution for performance)

All images support lazy loading and are optimized by the browser.
