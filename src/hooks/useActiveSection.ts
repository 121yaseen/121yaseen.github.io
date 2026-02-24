import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (sections.length === 0) {
      return;
    }

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        }

        if (visibleRatios.size > 0) {
          const [nextId] =
            [...visibleRatios.entries()].sort((a, b) => b[1] - a[1])[0] ?? [sectionIds[0] ?? "", 0];
          if (nextId) {
            setActiveSectionId(nextId);
          }
          return;
        }

        const thresholdLine = window.innerHeight * 0.3;
        const closest = sections
          .map((section) => ({
            id: section.id,
            distance: Math.abs(section.getBoundingClientRect().top - thresholdLine)
          }))
          .sort((a, b) => a.distance - b.distance)[0];

        if (closest) {
          setActiveSectionId(closest.id);
        }
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0.15, 0.3, 0.5, 0.7]
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSectionId;
}
