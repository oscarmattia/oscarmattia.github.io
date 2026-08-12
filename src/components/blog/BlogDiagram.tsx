import type { ReactNode } from "react";
import AmsLibraryStackDiagram from "./AmsLibraryStackDiagram";

const blogDiagrams: Record<string, () => ReactNode> = {
  "ams-library-stack": () => <AmsLibraryStackDiagram />,
};

/** Resolve a fenced `diagram` code block id to a React diagram component. */
export const renderBlogDiagram = (diagramId: string): ReactNode | null => {
  const key = diagramId.trim();
  const render = blogDiagrams[key];
  return render ? render() : null;
};

export const knownBlogDiagramIds = Object.keys(blogDiagrams);
