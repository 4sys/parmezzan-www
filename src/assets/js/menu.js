document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelectorAll(".hs-accordion-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!button.parentElement.classList.contains("active")) {
        button.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
  
  window.onload = function () {
    document.getElementsByClassName("preloader")[0]?.remove();
  };
  const lenis = new Lenis({ lerp: 0.1, duration: 1.5, wheelMultiplier: 1.2, autoRaf: true });
  let backToTop = document.getElementById("scroll-to-top");

  backToTop.addEventListener("click", function () {
    lenis.scrollTo(0, 0);
  });

  window.onscroll = function () {
    checkScroll();
  };

  function checkScroll() {
    let isScrolled = document.documentElement.scrollTop > 200;
    let isVisible = backToTop.classList.contains("show");

    if (isScrolled !== isVisible) {
      backToTop.classList.toggle("show", isScrolled);
      backToTop.classList.toggle("hide", !isScrolled);
      backToTop.style.display = isScrolled ? "block" : "none";
    }
  }
});

