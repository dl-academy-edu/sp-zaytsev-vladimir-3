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
      }
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

(function scrollTop () {
  let buttonTop = document.querySelector(".button-arrow_js");  

  window.addEventListener("scroll", function(event) {
    if (window.pageYOffset > 1500) {
      buttonTop.classList.remove("hidden");
      buttonTop.addEventListener("click", function handler(event) {
        buttonTop.classList.add("hidden");
        window.scrollTo({top: 0, behavior: "auto"});
      })
    }
    if (window.pageYOffset < 1500) {
      buttonTop.classList.add("hidden");
    }
  });
})();


function getValuesForm(form) {
  //отдаем значения input
  let body = {};
  const inputs = form.querySelectorAll("input");
  const textarea = form.querySelectorAll("textarea");
  let l = inputs.length;
  for(let i = 0; i < l; i++) {
    const input = inputs[i];
    //проверка типа input
    switch (input.type) {
      case "radio":
        if (input.checked) {
          body[input.name] = input.value;
        }
        break;
      case "checkbox":
        if(!body[input.name]){
          body[input.name] = [];
        }
        if(input.checked){
          const inputL = body[input.name].length;
          body[input.name][inputL] = input.value;          
        }
        break;
      case "file":
        body[input.name] = input.files;
        break;
      default:
        body[input.name] = input.value;
        break;
    }
  }

  // let l = textarea.length;
  // for (let i = 0; i < l; i++) {
  //   const input = inputs[i];
  //   body[input.name] = input.value;
  // }
  return body;
}

function mailCheck (email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function errorMessageInputCreate(input, text) {
  let message = document.createElement("div");
  message.classList.add("invalid-feedback");
  message.innerText = text;

  input.insertAdjacentElement("afterend", message);
  input.addEventListener("input", function hendlerInput(event) {
    message.remove();
    input.removeEventListener("input", hendlerInput);
  })
}

function setInvalidInput (input) {
  input.classList.add("form-input_notvalid");
  input.addEventListener("input", function hendlerInput(event) {
    input.classList.remove("form-input_notvalid");
    input.removeEventListener("input", hendlerInput);
  })
}

function setFormErrors (form, errors) {
  const inputs = form.querySelectorAll("input");
  const textares = form.querySelectorAll("textarea");
  let l = inputs.length;
  for(let i = 0; i < l; i++) {
    const input = inputs[i];
    switch (input.type) {
      case "radio":
        if(errors[input.name]) {
          setInvalidInput(input);
        }
          break;
      case "checkbox":
        if(errors[input.name]) {
          setInvalidInput(input);
        }
          break;
      case "file":
        if(errors[input.name]) {
          setInvalidInput(input);
        }
          break;
      default:
        if(errors[input.name]) {
          setInvalidInput(input);
          errorMessageInputCreate(input, errors[input.name]);
        }
          break;
    }
  }
}

let formSignUp = document.forms["sign-up"];


(function () {  
  formSignUp.addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const values = getValuesForm(form);
    console.log(values);
    let errors = {}; 
    if(!mailCheck(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    if(values.name.length < 3 || values.name.length >= 20) {
      errors.name = "This field is required";
    }
    if(values.surname.length < 3 || values.surname.length >= 20) {
      errors.surname = "This field is required";
    }
    if(values.password.length < 3 || values.password.length >= 20) {
      errors.password = "This field is required";
    }
    if(values.repassword.length < 3 || values.repassword.length >= 20) {
      errors.repassword = "This field is required";
    }
    if(values.location.length < 3 || values.location.length >= 20) {
      errors.location = "This field is required";
    }
    if(values.age < 5 || values.age >= 100) {
      errors.age = "This field is required";
      }
    if(!values.accept) {
      error.accept = "This field is required";
      }  
    setFormErrors(form, errors);
    });     
}) ();

(function openPopupSignUp () {
  let buttonOpenSignUp = document.querySelector(".button-sign_js");
  let buttonCloseSignUp = formSignUp.querySelector(".form-sign__button-close_js");
  let inputSignUpFocus = formSignUp.querySelector("input[name=email]");
  let popupSignUp = document.querySelector(".sign-popup_js");
  console.log(buttonCloseSignUp);
  
  
  buttonOpenSignUp.addEventListener("click", function () {
    popupSignUp.classList.remove("sign-popup_none");
    inputSignUpFocus.focus();    
  });
  
  buttonCloseSignUp.addEventListener("click", function() {
    popupSignUp.classList.add("sign-popup_none");
    buttonOpenSignUp.focus();
  });
  
  window.addEventListener("keydown", function (event) {
    if (event.code == "Escape" && !popupSignUp.classList.contains("sign-popup_none")) {
      popupSignUp.classList.add("sign-popup_none");
      buttonOpenSignUp.focus();        
    }
  });
})();

// let formMessage = document.forms["message"];

// (function openPopupMessage () {
//   let buttonOpenMessage = document.querySelector(".button-message_js");
//   let buttonCloseMessage = formMessage.querySelector(".form-message__button-close_js");
//   let inputMessageFocus = formMessage.querySelector("input[name=name]");
//   let popupMessage = document.querySelector(".message-popup")
  
  
//   buttonOpenMessage.addEventListener("click", function () {
//     popupMessage.classList.remove("message-popup_none");
//     inputMessageFocus.focus();
//   });
  
//   buttonCloseMessage.addEventListener("click", function() {
//     popupMessage.classList.add("message-popup_none");
//     buttonOpenMessage.focus();
//   });
  
//   window.addEventListener("keydown", function (event) {
//     if (event.code == "Escape" && !popupMessage.classList.contains("message-popup_none")) {
//       popupMessage.classList.add("message-popup_none");
//       buttonOpenMessage.focus();        
//     }
//   });
// })();




// let formLogin = document.forms["login"];

// (function openPopupLogin () {
//   let buttonOpenLogin = document.querySelector(".button-login_js");
//   let buttonCloseLogin = formLogin.querySelector(".form-login__button-close_js");
//   let inputLoginFocus = formLogin.querySelector("input[name=email]");
//   let popupLogin = document.querySelector(".login-popup")
  
  
//   buttonOpenLogin.addEventListener("click", function () {
//     popupLogin.classList.remove("login-popup_none");
//     inputLoginFocus.focus();
//   });
  
//   buttonCloseLogin.addEventListener("click", function() {
//     popupLogin.classList.add("login-popup_none");
//     buttonOpenLogin.focus();
//   });
  
//   window.addEventListener("keydown", function (event) {
//     if (event.code == "Escape" && !popupLogin.classList.contains("login-popup_none")) {
//       popupLogin.classList.add("login-popup_none");
//       buttonOpenLogin.focus();        
//     }
//   });
// })();