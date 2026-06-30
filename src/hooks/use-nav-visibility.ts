"use client";

import { useEffect, useRef, useState } from "react";

interface NavVisibilityOptions {
  hideThreshold?: number;
  scrollUpThreshold?: number;
}

interface NavVisibilityResult {
  visible: boolean;
  scrollUp: boolean;
}

export function useNavVisibility({
  hideThreshold = 80,
  scrollUpThreshold = 0,
}: NavVisibilityOptions = {}): NavVisibilityResult {
  const [visible, setVisible] = useState(true);
  const [scrollUp, setScrollUp] = useState(false);
  const lastScrollY = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion.current) {
      setVisible(true);
      setScrollUp(false);
      return;
    }

    const handleScroll = () => {
      const currentY = window.scrollY;
      const prevY = lastScrollY.current;

      if (currentY <= hideThreshold) {
        setVisible(true);
        setScrollUp(false);
      } else {
        const isScrollingUp = currentY < prevY;

        if (isScrollingUp) {
          const upDelta = prevY - currentY;
          setVisible(true);
          setScrollUp(upDelta >= scrollUpThreshold);
        } else {
          setVisible(false);
          setScrollUp(false);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideThreshold, scrollUpThreshold]);

  return { visible, scrollUp };
}
