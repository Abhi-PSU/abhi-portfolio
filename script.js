/* ============================================================
   Program 1: Mobile nav menu toggle
   Opens/closes the mobile navigation menu and closes it again
   whenever a link inside it is clicked.
   ============================================================ */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ============================================================
   Program 2: Scroll-spy active nav link
   Watches which page section is currently in view and highlights
   the matching link in the nav bar.
   ============================================================ */
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => spyObserver.observe(section));

/* ============================================================
   Program 3: Back-to-top button
   Shows a floating button once the visitor scrolls past the hero,
   and smooth-scrolls back to the top of the page when clicked.
   ============================================================ */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  const revealEls = document.querySelectorAll(
    ".stat, .project, .timeline-row, .toolkit-col, .note-card, .moto-feature, .edu-grid > *, .contact-grid > *"
  );

  revealEls.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    },
    { threshold: 0.15, rootMargin: "-5% 0px -5% 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}
