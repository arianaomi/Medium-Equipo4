/*      -   -   -    Funcionalidad de Medium Blog - - -
  - - -MANTENER EL CÓDIGO COMENTADO Y ORGANIZADO
  - - -CHECAR EN QUE RAMA SE ESTA MODIFICANDO
 */

/* Var global scope */
var postObject = {};
var postObjectArr = [];
var postWithKeyObject = {};
var postWithKeyObjectArr = [];

/* Dynamic HTML */
const loadContent = (contentUrl, event) => {
  event.preventDefault();
  $("#content-wrapper").load(contentUrl);
};
/* Guardar la información del post creado*/
const saveNewPost = () => {
  let date = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  let date2 = months[date.getMonth()] + " " + date.getDate();
  let milisegundos = date.getTime();
  //console.log(milisegundos);
  let popularFlag = $(".form-check-input").is(":checked") ? true : false;
  //console.log(popularFlag);

  $(".form-control").each(function (index) {
    let value = $(this).val();
    let propertyKey = $(this).data("property-key");
    postObject[propertyKey] = value;
    postObject["date"] = date2;
    postObject["popularFlag"] = popularFlag;
    postObject["compararFechas"] = milisegundos;
  });
  //console.log(postObject);
  uploadPost(postObject);
};

/* Sube al endpoint el post creado y nos regresa la llave con lo que lo guardo */
const uploadPost = (postObject) => {
  $.post(
    "https://ajaxclass-1ca34.firebaseio.com/mediumBlog/Equipo4/post/.json",
    JSON.stringify(postObject),
    function (data) {
      $("#successModal").modal("show");
      ////console.log(data);
    }
  );
};

/* Crear la card con los datos de db */
const printGeneralCard = (container, postObject, key) => {
  let { title, subtitle, autor, image, date, postKey } = postObject;
  let postWrapper = $(container);
  postWrapper.innerHTML = "";
  $(container).append(`
  <article class="my-4 generalCards">
    <div class="row d-flex no-gutters">
      <div class="col-8">
        <div class="pl-1 md-1">
          <p class="text-muted my-0">
            <small class="card-text">BUSINESS Popular topic</small>
          </p>
          <a  class="showModal"><h5 id="${key}"class="card-title mr-1 mr-md-0">${title}</h5></a>
          <p class="text-muted my-0 d-none d-md-inline">
            <small class="card-text">${subtitle}</small>
          </p>
          <div class="d-flex justify-content-between pr-2">
            <div>
              <small class="text-muted">
                <a href="#" class="text-dark">${autor} </a>
              </small>

              <small class="text-muted"
                ><p class="card-text">
                  ${date} &middot; 8 min read <small> ★</small></p
              ></small>
            </div>
            <div class="font-weight-lighter text-muted mr-3">
            <svg class="bi bi-bookmark mr-2" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z"/>
          </svg>
          <svg
            class="bi bi-three-dots"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            />
          </svg>
        </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <img
          src="${image}"
          class="img-fluid w-100  imgeneral"
          alt="Responsive image"
        />
      </div>
    </div>
  </article>`);
};

const printRecents1 = (container, postObject, key) => {
  let { title, subtitle, autor, image, date, postKey } = postObject;
  let postWrapper = $(container);
  postWrapper.innerHTML = "";
  $(container).append(`<article class="mb-4">
  <div class="card text-left border-white">
    <img
      height="150"
      src=${image}
      class="card-img-top img-sec1"
    />
    <div class="card-body text-left p-card1">
    <a  class="showModal"><h5 id="${postKey}"class="card-title">${title}</h5></a>
      <p class="text-muted parafos-card">
        ${subtitle}
      </p>
      <div class="d-flex justify-content-between">
        <div>
          <small class="text-muted">
            <a href="#" class="text-dark"> ${autor} </a>
            <span class="text-dark">in</span>
            <a href="#" class="text-dark">Mind cafe </a>
          </small>

          <small class="text-muted"
            ><p class="card-text">
              ${date} &middot; 6 min read <small> ★</small>
              </p> 
            </small>
        </div>
        <div class="font-weight-lighter text-muted">
        
          <svg
            class="bi bi-three-dots"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</article>`);
};

const printRecents2 = (container, postObject, key) => {
  let { title, subtitle, autor, image, date, postKey } = postObject;
  let postWrapper = $(container);
  postWrapper.innerHTML = "";
  $(container).append(`<article class=" general3cards mb-4">
  <div class="row d-flex flex-row-reverse flex-md-row no-gutters">
    <div class="col-4">
      <img src=${image} class=" ml-1 ml-md-0 ml-md-0 img3cards  "/>
    </div>
    <div class="col-8 col-">
      <div class="pl-md-2">
         <a  class="showModal"><h6 id="${postKey}"class="card-title">${title}</h6></a>
        <div class="d-flex justify-content-between">
          <div>
            <small class="text-muted">
              <a href="#" class="text-dark">${autor} </a>
              <span class="text-dark">in</span>
              <a href="#" class="text-dark">Heated </a>
            </small>

            <small class="text-muted"
              ><p class="card-text">
                ${date}  &#183; 6 min read <small> ★</small>
              </p
            ></small>
          </div>
          <div class="font-weight-lighter text-muted">
          <svg
            class="bi bi-three-dots"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            />
          </svg>
        </div>
        </div>
      </div>
    </div>
  </div>
</article>`);
};

const printRecents3 = (container, postObject, key) => {
  let { title, subtitle, autor, image, date, postKey } = postObject;
  let postWrapper = $(container);
  postWrapper.innerHTML = "";
  $(container).append(`<article class="mb-4 d-none d-lg-block">
  <div class="card text-left border-white">
    <img
      height="150"
      src=${image}
      class="card-img-top"
    />
    <div class="mt-2 mr-5 text-left p-card3">
    <a  class="showModal"><h6 id="${postKey}"class="card-title">${title}</h6></a>
      <p class="text-muted parafos-card">
      ${subtitle}
      </p>
      <p></p>
      <div class="d-flex justify-content-between">
        <div>
          <small class="text-muted">
            <a href="#" class="text-dark"> ${autor} </a>
            <span class="text-dark">in</span>
            <a href="#" class="text-dark">Payne </a>
          </small>
          <small class="text-muted"
            ><p class="card-text">
            ${date} &middot; 5 min read <small> ★</small>
              </p
          ></small>
        </div>
        <div class="font-weight-lighter text-muted">
          <svg
            class="bi bi-three-dots"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</article>`);
};

//Imprime la lista de los populares
const printPostPoPular = (count, postObject, key) => {
  let { title, autor, date } = postObject;
  let postWrapper = $(".popular");
  postWrapper.innerHTML = "";
  $(".popular").append(`
  <li class="d-flex mb-2">
                <div class="num-popular mt-1">
              0${count}
                </div>
                <div class="m-3">
                <a  class="showModal"><h6 id="${key}"class="card-title">${title}</h6></a>
                  <div>
                    <small>
                      ${autor}
                    </small>
                    <small class="text-muted">
                      <p class="card-text">
                        ${date}  - 6 min read <small> ★</small>
                      </p>
                    </small>
                  </div>
                </div>
              </li>`);
};
//Creando array con los más recientes
const getmostRecent = () => {
  let mostRecent;
  mostRecent = postWithKeyObjectArr
    .sort(function (currentItem, nextItem) {
      return nextItem.compararFechas + currentItem.comprararFechas;
    })
    .reverse()
    .slice(0, 5);
  //console.log(mostRecent);
  return mostRecent;
};

//Creando array con los post populares
const getmostPopular = () => {
  let mostPopular;
  let count = 1;
  mostPopular = postWithKeyObjectArr.filter((post) => {
    return post.popularFlag == true;
  });
  //console.log(postWithKeyObjectArr);
  mostPopular = mostPopular.reverse().slice(0, 4);
  //console.log(mostPopular);
  return mostPopular;
};

const general1 = () => {
  let general1;
  //postWithKeyObjectArr4 = postWithKeyObjectArr
  general1 = postWithKeyObjectArr.slice(2, 6);
  //console.log(general1);
  return general1;
};

//Funcion que imprimira todo
const printDOM = () => {
  let key;
  let count = 1;
  let generalPosts1 = [];
  //let section1Arr = postWithKeyObjectArr.splice(0, 4);
  ////console.log(postWithKeyObjectArr);
  let popular = [];
  popular = getmostPopular();
  let recent = [];
  recent = getmostRecent();
  generalPosts1 = general1();
  //console.log(recent);
  //console.log(popular);
  let section1Recents = recent.slice(0, 1);
  let section2Recents = recent.slice(1, 4);
  let section3Recents = recent.slice(4, 5);

  popular.forEach((post) => {
    key = post.postKey;
    printPostPoPular(count, post, key);
    count++;
  });

  generalPosts1.forEach((post) => {
    key = post.postKey;
    printGeneralCard(".general-1", post, key);
  });
  postWithKeyObjectArr.forEach((post) => {
    key = post.postKey;
    printGeneralCard(".general-2", post, key);
  });
  section1Recents.forEach((post) => {
    key = post.postKey;
    printRecents1(".style1", post, key);
  });
  ////console.log(section2Recents);

  section2Recents.forEach((post) => {
    key = post.postKey;
    printRecents2(".style2", post, key);
  });
  //console.log(section2Recents);

  section3Recents.forEach((post) => {
    key = post.postKey;
    printRecents3(".style3", post, key);
  });
  //console.log(section3Recents);
};
/* Request para obtener los post, imprimirlos y crear arreglo */
const getPostDb = () => {
  $.get(
    "https://ajaxclass-1ca34.firebaseio.com/mediumBlog/Equipo4/post/.json",
    function (response) {
      $.each(response, (key, value) => {
        //printPostSection1Card(value, key);
        // postObject = response;
        postObjectArr[key] = value;
        postWithKeyObject = { ...value, postKey: key };
        postWithKeyObjectArr.push(postWithKeyObject);
      });
      printDOM();
      console.log(postWithKeyObjectArr);
      addShowModalListeners();
    }
  );
};
/* Imprimir modal */
const printModal = (selectedPost) => {
  let { title, subtitle, autor, content, image } = selectedPost;

  $("#articleModal").find(".modal-content");
  $("#articleModal").find(".modal-title").text(title);
  $("#articleModal").find(".modal-subtitle").text(subtitle);
  $("#articleModal").find(".modal-autor").text(autor);
  $("#articleModal").find(".modal-img").attr("src", image);
  $("#articleModal").find(".contenido").text(content);
  $("#articleModal").modal("show");
};

/* conseguir key de post para llamar la modal */
const conseguirModal = () => {
  event.preventDefault();
  let keyPost = $(event.target).attr("id");
  console.log("key: " + keyPost);
  let selectedPost = postObjectArr[keyPost];
  //console.log(postObjectArr);
  printModal(selectedPost);
};

/* Eventos  */

const addShowModalListeners = () => {
  let aListener = document.querySelectorAll(".showModal");
  aListener.forEach((a) => {
    a.addEventListener("click", conseguirModal);
  });
};

/* SCROLL infinito */
var viewportHeight = window.innerHeight;
window.addEventListener("scroll", (event) => {
  let scollPosition = window.scrollY;
  // console.log(window.scrollY);
  scollPosition > viewportHeight
    ? postWithKeyObjectArr.forEach((post) => {
        key = post.postKey;
        printGeneralCard(".general-2", post, key);
      })
    : null;
});
getPostDb();
let viewportWidth = $(window).innerWidth();

const navbarScroll = (direction) => {
  if (direction === "left" && viewportWidth < 1000) {
    $("#nav-inside").animate({ scrollLeft: "-=50px" }, "fast");
  } else if (direction === "right" && viewportWidth < 1000) {
    $("#nav-inside").animate({ scrollLeft: "+=50px" }, "fast");
  } else if (direction === "left" && viewportWidth > 1000) {
    $("#nav-inside").animate({ scrollLeft: "0px" }, "fast");
  } else if (direction === "right" && viewportWidth > 1000) {
    $("#nav-inside").animate({ scrollLeft: "950px" }, "fast");
  }
};
