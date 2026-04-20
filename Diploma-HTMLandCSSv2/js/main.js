const feedbackSwiperElement = document.querySelector(".feedback__swiper");

if (feedbackSwiperElement && typeof Swiper !== "undefined") {
  new Swiper(feedbackSwiperElement, {
    slidesPerView: 1.1,
    spaceBetween: 16,
    speed: 700,
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: ".feedback__button-arrow--next",
      prevEl: ".feedback__button-arrow--prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3.2,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 4.2,
        spaceBetween: 20,
      },
    },
  });
}

const headerElement = document.querySelector(".header");
const burgerButtonElement = document.querySelector(".header__burger");
const headerMenuElement = document.querySelector(".header__menu");
const pageBodyElement = document.querySelector(".page__body");
const burgerBreakpoint = 992;

if (
  headerElement &&
  burgerButtonElement &&
  headerMenuElement &&
  pageBodyElement
) {
  const swipeCloseThresholdPx = 70;
  let menuTouchStartX = 0;

  const resetMenuDragStyles = () => {
    headerMenuElement.style.transition = "";
    headerMenuElement.style.transform = "";
  };

  const closeBurgerMenu = () => {
    resetMenuDragStyles();
    headerElement.classList.remove("menu-open");
    burgerButtonElement.setAttribute("aria-expanded", "false");
    burgerButtonElement.setAttribute("aria-label", "Открыть меню");
    pageBodyElement.classList.remove("no-scroll");
  };

  const openBurgerMenu = () => {
    resetMenuDragStyles();
    headerElement.classList.add("menu-open");
    burgerButtonElement.setAttribute("aria-expanded", "true");
    burgerButtonElement.setAttribute("aria-label", "Закрыть меню");
    pageBodyElement.classList.add("no-scroll");
  };

  const handleMenuTouchStart = (event) => {
    if (window.innerWidth > burgerBreakpoint) return;
    if (!headerElement.classList.contains("menu-open")) return;
    const touch = event.touches[0];
    if (!touch) return;
    menuTouchStartX = touch.clientX;
    headerMenuElement.style.transition = "none";
  };

  const handleMenuTouchMove = (event) => {
    if (window.innerWidth > burgerBreakpoint) return;
    if (!headerElement.classList.contains("menu-open")) return;
    const touch = event.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX - menuTouchStartX;
    const translateX = Math.min(0, deltaX);
    headerMenuElement.style.transform = `translateX(${translateX}px)`;
  };

  const handleMenuTouchEnd = (event) => {
    if (window.innerWidth > burgerBreakpoint) return;
    const touch = event.changedTouches[0];
    if (!touch) {
      resetMenuDragStyles();
      return;
    }
    if (!headerElement.classList.contains("menu-open")) {
      resetMenuDragStyles();
      return;
    }
    const deltaX = touch.clientX - menuTouchStartX;
    headerMenuElement.style.transition = "";
    headerMenuElement.style.transform = "";
    if (deltaX < -swipeCloseThresholdPx) {
      closeBurgerMenu();
    }
  };

  document.addEventListener("touchstart", handleMenuTouchStart, {
    passive: true,
    capture: true,
  });
  document.addEventListener("touchmove", handleMenuTouchMove, {
    passive: true,
    capture: true,
  });
  document.addEventListener("touchend", handleMenuTouchEnd, {
    passive: true,
    capture: true,
  });

  burgerButtonElement.addEventListener("click", (event) => {
    event.stopPropagation();
    const isMenuOpen = headerElement.classList.contains("menu-open");
    if (isMenuOpen) {
      closeBurgerMenu();
      return;
    }
    openBurgerMenu();
  });

  document.addEventListener("click", (event) => {
    const targetElement = event.target;
    if (!(targetElement instanceof Element)) return;

    const isClickOnMenuLink = targetElement.closest(".menu__link");
    if (isClickOnMenuLink && window.innerWidth <= burgerBreakpoint) {
      closeBurgerMenu();
      return;
    }

    const isClickInsideMenu = targetElement.closest(".header__menu");
    const isClickOnBurger = targetElement.closest(".header__burger");
    if (!isClickInsideMenu && !isClickOnBurger) {
      closeBurgerMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeBurgerMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > burgerBreakpoint) {
      closeBurgerMenu();
    }
  });
}
