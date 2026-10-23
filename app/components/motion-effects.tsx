"use client";

import { useEffect } from "react";

const revealSelector = [
  ".section-title",
  ".service-card",
  ".transfer-card",
  ".booking-wrap",
  ".transfer-intro > *",
  ".transfer-detail > h1",
  ".transfer-detail-photo",
  ".transfer-description > h2",
  ".transfer-description > h3",
  ".transfer-description > p",
  ".tour-facts",
  ".tour-itinerary > li",
  ".excursion-highlights > li",
  ".cta-inner",
  ".booking-steps-grid article",
  ".journey-gallery-photo",
  ".journey-card",
].join(",");

export function MotionEffects() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    function syncPreference() {
      dispose();
      if (preference.matches || !("IntersectionObserver" in window)) return;

      const registered = new WeakSet<Element>();
      const animations = new Set<Animation>();
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
          const element = entry.target;
          observer.unobserve(element);
          element.dataset.motion = "revealed";
          const isCard = element.matches(".transfer-card, .service-card, .journey-card");
          const index = isCard && element.parentElement
            ? Array.from(element.parentElement.children).indexOf(element) % 3
            : 0;
          const animation = element.animate(
            [{ opacity: 0, translate: "0 22px" }, { opacity: 1, translate: "0 0" }],
            { duration: 560, delay: index * 70, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
          );
          animations.add(animation);
          const release = () => animations.delete(animation);
          void animation.finished.then(release, release);
        }
      }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });

      function register(element: Element) {
        if (!(element instanceof HTMLElement) || registered.has(element) || element.closest("dialog, .home-page")) return;
        registered.add(element);
        element.dataset.motion = "ready";
        observer.observe(element);
      }

      function scan(root: ParentNode) {
        if (root instanceof Element && root.matches(revealSelector)) register(root);
        root.querySelectorAll(revealSelector).forEach(register);
      }

      scan(document.body);
      // Observe new catalogue results and pages mounted by client navigation.
      const mutations = new MutationObserver((records) => {
        for (const record of records) {
          for (const node of record.addedNodes) {
            if (node instanceof Element) scan(node);
          }
        }
      });
      mutations.observe(document.body, { childList: true, subtree: true });

      dispose = () => {
        observer.disconnect();
        mutations.disconnect();
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      };
    }

    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => {
      preference.removeEventListener("change", syncPreference);
      dispose();
    };
  }, []);

  return null;
}
