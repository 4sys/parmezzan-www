document.addEventListener("DOMContentLoaded", function (event) {
  const lenis = new Lenis({ lerp: 0, duration: 2, wheelMultiplier: 1.2 });
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.ticker.lagSmoothing(0);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  ScrollTrigger.normalizeScroll(true);

  let container = document.querySelector(".slides"),
    slides = gsap.utils.toArray(".slide"),
    getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

  slides.forEach((slide, i) => {
    let bg = slide.querySelector(".background"),
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: () => (i ? "top bottom" : "top top"),
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

    const dampingFactor = 0.1;

    tl.fromTo(
      bg,
      {
        y: () => (i ? -window.innerHeight * getRatio(slide) * dampingFactor : 0),
      },
      {
        y: () => window.innerHeight * (1 - getRatio(slide)) * dampingFactor,
        ease: "none",
      }
    );
  });
});
