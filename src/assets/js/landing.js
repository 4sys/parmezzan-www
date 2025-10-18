document.addEventListener("DOMContentLoaded", function (event) {
  const video = document.getElementById('bg-video');
  const toggle = document.getElementById('soundToggle');
  const iconMute = document.getElementById('icon-mute');
  const iconSound = document.getElementById('icon-sound');
  const videoSrc = 'assets/videos/parmezzan.m3u8';
  const replay = document.getElementById('replayButton');

  gsap.to(".preloader-logo", {
    delay: 0.3,
    opacity: "1",
    transform: "translateX(0px)",
    ease: "power4.inOut",
    duration: 1,
    onComplete: () => {
      video.addEventListener('loadedmetadata', () => video.play());
    }
  });

  if (Hls.isSupported()) {
    const hls = new Hls({
      maxBufferLength: 5,
      startLevel: -1,
    });
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
  }

  toggle.addEventListener('click', () => {
    video.muted = false;
    video.play();
    iconMute.style.display = 'none';
    iconSound.style.display = 'block';

    gsap.to(toggle, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
      pointerEvents: 'none',
      onComplete: () => {
        setTimeout(() => {
          toggle.style.display = 'none';
        }, 500);
      }
    });
  });

  video.addEventListener('ended', () => {
    replay.style.display = 'flex';
    gsap.to(replay, { opacity: 1, y: 0, duration: 0.5, pointerEvents: 'auto', ease: "power2.out" });
  });
  replay.addEventListener('click', () => {
    video.currentTime = 0;
    video.play();

    gsap.to(replay, { opacity: 0, y: 20, duration: 0.5, pointerEvents: 'none', ease: "power2.out" });

    iconMute.style.display = 'block';
    iconSound.style.display = 'none';
    gsap.to(toggle, { opacity: 1, y: 0, duration: 0.5, pointerEvents: 'auto', ease: "power2.out" });
  });
});

window.onload = function () {
  const lazyBackgrounds = document.querySelectorAll(".lazy-bg");

  const lazyLoad = () => {
    lazyBackgrounds.forEach((element) => {
      let bgUrl;
      if (window.innerWidth >= 1280) {
        bgUrl = element.getAttribute("data-bg-xl");
      } else if (window.innerWidth >= 768) {
        bgUrl = element.getAttribute("data-bg-md");
      } else {
        bgUrl = element.getAttribute("data-bg-sm");
      }

      if (bgUrl) {
        var img = new Image();
        img.src = bgUrl;
        img.onload = () => {
          if (element.getAttribute("data-style") == "dimmed") {
            element.style.backgroundImage = "linear-gradient(-90deg,rgba(0,0,0,0.4), rgba(0,0,0,0)), url(" + img.src + ")";
          } else {
            element.style.backgroundImage = "url(" + img.src + ")";
          }
          element.classList.remove("lazy-bg");
        };
      }
    });
  };

  lazyLoad();

  let resizeTimer;
  let lastWidth = window.innerWidth;
  const getViewportHeight = () => window.visualViewport?.height || window.innerHeight;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth !== lastWidth) {
        lazyLoad();
      }
      lastWidth = window.innerWidth;
    }, 300);
  });
  let backToTop = document.getElementById("scroll-to-top");

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.ticker.lagSmoothing(0);
  if (!window.mobileCheck()) {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.5, wheelMultiplier: 1.2 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    backToTop.addEventListener("click", function () {
      lenis.scrollTo(0, 0);
    });
  } else {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

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

  slides = gsap.utils.toArray(".slide");
  getRatio = (el) => getViewportHeight() / (getViewportHeight() + el.offsetHeight);

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

    const dampingFactor = 0.2;

    tl.fromTo(
      bg,
      {
        y: () => (i ? -getViewportHeight() * getRatio(slide) * dampingFactor : 0),
      },
      {
        y: () => getViewportHeight() * (1 - getRatio(slide)) * dampingFactor,
        ease: "none",
      }
    );
  });

  gsap.fromTo(
    ".header",
    {
      opacity: 1,
      y: -180,
    },
    {
      scrollTrigger: {
        trigger: "#bg-video",
        start: "top top",
        end: "+=350",
        scrub: true,
        onUpdate: (self) => {
          const header = document.querySelector('.header');
          let y;
          if (!window.mobileCheck()) {
            y = Math.round((-180) + self.progress * 180);
          } else {
            y = (-180) + self.progress * 180;
          }
          header.style.transform = `translateY(${y}px)`;
        },
      },
      opacity: 1,
      ease: "none",
    }
  );

  // gsap.fromTo(
  //   ".show-menu",
  //   {
  //     opacity: 1,
  //     transform: "translateY(0))",
  //   },
  //   {
  //     scrollTrigger: {
  //       trigger: ".first-slide",
  //       start: "center center-=200",
  //       end: "+=500",
  //       scrub: true,
  //     },
  //     opacity: 0,
  //     transform: "translateY(-30px)",
  //   });

  gsap.fromTo(
    ".main-logo",
    {
      opacity: 1,
      transform: "translateY(0))",
    },
    {
      scrollTrigger: {
        trigger: "#bg-video",
        start: "center center",
        end: "+=500",
        scrub: true,
      },
      opacity: 0,
      transform: "translateY(-30px)",
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
  gsap.to(".preloader", {
    delay: 1.8,
    transform: "translateX(100%)",
    ease: "power4.inOut",
    duration: 1,
  });
  // gsap.fromTo(".first-slide",
  //   {
  //     transform: "scale(2)",
  //   },
  //   {
  //     delay: 1.5,
  //     transform: "scale(1)",
  //     ease: "power4.inOut",
  //     duration: 1.5,
  //   }
  // );
  gsap.fromTo(".main-logo",
    {
      opacity: 0,
      transform: "scale(1.3) translateY(-50px)",
    },
    {
      delay: 1.7,
      transform: "scale(1) translateY(0px)",
      opacity: 1,
      ease: "power4.inOut",
      duration: 1.35,
    }
  );
  gsap.fromTo(".show-menu",
    {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    {
      delay: 1.8,
      transform: "translateY(0px)",
      opacity: 1,
      ease: "power4.inOut",
      duration: 1.35,
    }
  );

  setTimeout(() => {
    document.getElementsByClassName("preloader")[0]?.remove();
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    document.cookie = `loaded=true; expires=${expires.toUTCString()}; path=/`;
  }, 3000);
};

window.mobileCheck = function () {
  var check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}
