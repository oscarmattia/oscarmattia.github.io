import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import {
  brandColors,
  diagramContainerClassName,
  diagramContainerStyle,
  mermaidThemeVariables,
} from "@/lib/brandTheme";

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mermaidRef.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: mermaidThemeVariables,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis",
      },
    });

    mermaidRef.current.innerHTML = "";

    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    mermaid
      .render(id, chart)
      .then((result) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = result.svg;
          const svg = mermaidRef.current.querySelector("svg");
          if (svg) {
            svg.style.maxWidth = "100%";
            svg.style.height = "auto";
            svg.style.background = "transparent";
          }
        }
      })
      .catch((error) => {
        console.error("Mermaid rendering error:", error);
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `<div style="color:${brandColors.orange};padding:1rem;background:${brandColors.orangeMuted};border:1px solid ${brandColors.orange};border-radius:0.5rem;">
            <p style="font-weight:600;margin:0;">Error rendering diagram</p>
            <p style="font-size:0.875rem;margin:0.25rem 0 0;color:${brandColors.textOnDark};">${error.message}</p>
          </div>`;
        }
      });
  }, [chart]);

  return (
    <div
      ref={mermaidRef}
      className={diagramContainerClassName}
      style={diagramContainerStyle}
    />
  );
};

export default MermaidDiagram;
