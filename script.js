"use strict";
const nav = document.querySelector(".nav");
const navLinksContainer = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__link");
const btnBars = document.querySelector(".btn__bars");
const header = document.querySelector(".header");
const section = document.querySelector(".section");
const allSections = document.querySelectorAll(".section");
const priceActive = document.querySelectorAll(".price");
const teamItems = document.querySelectorAll(".team__item");
const teamImgs = document.querySelectorAll(".team__img--wraper");
const teamText = document.querySelectorAll(".team__text");
const counters = document.querySelectorAll(".count");
const btnsReadMore = document.querySelectorAll(".btn__read");

// Page navigation
// document.documentElement.scrollTop = 0;
// document.body.scrollTop = 0;
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Sticky navigation
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  treshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal section and nav-link underline
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    const id = entry.target.dataset.section;
    const linkActive = document.querySelector(
      `.nav__link[href='#section--${id}']`
    );
    linkActive.classList.add("active");
    navLinks.forEach((item) => {
      if (item != linkActive) {
        item.classList.remove("active");
      }
    });
  }
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

// Prices active
priceActive.forEach((price) =>
  price.addEventListener("mouseover", function (e) {
    price.classList.add("price__active");
    price.querySelector(".btn__price").classList.remove("btn--hidden");
  })
);
priceActive.forEach((price) =>
  price.addEventListener("mouseout", function (e) {
    price.classList.remove("price__active");
    price.querySelector(".btn__price").classList.add("btn--hidden");
  })
);

// Menu fade animation
teamItems.forEach((item) =>
  item.addEventListener("mouseover", function (e) {
    const hover = e.target;
    const siblingsText = hover
      .closest(".team__item")
      .querySelectorAll(".redHover");
    const siblingsImg = hover
      .closest(".team__item")
      .querySelectorAll(".team__img");

    siblingsText.forEach((el) => {
      el.classList.add("team__item--active");
    });
    siblingsImg.forEach((el) => {
      el.classList.add("team__img--active");
    });
  })
);
teamItems.forEach((item) =>
  item.addEventListener("mouseout", function (e) {
    const hover = e.target;
    const siblingsText = hover
      .closest(".team__item")
      .querySelectorAll(".redHover");
    const siblingsImg = hover
      .closest(".team__item")
      .querySelectorAll(".team__img");

    siblingsText.forEach((el) => {
      el.classList.remove("team__item--active");
    });
    siblingsImg.forEach((el) => {
      el.classList.remove("team__img--active");
    });
  })
);

// Number counter
counters.forEach((counter) => {
  const updateCount = () => {
    const target = parseInt(counter.getAttribute("data-target"));
    const count = parseInt(counter.innerText);

    if (count < target) {
      counter.innerText = count + 1;
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// Read more read less text
btnsReadMore.forEach((btnReadMore) =>
  btnReadMore.addEventListener("click", function (e) {
    console.log(e.target);
    const id = e.target.dataset.btnread;
    console.log(id);
    const dots = document.querySelector(`.dots__read--${id}`);
    console.log(dots);
    const moreText = document.querySelector(`.text__read--${id}`);
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      e.target.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      moreText.style.display = "inline";
      e.target.innerHTML = "Read less";
    }
  })
);

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
  //Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// Responsive top bar
btnBars.addEventListener("click", function (e) {
  e.preventDefault();
  if (navLinksContainer.style.display !== "block") {
    navLinksContainer.style.display = "block";
    navLinksContainer.style.marginTop = "20px";
    navLinks.forEach((el) => {
      el.style.border = "none";
      el.addEventListener("click", function () {
        navLinksContainer.style.display = "none";
      });
    });
  } else {
    navLinksContainer.style.display = "none";
  }
});
