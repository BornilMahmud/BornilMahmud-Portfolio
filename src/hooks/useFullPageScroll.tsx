import { useEffect, useState, useCallback, useRef } from "react";

interface UseFullPageScrollOptions {
  sectionIds: string[];
  animationDuration?: number;
}

export const useFullPageScroll = ({
  sectionIds,
  animationDuration = 800,
}: UseFullPageScrollOptions) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]));
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  const scrollToSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= sectionIds.length || isAnimating) return;

      setIsAnimating(true);
      setCurrentSection(index);
      
      // Mark section as visible for animation
      setVisibleSections((prev) => new Set([...prev, index]));

      const element = document.getElementById(sectionIds[index]);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
    },
    [sectionIds, isAnimating, animationDuration]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < animationDuration || isAnimating) return;

      lastScrollTime.current = now;

      if (e.deltaY > 0) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0) {
        scrollToSection(currentSection - 1);
      }
    },
    [currentSection, scrollToSection, isAnimating, animationDuration]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < animationDuration || isAnimating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 50) {
        lastScrollTime.current = now;
        if (deltaY > 0) {
          scrollToSection(currentSection + 1);
        } else {
          scrollToSection(currentSection - 1);
        }
      }
    },
    [currentSection, scrollToSection, isAnimating, animationDuration]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isAnimating) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToSection(sectionIds.length - 1);
      }
    },
    [currentSection, scrollToSection, isAnimating, sectionIds.length]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd, handleKeyDown]);

  return {
    currentSection,
    isAnimating,
    scrollToSection,
    visibleSections,
    totalSections: sectionIds.length,
  };
};

export default useFullPageScroll;
