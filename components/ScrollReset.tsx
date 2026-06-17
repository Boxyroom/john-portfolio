"use client";

import { useEffect } from "react";

export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      return;
    }

    const resetScroll = () => window.scrollTo(0, 0);
    const resetFrame = window.requestAnimationFrame(resetScroll);
    const resetShortDelay = window.setTimeout(resetScroll, 0);
    const resetLongDelay = window.setTimeout(resetScroll, 120);

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted || window.location.hash) {
        return;
      }

      window.scrollTo(0, 0);
      window.requestAnimationFrame(resetScroll);
    }

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.cancelAnimationFrame(resetFrame);
      window.clearTimeout(resetShortDelay);
      window.clearTimeout(resetLongDelay);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
}
