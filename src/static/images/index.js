(function openPopupMessage () {
  let formMessage = document.forms["message"];
  let buttonOpenMessage = document.querySelector(".button-message_js");
  let buttonCloseMessage = formMessage.querySelector(".form-message__button-close_js");
  let inputMessageFocus = formMessage.querySelector("input[name=name]");
  let popupMessage = document.querySelector(".message-popup")
  
  
  buttonOpenMessage.addEventListener("click", function () {
    popupMessage.classList.remove("message-popup_none");
    inputMessageFocus.focus();
  });
  
  buttonCloseMessage.addEventListener("click", function() {
    popupMessage.classList.add("message-popup_none");
    buttonOpenMessage.focus();
  });
  
  window.addEventListener("keydown", function (event) {
    if (event.code == "Escape" && !popupMessage.classList.contains("message-popup_none")) {
      popupMessage.classList.add("message-popup_none");
      buttonOpenMessage.focus();        
    }
  });
})();

(function openPopupLogin () {
  let formLogin = document.forms["login"];
  let buttonOpenLogin = document.querySelector(".button-login_js");
  let buttonCloseLogin = formLogin.querySelector(".form-login__button-close_js");
  let inputLoginFocus = formLogin.querySelector("input[name=email]");
  let popupLogin = document.querySelector(".login-popup")
  
  
  buttonOpenLogin.addEventListener("click", function () {
    popupLogin.classList.remove("login-popup_none");
    inputLoginFocus.focus();
  });
  
  buttonCloseLogin.addEventListener("click", function() {
    popupLogin.classList.add("login-popup_none");
    buttonOpenLogin.focus();
  });
  
  window.addEventListener("keydown", function (event) {
    if (event.code == "Escape" && !popupLogin.classList.contains("login-popup_none")) {
      popupLogin.classList.add("login-popup_none");
      buttonOpenLogin.focus();        
    }
  });
})();

(function openPopupSignUp () {
  let formSignUp = document.forms["sign-up"];
  let buttonOpenSignUp = document.querySelector(".button-sign_js");
  let buttonCloseSignUp = formSignUp.querySelector(".form-sign__button-close_js");
  let inputSignUpFocus = formSignUp.querySelector("input[name=email]");
  let popupSignUp = document.querySelector(".sign-popup_js");
  
  
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