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

(function() {
  let formFilter = document.forms["form-filter"];

  console.log(formFilter);
})();