/*
Note: This scripts is dedicated
to the home page (html/home/index.html)
*/
import { get, getAll } from "../utils.js";
import { htmlIndicatorBtn, htmlTestimony, testimonials } from "./data.js";

/* --------------------------------------- */
/*             Banner Counters             */
/* --------------------------------------- */
// dom
const counterWrapper = get("#counter");
const counters = getAll(`[data-name="counter"]`);

// functions
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        handleCounters();
        observer.unobserve(counterWrapper);
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.65,
  }
);

counterObserver.observe(counterWrapper);

function renderCount(counter, number) {
  if (!counter) return;
  const addition = number / 100;
  counter.textContent = 0;

  let init = 0;
  const interval = setInterval(() => {
    init += addition;
    if (init >= number) clearInterval(interval);
    counter.textContent = Math.min(Math.ceil(init), number);
  }, 50);
}

function handleCounters() {
  counters.forEach((counter) => {
    const number = parseInt(counter.dataset.value) || 0;
    renderCount(counter, number);
  });
}

/* --------------------------------------- */
/*               Testimonials              */
/* --------------------------------------- */
// Dom elements
const testimonyWrapper = get(`[data-name="testimonyWrapper"]`); //testimonies parent wrapper
const indicatorWrapper = get(`[data-name="indicatorWrapper"]`); //circular btn wrapper
const leftArrow = get(`[data-name="leftArrow"]`); //left arrow btn
const rightArrow = get(`[data-name="rightArrow"]`); //right arrow btn

// variables
let currentCard;

// functions
function renderTesimonials(testimonials) {
  const testimonies = testimonials
    .map((testimony) => {
      return htmlTestimony(testimony);
    })
    .join("");

  const indicatorBtns = testimonials
    .map(() => {
      return htmlIndicatorBtn();
    })
    .join("");

  testimonyWrapper.innerHTML = testimonies;
  indicatorWrapper.innerHTML = indicatorBtns;

  const allIndicatorBtn = getAll("span", indicatorWrapper); //circular btn
  const allTestimonies = getAll("article", testimonyWrapper); //testimony cards

  allTestimonies.forEach((testimony, index) => {
    allIndicatorBtn[index].addEventListener("click", () => {
      setActiveTestimony(testimony, allIndicatorBtn[index]);
    });

    testimony.addEventListener("click", () => {
      setActiveTestimony(testimony, allIndicatorBtn[index]);
    });
  });

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.65,
  };

  const observerHandler = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let index = 0;
        if (window.innerWidth >= 1152) index = 1;
        setActiveTestimony(allTestimonies[index], allIndicatorBtn[index]);
        observer.unobserve(testimonyWrapper);
      }
    });
  };

  const observer = new IntersectionObserver(observerHandler, options);
  observer.observe(testimonyWrapper);
}

function setActiveTestimony(testimony, btn) {
  let active_testimony = "home_testimonycard_active";
  let inactive_testimony = "home_testimonycard_inactive";

  let active_btn = "home_testimony_indicator_active";
  let inactive_btn = "home_testimony_indicator_inactive";

  const allTestimonies = getAll("article", testimonyWrapper); //testimony cards
  const allIndicatorBtn = getAll("span", indicatorWrapper); //circular btn

  allIndicatorBtn.forEach((btn) => {
    btn.classList.remove(active_btn);
    btn.classList.add(inactive_btn);
  }); //reset indicator button active classes

  allTestimonies.forEach((testimony) => {
    testimony.classList.remove(active_testimony);
    testimony.classList.add(inactive_testimony);
  }); //reset testimony card active classes

  testimony.classList.remove(inactive_testimony);
  testimony.classList.add(active_testimony);

  btn.classList.remove(inactive_btn);
  btn.classList.add(active_btn);

  testimony.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });

  currentCard = testimony;
}

function nextTestimony() {
  const allTestimonies = getAll("article", testimonyWrapper);

  currentCard = currentCard || allTestimonies[0];
  let nextCard = currentCard.nextElementSibling || allTestimonies[0];
  let nextBtnIndex = allTestimonies.indexOf(nextCard);
  let nextBtn = getAll("span", indicatorWrapper)[nextBtnIndex];

  setActiveTestimony(nextCard, nextBtn);
  currentCard = nextCard;
}

function prevTestimony() {
  const allTestimonies = getAll("article", testimonyWrapper);
  currentCard = currentCard || allTestimonies[0];
  let prevCard =
    currentCard.previousElementSibling ||
    allTestimonies[allTestimonies.length - 1];
  let prevBtnIndex = allTestimonies.indexOf(prevCard);
  let prevBtn = getAll("span", indicatorWrapper)[prevBtnIndex];

  setActiveTestimony(prevCard, prevBtn);

  currentCard = prevCard;
}

// event listeners
rightArrow.addEventListener("click", nextTestimony);
leftArrow.addEventListener("click", prevTestimony);

/* --------------------------------------- */
/*                Animatiosn               */
/* --------------------------------------- */
// dom
const animateElements = getAll(`[data-animation="animate"]`);

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.45,
};

const observerFunction = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      // entry.target.classList.remove("animate");
    }
  });
};

const observer = new IntersectionObserver(observerFunction, options);

/* --------------------------------------- */
/*                 Lifecyle                */
/* --------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderTesimonials(testimonials);

  animateElements.forEach((el) => {
    observer.observe(el);
  });
});

/**
 *
 *   let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const observerHandler = (entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
  setActiveTestimony(allTestimonies[2], allIndicatorBtn[2], "center");
        observer.unobserve(testimonyWrapper);
      }
    });
  };

  const observer = new IntersectionObserver(observerHandler, options);
  observer.observe(testimonyWrapper);
 */

// {
//   new Date(post._createdAt).toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }
