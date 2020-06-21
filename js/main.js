/*      -   -   -    Funcionalidad de Medium Blog - - -
  - - -MANTENER EL CÓDIGO COMENTADO Y ORGANIZADO
  - - -CHECAR EN QUE RAMA SE ESTA MODIFICANDO
 */

/* Var global scope */
var postObject = {};
var postObjectArr = [];
var postWithKeyObject = {};
var postWithKeyObjectArr = [];
var mostRecent;

/* Dynamic HTML */
const loadContent = (contentUrl) => {
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
  console.log(milisegundos);
  let popularFlag = $(".form-check-input").is(":checked") ? true : false;
  console.log(popularFlag);

  $(".form-control").each(function (index) {
    let value = $(this).val();
    let propertyKey = $(this).data("property-key");
    postObject[propertyKey] = value;
    postObject["date"] = date2;
    postObject["popularFlag"] = popularFlag;
    postObject["compararFechas"] = milisegundos;
  });
  console.log(postObject);
  //uploadPost(postObject);
};

/* Sube al endpoint el post creado y nos regresa la llave con lo que lo guardo */
const uploadPost = (postObject) => {
  $.post(
    "https://ajaxclass-1ca34.firebaseio.com/mediumBlog/Equipo4/post/.json",
    JSON.stringify(postObject),
    function (data) {
      console.log(data);
    }
  );
};

/* Crear la card con los datos de db */
const printPostSection1Card = (postObject, key) => {
  let { title, subtitle, autor, image, date, postKey } = postObject;
  let postWrapper = $(".general-1");
  postWrapper.innerHTML = "";
  $(".general-1").append(`
  <article class="mb-4">
    <div class="row d-flex no-gutters">
      <div class="col-8">
        <div class="pl-1 md-1">
          <p class="text-muted my-0">
            <small class="card-text">BUSINESS Popular topic</small>
          </p>
          <a  class="showModal"><h5 id="${key}"class="card-title">${title}</h5></a>
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
                  ${date}
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
          src="${image}"
          class="img-fluid"
          alt="Responsive image"
        />
      </div>
    </div>
  </article>`);
};

/* Request para obtener los post, imprimirlos y crear arreglo */
const getPostDb = () => {
  $.get(
    "https://ajaxclass-1ca34.firebaseio.com/mediumBlog/Equipo4/post/.json",
    function (response) {
      $.each(response, (key, value) => {
        printPostSection1Card(value, key);
        postObject = response;
        postObjectArr[key] = value;
        postWithKeyObject = { ...value, postKey: key };
        postWithKeyObjectArr.push(postWithKeyObject);
      });
      console.log(postWithKeyObjectArr);
      addShowModalListeners();
    }
  );
};
const getmostRecent = () => {
  mostRecent = postWithKeyObjectArr
    .sort(function (currentItem, nextItem) {
      return nextItem.compararFechas + currentItem.comprararFechas;
    })
    .reverse()
    .splice(0, 5);
  console.log(mostRecent);
};
var mostPopular;

const getmostPopular = () => {
  mostPopular = postWithKeyObjectArr.filter((post) => {
    return post.popularFlag == true;
  });
  mostPopular = mostPopular.splice(0, 4);
  console.log(mostPopular);
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
getPostDb();
