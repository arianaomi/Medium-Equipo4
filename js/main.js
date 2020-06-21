/*      -   -   -    Funcionalidad de Medium Blog - - -
  - - -MANTENER EL CÓDIGO COMENTADO Y ORGANIZADO
  - - -CHECAR EN QUE RAMA SE ESTA MODIFICANDO
 */

/* Var global scope */
var postObject = {};
var postObjectArr = [];
var postResp = {};
var postObjectArr2 = [];
var postsArray = [];

/* Guardar la información del post creado*/

/*const getNewPost = () => {
      // instantiate a moment object
  var NowMoment = moment();
  let date = NowMoment.format('MMM-D');
  console.log(date);*/

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
      getPostDb();
      console.log(data);
    }
  );
};

/* Crear la card con los datos de db */
const printPostCard = (postObject) => {
  let { title, subtitle, autor, image, date, postKey } = postObject;
  let postWrapper = $("#cards-wrapper");
  postWrapper.innerHTML = "";
  $("#cards-wrapper")
    .append(`<div   class="col-6 oneCardWrapper" height="300px" >
  <div class="card mb-3">
    <div class="row d-flex no-gutters">
      <div class="col-md-4 p-0">
        <img src="${image}" height="300px" class="card-img" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
        <a  class="showModal"><h5 id="${postKey}"class="card-title">${title}</h5></a>
        
        <h6>${autor}</h6>
          <p class="card-text text-wrap" height="70%">
          ${subtitle}
          </p>
          <p class="card-text">
            <small class="text-muted">${date}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>`);
};

var mostRecent;
/* Reques para obtener los post, imprimirlos y crear arreglo */
//Aqui en el get se saca los más recientes
const getPostDb = () => {
  $.get(
    "https://ajaxclass-1ca34.firebaseio.com/mediumBlog/Equipo4/post/.json",
    function (response) {
      $.each(response, (key, value) => {
        printPostCard(value, key);
        postObject = { ...response[key], postKey: key };
        postObjectArr.push(postObject);
      });
      console.log(postObject);
      console.log(postObjectArr);
      mostRecent = postObjectArr
        .sort(function (currentItem, nextItem) {
          return nextItem.compararFechas - currentItem.comprararFechas;
        })
        .splice(0, 5);
      addShowModalListeners();
      console.log(mostRecent);
      //printGeneral1(postObjectArr);
      //printGeneral2(postObjectArr);
    }
  );
};

//imprime post en la sección general 1. Se manda a llamar en la función getPostDb para obtener el array que regresa de la base de datos
const printGeneral1 = (array) => {
  for (key in array) {
    $(".general-1").append(`<article class="mb-4">
  <div class="row d-flex">
    <div class="col-8">
      <div class="pl-1 md-1">
        <p class="text-muted my-0">
          <small class="card-text">BUSINESS Popular topic</small>
        </p>
        <h5 id="${array[key].postKey}" class="card-text my-0">
        ${array[key].title}
        </h5>
        <p class="text-muted my-0 d-none d-md-inline">
          <small class="card-text">${array[key].contenido}</small>
        </p>
        <div class="d-flex justify-content-between pr-2">
          <div>
            <small class="text-muted">
              <a href="#" class="text-dark">${array[key].autor}</a>
            </small>

            <small class="text-muted"
              ><p class="card-text">
              ${array[key].date} &#183; 3 min read
                <i class="p-2 fas fa-star"></i></p
            ></small>
          </div>
          <div class="font-weight-lighter text-muted">
            <i class="far fa-bookmark"></i>
            <a href="#" class="card-link text-dark text-muted"
              ><i class="fas fa-ellipsis-h ml-3"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4">
      <img
         src=${array[key].image}
        class="img-fluid"
        alt="Responsive image"
      />
    </div>
  </div>
</article>`);
  }
};

//imprime post en la sección general 2. Se manda a llamar en la función getPostDb para obtener el array que regresa de la base de datos
const printGeneral2 = (array) => {
  for (key in array) {
    $(".general-2").append(`<article class="mb-4">
      <div class="row d-flex">
        <div class="col-8">
          <div class="pl-1 md-1">
            <p class="text-muted my-0">
              <small class="card-text">BUSINESS Popular topic</small>
            </p>
            <h5 class="card-text my-0">
            ${array[key].title}
            </h5>
            <p class="text-muted my-0 d-none d-md-inline">
              <small class="card-text">${array[key].contenido}</small>
            </p>
            <div class="d-flex justify-content-between pr-2">
              <div>
                <small class="text-muted">
                  <a href="#" class="text-dark">${array[key].autor}</a>
                </small>
    
                <small class="text-muted"
                  ><p class="card-text">
                  ${array[key].date} &#183; 3 min read
                    <i class="p-2 fas fa-star"></i></p
                ></small>
              </div>
              <div class="font-weight-lighter text-muted">
                <i class="far fa-bookmark"></i>
                <a href="#" class="card-link text-dark text-muted"
                  ><i class="fas fa-ellipsis-h ml-3"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <img
             src=${array[key].image}
            class="img-fluid"
            alt="Responsive image"
          />
        </div>
      </div>
    </article>`);
  }
  key;
};

// imprimir primera sección de recientes con el post en [0]
/*
 
     const recentPost = (array1) => {
      let { title, autor, contenido, image, date } = array1[0];
         //destructuración del objeto específico del arreglo
            $(".style1").append(`<article class="mb-4">
            <div class="card text-left border-white">
              <img
                height="150"
                src=${array1[key].image}
                class="card-img-top img-sec1"
              />
              <div class="card-body text-left p-card1">
                <h5 class="text-left">
                  ${array1[key].title}
                </h5>
                <p class="text-muted parafos-card">
                  ${array1[key].contenido}
                </p>
                <div class="d-flex justify-content-between">
                  <div>
                    <small class="text-muted">
                      <a href="#" class="text-dark"> ${array1[key].autor} </a>
                      <span class="text-dark">in</span>
                      <a href="#" class="text-dark">Mind cafe </a>
                    </small>

                    <small class="text-muted"
                      ><p class="card-text">
                        ${array1[key].date} &middot; 6 min read
                        <i class="p-2 fas fa-star"></i></p
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
                    <a href="#" class="card-link text-dark text-muted"
                      ><i class="fas fa-ellipsis-h ml-3"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </article>`);
     }
        */

// imprimir primera sección de recientes con el post en [1,2,3]
/*
var arraySection2 = []
for(key in array){
 $(".style1").append(`<article class="mb-4">
              <div class="row d-flex flex-row-reverse flex-md-row no-gutters">
                <div class="col-4">
                  <img
                    src=${array1[key].image}
                    class="ml-4 ml-md-0"
                  />
                </div>
                <div class="col-8 col-">
                  <div class="pl-md-2">
                    <h6 class="">
                      ${array1[key].title}
                    </h6>
                    <div class="d-flex justify-content-between">
                      <div>
                        <small class="text-muted">
                          <a href="#" class="text-dark">${array1[key].autor} </a>
                          <span class="text-dark">in</span>
                          <a href="#" class="text-dark">Heated </a>
                        </small>

                        <small class="text-muted"
                          ><p class="card-text">
                           ${array1[key].date}  &#183; 6 min read
                            <i class="p-2 fas fa-star"></i></p
                        ></small>
                      </div>
                      <div class="font-weight-lighter text-muted">
                        <i
                          class="far fa-bookmark d-md-none d--inline-block"
                        ></i>
                        <a href="#" class="card-link text-dark text-muted"
                          ><i class="fas fa-ellipsis-h ml-3"></i
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>`);
}
*/

// imprimir primera sección de recientes con el post en [4]
/*
let { title, autor, contenido, image, date } = array1[4]
$(".style1").append(`<article class="mb-4 d-none d-lg-block">
            <div class="card text-left border-white">
              <img
                height="150"
                src=${array1[key].image}
                class="card-img-top"
              />
              <div class="mt-2 mr-5 text-left p-card3">
                <h5 class="text-left">
                  ${array1[key].title}
                </h5>
                <p class="text-muted parafos-card">
                  ${array1[key].contenido}
                </p>

                <p></p>
                <div class="d-flex justify-content-between">
                  <div>
                    <small class="text-muted">
                      <a href="#" class="text-dark"> ${array1[key].autor} </a>
                      <span class="text-dark">in</span>
                      <a href="#" class="text-dark">Payne </a>
                    </small>

                    <small class="text-muted"
                      ><p class="card-text">
                       ${array1[key].date} &middot; 5 min read
                        <i class="p-2 fas fa-star"></i></p
                    ></small>
                  </div>
                  <div class="font-weight-lighter text-muted">
                    <i class="far fa-bookmark d-md-none d--inline-block"></i>
                    <a href="#" class="card-link text-dark"
                      ><i class="fas fa-ellipsis-h ml-3"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </article>`);

*/
/*
const printModal = (response) => {
  let { title, autor, contenido, image, date } = response;

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
  printModal(selectedPost);
};

/* Eventos  */

const addShowModalListeners = () => {
  let aListener = document.querySelectorAll(".showModal");
  console.log(aListener);
  aListener.forEach((a) => {
    //console.log("hola" + a);
    a.addEventListener("click", conseguirModal);
  });
};
$("button#sendPost").click(saveNewPost); //Sube el newPost

//var postObjectArr2 = postObjectArr;

//console.log(postObjectArr2);

getPostDb();
