let formChangeData = document.forms["change-data"];
let formChangePassword = document.forms["change-password"];

function getValuesForm(form) {
  //отдаем значения input
  let body = {};
  const inputs = form.querySelectorAll("input");
  const textares = form.querySelectorAll("textarea");
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

  // let l = textares.length;
  // for (let i = 0; i < l; i++) {
  //   const input = inputs[i];
  //   body[input.name] = input.value;
  // }
  return body;
}

function mailCheck (email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function phoneCheck (phone) {
  return /^\+\d{1,2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phone);
}

function passwordCheck (password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/.test(password);
}

function userNameCheck (name) {
  return /^[a-z0-9A-Z_-]{3,20}$/.test(name);
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

(function validationChangePassword () { 
  formChangePassword.addEventListener("submit", function(event) {
  event.preventDefault();
  const form = event.target;
  const values = getValuesForm(form);
  console.log(values);
  let errors = {}; 
  if(!passwordCheck(values.oldPassword)) {
    errors.oldPassword = "This field is required";
  }
  if(!passwordCheck(values.newPassword)) {
    errors.newPassword = "This field is required";
  }
  if(!passwordCheck(values.repeatPassword) && (values.newPassword === values.repeatPassword)) {
    errors.repeatPassword = "This field is required";
  }
  setFormErrors(form, errors);
  });     
}) ();

(function validationChangeData () { 
  formChangeData.addEventListener("submit", function(event) {
  event.preventDefault();
  const form = event.target;
  const values = getValuesForm(form);
  console.log(values);
  let errors = {}; 
  if(!mailCheck(values.email)) {
    errors.email = "Please enter a valid email address";
  }
  if(!userNameCheck(values.name)) {
    errors.name = "This field is required";
  }
  if(!userNameCheck(values.name)) {
    errors.surname = "This field is required";
  }
  if(values.location.length < 3 || values.location.length >= 20) {
    errors.location = "This field is required";
  }
  if(values.age < 5 || values.age >= 100) {
    errors.age = "This field is required";
  }
  if(!values.picture || !values.picture.length) {
    errors.picture = "This field is required";
  }
  setFormErrors(form, errors);
  });     
}) ();

(function openPopupChangePassword () {
  let buttonOpenChangePassword = document.querySelector(".button-change-password_js");
  let buttonCloseChangePassword = formChangePassword.querySelector(".form-change-password__button-close_js");
  let inputChangePasswordFocus = formChangePassword.querySelector("input[name=oldPassword]");
  let popupChangePassword = document.querySelector(".change-password-popup");
  
  
  buttonOpenChangePassword.addEventListener("click", function () {
    popupChangePassword.classList.remove("change-password-popup_none");
    inputChangePasswordFocus.focus();    
  });
  
  buttonCloseChangePassword.addEventListener("click", function() {
    popupChangePassword.classList.add("change-password-popup_none");
    buttonOpenChangePassword.focus();
  });
  
  window.addEventListener("keydown", function (event) {
    if (event.code == "Escape" && !popupChangePassword.classList.contains("change-password-popup_none")) {
      popupChangePassword.classList.add("change-password-popup_none");
      buttonOpenChangePassword.focus();        
    }
  });
})();

(function openPopupChangeData () {
  
  let buttonOpenChangeData = document.querySelector(".button-change-data_js");
  let buttonCloseChangeData = formChangeData.querySelector(".form-change-data__button-close_js");
  let inputChangeDataFocus = formChangeData.querySelector("input[name=email]");
  let popupChangeData = document.querySelector(".change-data-popup");
  
  
  buttonOpenChangeData.addEventListener("click", function () {
    popupChangeData.classList.remove("change-data-popup_none");
    inputChangeDataFocus.focus();    
  });
  
  buttonCloseChangeData.addEventListener("click", function() {
    popupChangeData.classList.add("change-data-popup_none");
    buttonOpenChangeData.focus();
  });
  
  window.addEventListener("keydown", function (event) {
    if (event.code == "Escape" && !popupChangeData.classList.contains("change-data-popup_none")) {
      popupChangeData.classList.add("change-data-popup_none");
      buttonOpenChangeData.focus();        
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