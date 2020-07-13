const SERVER_URL ="https://academy.directlinedev.com"; 

(function () {
  let cardsBox = document.querySelector(".blog-posts__result-card_js");
  let tagsBox = document.querySelector(".form-filter__tags-list_js");
  let limit =  2;
  let allValuesPage = getValuesFromUrl();
  const formFilter = document.forms["form-filter"];

  function call(method, path, fn, onerror) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, SERVER_URL + path);
    xhr.send();
    xhr.onload = function () {
      fn(xhr);
    }
    xhr.onerror = function () {
      if(onerror)
      onerror(xhr);
    }
  }

  function createTag(tag) {
    return `
    <li class="form-filter__tag-item">
      <input class="form-filter__checkbox-input opacity" name="tag" type="checkbox" value="${tag.id}" id="input-tag${tag.id}">
      <label style="color: ${tag.color}" class="form-filter__checkbox-label form-filter__checkbox-label_blue" for="input-tag${tag.id}"></label>
    </li>
  `
  }

  function createCard(card) {
    return `<article class="card-block container">
    <picture>
      <source srcset="${SERVER_URL}${card.mobilePhotoUrl}"
        media="(max-width:767px)">
      <source srcset="${SERVER_URL}${card.tabletPhotoUrl}"
        media="(max-width:1023px)">
      <source srcset="${SERVER_URL}${card.desktopPhotoUrl}"
        media="(min-width:1024px)">
    </picture>
    <div class="card-block__text-container">
      <ul class="card-block__tags-list list-hidden-marker">
        <li class="card-block__tag-item"></li>
        <li class="card-block__tag-item"></li>
      </ul>
      <ul class="card-block__info-list list-hidden-marker">
        <li class="card-block__info-item">
          <p class="card-block__info-text">${card.date}</p>
        </li>
        <li class="card-block__info-item">
          <p class="card-block__info-text">${card.views} views</p>
        </li>
        <li class="card-block__info-item">
          <p class="card-block__info-text">${card.commentsCount} comments</p>
        </li>
      </ul>
      <h3 class="card-block__title">${card.title}</h3>
      <p class="card-block__text">${card.text}</p>
      <a class="card-block__link">Go to this post</a>
    </div>
  </article>
  `
  }

  function getCards(allValuesPage) {
    const page = allValuesPage.page ? +allValuesPage.page : 1;
    const offset = (page-1) * limit;
    let tags = JSON.stringify(allValuesPage.tags);
    call("GET", `/api/posts?limit=${limit}&offset${offset}&tags=${tags}`, function (res) {
      let response = JSON.parse(res.response);
      if (response.success) {
        const cards = response.data;
        let cardsHTML = "";
        for(let i = 0; i < cards.length; i++) {
          cardsHTML += createCard(cards[i]);
        }
        cardsBox.innerHTML = cardsHTML;
        createPagination(response.count/limit, page);
      } else {
        alert("все плохо!");
      }
    })
  }

  getCards(allValuesPage);

  call("GET", "/api/tags", function (res) {
    let response = JSON.parse(res.response);
    if (response.success) {
      const tags = response.data;
      for(let i = 0; i < tags.length; i++) {
        let tagHtml = createTag(tags[i]);
        tagsBox.insertAdjacentHTML("beforeend", tagHtml);
      }
    } else {
      alert("все плохо!");
    }
  })  

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
  
  function getValuesFromUrl() {
  
    let params = {};
    if(location.search) {
      let paramsArray = location.search.substring(1).split("&");
  
      for(let i=0; i < paramsArray.length; i++) {
        let split = paramsArray[i].split("=");
        let name = split[0];
        let value = split[1].replace(/%20/g, " ");
        if(params[name]) {
          if(typeof params[name] === "string") {
            params[name] = [params[name], value];
          } else {
            params[name].push(value);
          }
        } else {
          params[name] = value;
        }
      }
    } 
    return params;
  }
  
  function setValuesToUrl(values) {  
    let params = [];
    let names = Object.keys(values);
    for(let i = 0; i < names.length; i++) {
      if((typeof values[names[i]]) === "string") {
        params.push(names[i] +"=" +values[names[i]]);
      } else {
          for(let j = 0; j < values[names[i]].length; j++) {
            params.push(names[i] + "=" + values[names[i]][j]);
          }
      }
    }
    window.history.replaceState({}, document.title, "?" + params.join("&"));
  }
  
  setValuesForm(formFilter, getValuesFromUrl());
  
  formFilter.addEventListener ("submit", function(event) {
    event.preventDefault();
    let value = getValuesForm(event.target);
    setValuesToUrl(value);    
    allValuesPage = value;
    getCards(allValuesPage);
  })

  function createPagination (countPage, activePage) {
    let links = document.querySelector(".blog-posts__pagination");
    links.innerHTML = "";
    for (let i = 0; i < countPage; i++) {
      let link = document.createElement("a");
      link.setAttribute("href", "?page="+(i+1));
      if(activePage === i+1) {
        link.setAttribute("disabled", "disabled");
      }
      link.innerHTML = " " + (i+1);
      links[i].addEventListener("click", function(event) {
        event.preventDefault();
        let value = getValuesForm(formFilter);
        value.page = i + 1 + "";
        setValuesToUrl(value);
        allValuesPage = value;
        getCards(allValuesPage);
      })
      links.insertAdjacentElement("beforeend", link);
    }
  }  

})();