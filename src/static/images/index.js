let formMessage = document.forms["message"];
let formLogin = document.forms["login"];
let formSignUp = document.forms["sign-up"];

let SERVER_URL = "https://academy.directlinedev.com";

function sendReg({url, method="GET", body={}, headers={}}) {
  const settings = {
    method,
    body,
    eaders,
  };

  return fetch(SERVER_URL + url, settings);
}

function register(e) {
  e.preventDefault();
  let values = getValuesForm(e.target);
  console.log(values);
  sendReg({
    url: "/api/users",
    method: "POST", 
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "aplication/json;charset=utf-8",
    },
  })
  .then(function (res) {
    return res.json();
  });
  // .then(function (json) {
  //   if(json.success) {
  //     let user = json.data;
  //     alert(`asda ${user.name} ${user.surname}`)
  //   } else {
  //     throw {_message: JSON.stringify(json, null, 2)}
  // //   }
  // })
}



function getValuesForm(form) {
  //отдаем значения input
  let body = {};
  const inputs = form.querySelectorAll("input");
  const textares = form.querySelectorAll("textarea");
  const length = inputs.length;
  for(let i = 0; i < length; i++) {
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

  for (let textarea of textares) {
    body[textarea.name] = textarea.value;
  }
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

function setInvalidTextarea (textarea) {
  textarea.classList.add("form-message__textarea-input_notvalid");
  textarea.addEventListener("textarea", function hendlerInput(event) {
    textarea.classList.remove("form-message__textarea-input_notvalid");
    textarea.removeEventListener("textarea", hendlerInput);
  })
}

function setFormErrors (form, errors) {
  const inputs = form.querySelectorAll("input");
  const textares = form.querySelectorAll("textarea");
  const length = inputs.length;
  for(let i = 0; i < length; i++) {
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
  for (let textarea of textares) {
    if (errors[textarea.name]) {
    setInvalidTextarea (textarea);
    errorMessageInputCreate(textarea, errors[textarea.name])
    };
  }
} 

(function validationSignUp () { 
  formSignUp.addEventListener("submit", function(event) {
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
  if(!userNameCheck(values.surname)) {
    errors.surname = "This field is required";
  }
  if(!passwordCheck(values.password)) {
    errors.password = "This field is required";
  }
  if(!passwordCheck(values.repassword) && (values.repassword === values.password)) {
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

(function validationLogin () { 
  formLogin.addEventListener("submit", function(event) {
  event.preventDefault();
  const form = event.target;
  const values = getValuesForm(form);
  console.log(values);
  let errors = {}; 
  if(!mailCheck(values.email)) {
    errors.email = "Please enter a valid email address";
  }
  if(!passwordCheck(values.password)) {
    errors.password = "This field is required";
  }
  setFormErrors(form, errors);
  });     
}) ();

(function validationMessage () { 
  formMessage.addEventListener("submit", function(event) {
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
  if(values.subject.length < 3 || values.subject.length >= 20) {
    errors.subject = "This field is required";
  }
  if(!phoneCheck(values.phone)) {
    errors.phone = "This field is required";
  }
  if(values.message.length < 3 || values.message.length >= 20) {
    errors.message = "This field is required";
  }
  if(!values.accept) {
    error.accept = "This field is required";
    }  
  setFormErrors(form, errors);
  });     
}) ();


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

(function openPopupSignUp () {
  let buttonOpenSignUp = document.querySelector(".button-sign_js");
  let buttonCloseSignUp = formSignUp.querySelector(".form-sign__button-close_js");
  let inputSignUpFocus = formSignUp.querySelector("input[name=email]");
  let popupSignUp = document.querySelector(".sign-popup");
  
  
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