// (function() {

//   const SERVER_URL ="https://academy.directlinedev.com/"

//   function call(method, path, fn) {
//     let xhr = new XMLHttpRequest();
//     xhr.open(method, SERVER_URL + path);
//     xhr.send();
//     xhr.onload = function () {
//       fn(xhr);
//     }
//   }

//   let optionList = document.querySelector(".form-filter__options-list_js");
//   call("GET", "/api/tags", function (res) {
//     console.log(res.response)
//   })
// }
// )

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

  for (let textarea of textares) {
    body[textarea.name] = textarea.value;
  }
  return body;
}

function setValuesForm(form, values) {
  //отдаем значения input
  const inputs = form.querySelectorAll("input");
  const textares = form.querySelectorAll("textarea");
  for(let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    //проверка типа input
    switch (input.type) {
      case "radio":
        if(values[input.name] && values[input.name] === input.value) {
          input.checked = true;
        }
        break;
      case "checkbox":
        if(values[input.name]) {
          if(typeof values[input.name] === "object") {
            for(let j=0; j < values[input.name].length; j++) {
              if(values[input.name][j] === input.value) {
                input.checked = true;
              }
            }
          }
          else {
            if(values[input.name] === input.value) {
              input.checked = true;
            }
          }
        }
        break;
      default:
        input.value = values[input.name];
        break;
    }
  }  
  for (let textarea of textares) {
    textarea.value = values[textarea.name];
  }
}



const formFilter = document.forms["form-filter"];

setValuesForm(formFilter, {
  name:"",
  tag: ["blue", "pink"],
  views: ["500"],
  comments: ["0"],
  show: ["5"],
  sort: ["date"]
})

formFilter.addEventListener ("submit", function(event) {
  event.preventDefault();
  console.log(getValuesForm(event.target));
})