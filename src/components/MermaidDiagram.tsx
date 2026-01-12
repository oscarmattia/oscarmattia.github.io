import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect dark mode
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(isDarkMode);
      return isDarkMode;
    };

    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mermaidRef.current) return;

    // Initialize Mermaid with theme support
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      themeVariables: isDark
        ? {
            primaryColor: "#3b82f6",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#4b5563",
            lineColor: "#9ca3af",
            secondaryColor: "#1f2937",
            tertiaryColor: "#374151",
            background: "#111827",
            mainBkg: "#1f2937",
            secondBkg: "#374151",
            textColor: "#ffffff",
          }
        : {
            primaryColor: "#3b82f6",
            primaryTextColor: "#000000",
            primaryBorderColor: "#d1d5db",
            lineColor: "#6b7280",
            secondaryColor: "#f3f4f6",
            tertiaryColor: "#e5e7eb",
            background: "#ffffff",
            mainBkg: "#f9fafb",
            secondBkg: "#f3f4f6",
            textColor: "#000000",
          },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis",
      },
    });

    // Clear previous content
    mermaidRef.current.innerHTML = "";

    // Generate unique ID for this diagram
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    // Render the diagram
    mermaid
      .render(id, chart)
      .then((result) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = result.svg;
          // Make SVG responsive
          const svg = mermaidRef.current.querySelector("svg");
          if (svg) {
            svg.style.maxWidth = "100%";
            svg.style.height = "auto";
          }
        }
      })
      .catch((error) => {
        console.error("Mermaid rendering error:", error);
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `<div class="text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
            <p class="font-semibold">Error rendering diagram</p>
            <p class="text-sm mt-1">${error.message}</p>
          </div>`;
        }
      });
  }, [chart, isDark]);

  return (
    <div
      ref={mermaidRef}
      className="my-8 flex justify-center items-center bg-secondary/30 dark:bg-secondary/50 rounded-lg p-4 overflow-x-auto border border-border"
    />
  );
};

export default MermaidDiagram;
