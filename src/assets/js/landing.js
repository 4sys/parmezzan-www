document.addEventListener("DOMContentLoaded", function (event) {
  gsap.to(".preloader-logo", {
    delay: 0.3,
    opacity: "1",
    transform: "translateX(0px)",
    ease: "power4.inOut",
    duration: 1,
  });
});

window.onload = function () {
  const lazyBackgrounds = document.querySelectorAll(".lazy-bg");

  const lazyLoad = () => {
    lazyBackgrounds.forEach((element) => {
      let bgUrl;

      if (window.innerWidth >= 1280) {
        bgUrl = element.getAttribute("data-bg-xl"); // xl: screens
      } else if (window.innerWidth >= 768) {
        bgUrl = element.getAttribute("data-bg-md"); // md: screens
      } else {
        bgUrl = element.getAttribute("data-bg-sm"); // sm: screens
      }

      if (bgUrl) {
        element.style.backgroundImage = bgUrl;
        element.classList.remove("lazy-bg");
      }
    });
  };

  lazyLoad();
  window.addEventListener("scroll", lazyLoad);
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

  gsap.to(".preloader-logo", {
    delay: 1.3,
    opacity: "0",
    transform: "translateX(10px)",
    ease: "power4.inOut",
    duration: 1,
  });
  gsap.to(".preloader", {
    delay: 1.8,
    transform: "translateX(100%)",
    ease: "power4.inOut",
    duration: 1,
  });
  setTimeout(() => {
    document.getElementsByClassName("preloader")[0]?.remove();
  }, 3000);
};
