(function slider () {
  const wrapper = document.querySelector(".slider__wrapper_js");
  const innerWrapper = document.querySelector(".slider__inner-wrapper_js");
  const pagination = document.querySelector(".slider__pagination_js");
  const buttonBack = document.querySelector(".slider__button_back_js");
  const buttonNext = document.querySelector(".slider__button_next_js");
  const slides = document.querySelectorAll(".slider__slide_js");

  let shearWidth = +getComputedStyle(wrapper).width.split("px")[0];
  let numberSlides = innerWrapper.childElementCount - 1;
  //let numberSlides = innerWrapper.quereSelectorAll(".slider__slide_js").length -1;

  let activeSlide = 0;
  let dots = [];

  function initWidthSlides() {
    shearWidth = +getComputedStyle(wrapper).width.split("px")[0];
    for (let i=0; i < slides.length; i++) {
      slides[i].style.width = shearWidth + "px";
    }
  }

  initWidthSlides();

  function init() {
    for (let i=0; i < slides.length; i++) {
      let dot = document.createElement("button");
      dot.classList.add("slider__dot");
      if(i === activeSlide){
        dot.classList.add("slider__dot_active");
        // dot.setAttribute("disabled" , "disabled");
      }
      // else dot.removeAttribute("disabled");
      dot.addEventListener("click", function() {
        setActiveSlide(i);
      })
      dots[dots.length] = dot;
      //dots.push(dot);
      pagination.insertAdjacentElement("beforeend", dot);
    }
  }

  init();

  function setActiveSlide (index) {
    if(index < 0 || index > numberSlides) {
      return;
    }
    innerWrapper.style.transition = "margin-left .5s";
    dots[activeSlide].classList.remove("slider__dot_active")
    dots[index].classList.add("slider__dot_active");
    if (index === 0) {
      buttonBack.setAttribute("disabled", "disabled");
    }
    if(index === numberSlides) {
      buttonNext.setAttribute("disabled", "disabled");
    }
    if(activeSlide - index > 0) {
      buttonNext.removeAttribute("disabled");
    }
    if(activeSlide - index < 0) {
      buttonBack.removeAttribute("disabled");
    }
    innerWrapper.style.marginLeft = "-" + shearWidth*index + "px";
    activeSlide = index;
  }

  buttonBack.addEventListener("click", function (){
    const index = activeSlide - 1;
    setActiveSlide(index)
  })

  buttonNext.addEventListener("click", function (){
    const index = activeSlide + 1;
    setActiveSlide(index)
  })

  window.addEventListener("resize", function () {
    initWidthSlides();
    setActiveSlide(activeSlide);
  });
})();

let mySwiper = new Swiper ('.swiper-container', {
  direction: 'horizontal',

  pagination: {
    el: '.swiper-pagination',
  },
  
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});


  






