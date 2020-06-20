/*      -   -   -    Funcionalidad de Medium Blog - - -
  - - -MANTENER EL CÓDIGO COMENTADO Y ORGANIZADO
  - - -CHECAR EN QUE RAMA SE ESTA MODIFICANDO
 */
/* Var global scope */
var postObject = {};

/* Guardar la información del post creado*/
const getNewPost = () => {
  let date = new Date();
  console.log(date);
  $(".form-control").each(function (index) {
    let value = $(this).val();
    let propertyKey = $(this).data("property-key");
    postObject[propertyKey] = value;
    postObject["date"] = date;
  });
  uploadPost(postObject);
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
const printPostCard = (postObject, key) => {
  console.log(key);
  //$("#cards-wrapper").empty();
  let { title, autor, contenido, image, date } = postObject;
  $("#cards-wrapper").append(`<div id="${key}"  class="col-6 oneCardWrapper">
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${image}" class="card-img" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
        <a href="" class="showModal"><h5 class="card-title">${title}</h5></a>
        
        <h6>${autor}</h6>
          <p class="card-text">
          ${contenido}
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
const getPostDb = () => {
  $.get(
    "https://ajaxclass-1ca34.firebaseio.com/mediumBlog/Equipo4/post/.json",
    function (response) {
      $.each(response, (key, value) => {
        printPostCard(value, key);
      });
    }
  );
};
const printModal = (response) => {
  let { title, autor, contenido, image, date } = response;
  $(".articleModal").find(".modal-content").append(`<div class="modal-header">
  <h3 class="">${title}</h3>
  <h6 class="modal-autor ">${autor}</h6>
  <button
    type="button"
    class="close"modal-title
    data-dismiss="modal"
    aria-label="Close"
  >
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <img src="${image}" alt="" width=100% />
  <p>${contenido}</p>
</div>
<div class="modal-footer">
  <button
    type="button"
    class="btn btn-secondary"
    data-dismiss="modal"
  >
    Close
  </button>
</div>`);

  $(".articleModal").modal("show");
};

const getModalDb = (key) => {
  $.get(
    `https://ajaxclass-1ca34.firebaseio.com/mediumBlog/Equipo4/post/${key}.json`,
    function (response) {
      console.log(response);
      printModal(response);
    }
  );
};

const conseguirModal = () => {
  //event.preventDefault();
  let key = $(".oneCardWrapper").attr("id");
  console.log(key);
  console.log("hola");
  getModalDb(key);
};
/* Eventos  */
$("button#sendPost").click(getNewPost); //Sube el newPost

/*const addShowModalListeners = () => {
  let btnList = document.querySelectorAll(".showModal");
  btnList.forEach((button) => {
    button.addEventListener("click", conseguirModal);
  });
};
*/
const addShowModalListeners = () => {
  $(".showModal").each(function () {
    console.log(this);
    //this.closest(".class");
    //this.clik(conseguirModal);
  });
};
getPostDb();
