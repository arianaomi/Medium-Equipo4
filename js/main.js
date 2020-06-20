/*      -   -   -    Funcionalidad de Medium Blog - - -
  - - -MANTENER EL CÓDIGO COMENTADO Y ORGANIZADO
  - - -CHECAR EN QUE RAMA SE ESTA MODIFICANDO
 */
/* Var global scope */
var postObject = {};
var postObjectArr = [];
var postResp = {};

/* Guardar la información del post creado*/
const saveNewPost = () => {
  let date = new Date();
  let milisegundos = date.getTime();
  console.log(milisegundos);

  let popularFlag = $(".form-check-input").is(":checked") ? true : false;
  console.log(popularFlag);
  $(".form-control").each(function (index) {
    let value = $(this).val();
    let propertyKey = $(this).data("property-key");
    postObject[propertyKey] = value;
    postObject["date"] = date;
    postObject["popularFlag"] = popularFlag;
    postObject["compararFechas"] = milisegundos;
  });
  console.log(postObject);
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
  let { title, subtitle, autor, image, date } = postObject;
  let postWrapper = $("#cards-wrapper");
  postWrapper.innerHTML = "";
  $("#cards-wrapper")
    .append(`<div   class="col-6 oneCardWrapper" height="300px" >
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${image}" height="300px" class="card-img" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
        <a  class="showModal"><h5 id="${key}"class="card-title">${title}</h5></a>
        
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

/* Reques para obtener los post, imprimirlos y crear arreglo */
const getPostDb = () => {
  $.get(
    "https://ajaxclass-1ca34.firebaseio.com/mediumBlog/Equipo4/post/.json",
    function (response) {
      $.each(response, (key, value) => {
        printPostCard(value, key);
        postObjectArr[key] = value;
      });
      postResp = response;
      addShowModalListeners(); //Evento para todos loa title
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

getPostDb();
