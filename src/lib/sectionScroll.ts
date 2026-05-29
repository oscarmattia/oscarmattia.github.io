import type { MouseEvent } from "react";

const NAV_OFFSET = 64;

function getDocumentTop(element: HTMLElement) {
  return element.getBoundingClientRect().top + window.scrollY;
}

function getMaxScrollY() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

export function navigateToSection(href: string) {
  if (!href.startsWith("#")) {
    return false;
  }

  const id = href.slice(1);
  const element = document.getElementById(id);

  if (!element) {
    return false;
  }

  const elementTop = getDocumentTop(element);
  const elementHeight = element.offsetHeight;
  const viewportHeight = window.innerHeight;

  const centeredScroll = elementTop + elementHeight / 2 - viewportHeight / 2;
  const startScroll = elementTop - NAV_OFFSET;
  const maxScroll = getMaxScrollY();

  // Prefer centered scroll, but fall back when the section is near the page bottom.
  const targetScroll =
    centeredScroll > maxScroll
      ? Math.max(startScroll, maxScroll)
      : Math.max(startScroll, centeredScroll);

  window.scrollTo({ top: Math.min(targetScroll, maxScroll), behavior: "smooth" });
  return true;
}

export function getActiveSectionId(sectionIds: readonly string[]) {
  const viewportAnchor = window.scrollY + window.innerHeight * 0.35;
  const maxScroll = getMaxScrollY();

  if (window.scrollY >= maxScroll - 8) {
    return sectionIds[sectionIds.length - 1];
  }

  let activeId = sectionIds[0];
  let nearestDistance = Infinity;

  for (const id of sectionIds) {
    const element = document.getElementById(id);
    if (!element) {
      continue;
    }

    const sectionAnchor = getDocumentTop(element) + element.offsetHeight * 0.35;
    const distance = Math.abs(viewportAnchor - sectionAnchor);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      activeId = id;
    }
  }

  return activeId;
}

export function handleSectionNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (navigateToSection(href)) {
    event.preventDefault();
  }
}
