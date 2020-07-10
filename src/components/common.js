alert("sada");
let formMessage = document.forms["message"];

(function openPopupMessage () {
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




let formLogin = document.forms["login"];

(function openPopupLogin () {
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