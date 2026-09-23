const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ============================================================
   Program 1: Mobile nav menu toggle
   Opens/closes the mobile navigation menu and closes it again
   when a link inside it is clicked or Escape is pressed.
   ============================================================ */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = navLinks.querySelectorAll("a");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open);
}

menuToggle.addEventListener("click", () => {
  setMenu(!navLinks.classList.contains("open"));
});

navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) {
    setMenu(false);
    menuToggle.focus();
  }
});

/* ============================================================
   Program 2: Scroll-spy active nav link
   Watches which page section is currently in view and highlights
   the matching link in the nav bar. Sections without a nav link
   (hero, stats, contact) clear the highlight.
   ============================================================ */
const spyObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const hash = `#${entry.target.id}`;
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.hash === hash);
      });
    }
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

document.querySelectorAll("main > section").forEach((s) => spyObserver.observe(s));

/* ============================================================
   Program 3: Back-to-top button
   Shows a floating button once the hero has scrolled out of view,
   and scrolls back to the top of the page when clicked.
   ============================================================ */
const backToTop = document.getElementById("backToTop");

new IntersectionObserver(([entry]) => {
  backToTop.classList.toggle("visible", !entry.isIntersecting);
}).observe(document.querySelector(".hero"));

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});

/* ============================================================
   Program 4: Auto-updating footer year
   Fills in the copyright year from the visitor's system clock so
   it never has to be updated by hand.
   ============================================================ */
document.getElementById("year").textContent = new Date().getFullYear();

/* ============================================================
   Program 5: Scroll focus — blur content in and out of view
   Content sharpens into focus as it scrolls into the viewport
   and blurs back out as it scrolls past, on the way down or up.
   Skipped entirely for visitors who've asked for reduced motion.
   ============================================================ */
if (!prefersReducedMotion) {
  const revealEls = document.querySelectorAll(
    ".stat, .project, .timeline-row, .toolkit-col, .note-card, .moto-feature, .edu-grid > *, .contact-grid > *"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      }
    },
    { threshold: 0.15, rootMargin: "-5% 0px -5% 0px" }
  );

  revealEls.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}
