document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
  const lazyBackgrounds = document.querySelectorAll(".lazy-bg");

  const lazyLoad = () => {
    lazyBackgrounds.forEach((element) => {
      let bgUrl;

      // Determine the correct image based on screen size
      if (window.innerWidth >= 1024) {
        bgUrl = element.getAttribute("data-bg-xl"); // lg: screens
      } else if (window.innerWidth >= 768) {
        bgUrl = element.getAttribute("data-bg-md"); // md: screens
      } else {
        bgUrl = element.getAttribute("data-bg-sm"); // sm: screens
      }

      if (bgUrl) {
        element.style.backgroundImage = bgUrl;
        element.classList.remove("lazy-bg"); // Optional: Remove the class after loading
      }
    });
  };

  // Initial load check
  lazyLoad();

  // Check on scroll
  window.addEventListener("scroll", lazyLoad);

  // Check on resize (to handle responsive changes)
  window.addEventListener("resize", lazyLoad);


  const lenis = new Lenis({ lerp: 0.1, duration: 1.5, wheelMultiplier: 1.2 });
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

