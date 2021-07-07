var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [  
        { path: '/index/', url: 'index.html', },
        { path: '/inises/', url: 'inises.html', },
        { path: '/registro/', url: 'registro.html', },
        { path: '/inicio/', url: 'inicio.html', },
        { path: '/busqueda/', url: 'busqueda.html', },
        { path: '/libreria/', url: 'libreria.html', },
        { path: '/nuevoprojecto/', url: 'nuevoproyecto.html', },  
        { path: '/resultado/', url: 'result.html',}, 
        { path: '/create/', url: 'create.html',}, 
    ],
    // ... other parameters
    autocomplete: {
        openIn: 'popup',
        animate: false,
    },
});
  
var mainView = app.views.create('.view-main');

var coluser
var colproyectos;
var db;
db= firebase.firestore();
colproyectos= db.collection('Proyectos');
coluser=db.collection('Users')
colnewproyects=db.collection('Proyectos').doc("new proyects").collection('userproyects')

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
})



$$(document).on('page:init', '.page[data-name="index"]', function (e) {
})
/*REGISTRO*/ 
$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
    $$("#btnregi").on("click", adduser);
})
/*INICIAR SESION*/
$$(document).on('page:init', '.page[data-name="iniciarsesion"]', function (e) {
    $$("#btnini").on("click", checkin);

})
/*INICIO*/
$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
    $$("#btnbusqueda").on("click", search);
    $$("#btnlibreria").on("click", gotolibrary);
    $$("#btnwproject").on("click", gotoproject);
    $$("#gocreate").on("click", gotocreate);
    $$("#btncerrarsesion").on("click", closesesion);
    var panel = app.panel.create({
      el: '.panel-left',
      on: {
        opened: function () {
          console.log('Panel opened')
          $$('.ac-1').on('click', () => {
            ac1.open();
          });
        }
      }
    })
    var ac1 = app.actions.create({
        buttons: [
          {
            text: 'galeria',
            onClick: fnGaleria(),

          },
          {
            text: 'Camara',
            onClick:fnCamara(),
          },
          {
            text: 'Cancel',
            color: 'red'
          },
        ]
    })
})


$$(document).on('page:init', '.page[data-name="create"]', function (e) {
  var ac1 = app.actions.create({
    buttons: [
      {
        text: 'galeria',
        onClick: fnGaleria(),
      },
      {
        text: 'Camara',
        onClick:fnCamara(),
      },
      {
        text: 'Cancel',
        color: 'red'
      },
    ]
  })
})

/*Create*/
$$(document).on('page:init', '.page[data-name="create"]', function (e) {
  $$("#backcreate").on("click", fnbackcreate);
  $$("#btncreate").on("click", createproyect);
  
})


/*BUSQUEDA*/
$$(document).on('page:init', '.page[data-name="busqueda"]', function (e) {
    $$("#backbusqueda").on("click", backbusqueda);
    var searchbar = app.searchbar.create({
        el: '.searchbar',
        searchContainer: '.list',
        searchIn: '.item-title',
        on: {
          search(sb, query, previousQuery) {
            console.log(query, previousQuery);
          }
        }
    });
    
    colnewproyects.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            titulo = doc.data().titulo
            materialuno= doc.data().primermaterial
            materialdos= doc.data().segundomaterial
            materialtres= doc.data().tercermaterial
            materialcuatro= doc.data().cuartomaterial
            parrafouno= doc.data().primerparrafo
            parrafodos= doc.data().segundoparrafo
            parrafotres= doc.data().tercerparrafo
            parrafocuatro= doc.data().cuartoparrafo
              card=`<li class="item-content invisible">
              <div class="item-inner">
                <div class="card card-expandable cardimg">
                  <div class="card-content">
                    <div style="background-color: transparent; height: 300px">
                      <img src="./img/aviones.jpg"  class="img" alt=""> 
                      <div class="card-header text-color-black display-block">
                        <div class="item-title">`+ titulo +`</div>
                        <small style="opacity: 0.7">
                          SomeUser 
                          <img src="./img/estrella vacia.jpg" value="1" alt="" class="imge">
                          <img src="./img/estrella vacia.jpg" value="2" alt="" class="imge">
                          <img src="./img/estrella vacia.jpg" value="3" alt="" class="imge">
                          <img src="./img/estrella vacia.jpg" value="4" alt="" class="imge">
                          <img src="./img/estrella vacia.jpg" value="5" alt="" class="imge">
                        </small>
                      </div>
                      <a href="#" class="link card-close card-opened-fade-in color-black"
                        style="position: absolute; right: 15px; top: 15px">
                        <i class="icon f7-icons">xmark_circle_fill</i>
                      </a>
                    </div>
                    <div class="card-content-padding paragraphs">
                      <hr>
                      <ol>
                        <li>`+ materialuno +`</li>
                        <li>`+ materialdos +`</li>
                        <li>`+ materialtres +`</li>  
                        <li>`+ materialcuatro +`</li>  
                      </ol> 
                      <hr>
                      <p>`+parrafouno+`</p>
                      <p>`+parrafodos+`</p>
                      <p>`+parrafotres+`</p>
                      <p>`+parrafocuatro+`</p>
                    </div>  
                  </div>  
                </div> 
              </div>
            </li>`
          $$("#contenedorbus").append(card);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    
})
/*LIBRERIA*/
$$(document).on('page:init', '.page[data-name="libreria"]', function (e) {
    $$("#backlibrary").on("click", backlibrary);    
})
/*NUEVO PROJECTO*/
$$(document).on('page:init', '.page[data-name="nuevoprojecto"]', function (e) {
    $$("#backNP").on("click", backnuevoprojecto);
    const materials = 'Carton Cartulina Plasticola Acrilico'.split(' ');

    autocompleteDropdownSimple = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown',
        openIn: 'dropdown',
        source: function (query, render) {
          console.log(query);
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Find matched items
          for (var i = 0; i < materials.length; i++) {
            if (materials[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(materials[i]);
          }
          // Render items by passing array with result items
          render(results);
        }
    });
    autocompleteDropdownSimple = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown2',
        openIn: 'dropdown',
        source: function (query, render) {
          console.log(query);
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Find matched items
          for (var i = 0; i < materials.length; i++) {
            if (materials[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(materials[i]);
          }
          // Render items by passing array with result items
          render(results);
        }
    });
    autocompleteDropdownSimple = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown3',
        openIn: 'dropdown',
        source: function (query, render) {
          console.log(query);
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Find matched items
          for (var i = 0; i < materials.length; i++) {
            if (materials[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(materials[i]);
          }
          // Render items by passing array with result items
          render(results);
        }
    });
    autocompleteDropdownSimple = app.autocomplete.create({
        inputEl: '#autocomplete-dropdown4',
        openIn: 'dropdown',
        source: function (query, render) {
          console.log(query);
          var results = [];
          if (query.length === 0) {
            render(results);
            return;
          }
          // Find matched items
          for (var i = 0; i < materials.length; i++) {
            if (materials[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(materials[i]);
          }
          // Render items by passing array with result items
          render(results);
        }
    });

    $$("#searchnewproject").on("click", searchnewproject);
    
})
/*NUEVO PROJECTO RESULT*/
$$(document).on('page:init', '.page[data-name="result"]', function (e) {
  $$("#backresult").on("click", backresult);    
})



/*CARDS*/
$$('card-expandable').on('card:opened', function () {
    $("#e1").on("mouseover", function() {
      iluminar(1)
    });
    $("#e2").on("mouseover", function() {
      iluminar(2)
    });
    $("#e3").on("mouseover", function() {
        iluminar(3)
    });
    $("#e4").on("mouseover", function() {
        iluminar(4)
    });
    $("#e5").on("mouseover", function() {
        iluminar(5)
    });

    $("#e1").on("click", function() {
        seleccionar(1)
    });
    $("#e2").on("click", function() {
        seleccionar(2)
    });
    $("#e3").on("click", function() {
        seleccionar(3)
    });
    $("#e4").on("click", function() {
        seleccionar(4)
    });
    $("#e5").on("click", function() {
        seleccionar(5)
    });

    $(".imge").on("mouseout", apagar);
    });

/*

  COMIENZAN FUNCIONESSSSSSS


*/




/* FUNCIONES DE REGISTRO*/
function adduser(){
  var username= document.getElementById("username").value;
  var useremail= document.getElementById("useremail").value;
  var userpassword= document.getElementById("userpassword").value;
  firebase.auth().createUserWithEmailAndPassword(useremail,userpassword)
    .catch( function(error){
        console.log("hay un error")
    })
    .then( function(){
        console.log("todo bien")
        var datos={
          user : document.getElementById("username").value,
        }
        id=document.getElementById("useremail").value;
        coluser.doc(id).set(datos)
        .then(function(){
          db.collection("users").doc(id).get().then((doc) => {
            user= doc.data().user
            console.log(user); 
            $$("#inuser").html(user)          
          })
          .catch((error) => {
            console.log("nop");
          });
        })
        .catch(function(){
          console.log("no se escribio en base")
        })
        mainView.router.navigate('/inicio/');
    })

  // .then(function(){
  //   coluser.doc(id).get()
  //   .then((doc) => {
  //    user= doc.data().user
  //    $$("#inuser").html(user)
  //   })
  // })
  // .catch( function(){
  //   console.log("no master, no hay caso")
  // })
}
function checkin(){
    var email= document.getElementById("useremailSI").value;
    var password= document.getElementById("userpasswordSI").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("todo bien, pasa")
        id=document.getElementById("useremailSI").value;
        coluser.doc(id).get()
        .then((doc) => {
          user= doc.data().user
          console.log("check in" + user)
          $$("#inuser").html(user)
        })
        .catch(function(){
          console.log("volve a intentar")
        })
        mainView.router.navigate('/inicio/');
    })
    .catch((error) => {
        console.log("no te conozco")
    });
}
/* FUNCIONES DE INICIO*/
function search(){
    mainView.router.navigate('/busqueda/');
}
function gotolibrary(){
    mainView.router.navigate('/libreria/');
}
function gotoproject(){
    mainView.router.navigate('/nuevoprojecto/');
}
function gotocreate(){
  mainView.router.navigate('/create/');
}
function closesesion(){
  mainView.router.navigate('/index/');
  app.panel.close(mypanel);
}
/* FUNCIONES DE CREATE*/
function fnbackcreate(){
  mainView.router.navigate('/inicio/');
}
function createproyect(){
  var datos={
     titulo: document.getElementById("in1").value,
    //  foto: document.getElementById("foto").attr("src"),
     primermaterial: document.getElementById("in2").value,
     segundomaterial: document.getElementById("in3").value,
     tercermaterial: document.getElementById("in4").value,
     cuartomaterial: document.getElementById("in5").value,
     primerparrafo: document.getElementById("in6").value,
     segundoparrafo:document.getElementById("in7").value,
     tercerparrafo: document.getElementById("in8").value,
     cuartoparrafo:document.getElementById("in9").value,
  }
  id=document.getElementById("in1").value;
  colnewproyects.doc(id).set(datos)
  .then( function(){
    colnewproyects.get()
    .then((doc) => {
        console.log(doc.id, "mira => ", doc.data());
        titulo = doc.data().titulo
        materialuno= doc.data().primermaterial
        materialdos= doc.data().segundomaterial
        materialtres= doc.data().tercermaterial
        materialcuatro= doc.data().cuartomaterial
        parrafouno= doc.data().primerparrafo
        parrafodos= doc.data().segundoparrafo
        parrafotres= doc.data().tercerparrafo
        parrafocuatro= doc.data().cuartoparrafo
        
          card=`<li class="item-content invisible">
          <div class="item-inner">
            <div class="card card-expandable cardimg">
              <div class="card-content">
                <div style="background-color: transparent; height: 300px">
                  <img src="./img/aviones.jpg"  class="img" alt=""> 
                  <div class="card-header text-color-black display-block">
                    <div class="item-title">`+ titulo +`</div>
                    <small style="opacity: 0.7">
                      SomeUser 
                      <img src="./img/estrella vacia.jpg" value="1" alt="" class="imge">
                      <img src="./img/estrella vacia.jpg" value="2" alt="" class="imge">
                      <img src="./img/estrella vacia.jpg" value="3" alt="" class="imge">
                      <img src="./img/estrella vacia.jpg" value="4" alt="" class="imge">
                      <img src="./img/estrella vacia.jpg" value="5" alt="" class="imge">
                    </small>
                  </div>
                  <a href="#" class="link card-close card-opened-fade-in color-black"
                    style="position: absolute; right: 15px; top: 15px">
                    <i class="icon f7-icons">xmark_circle_fill</i>
                  </a>
                </div>
                <div class="card-content-padding paragraphs">
                  <hr>
                  <ol>
                    <li>`+ materialuno +`</li>
                    <li>`+ materialdos +`</li>
                    <li>`+ materialtres +`</li>  
                    <li>`+ materialcuatro +`</li>  
                  </ol> 
                  <hr>
                  <p>`+parrafouno+`</p>
                  <p>`+parrafodos+`</p>
                  <p>`+parrafotres+`</p>
                  <p>`+parrafocuatro+`</p>
                </div>  
              </div>  
            </div> 
          </div>
        </li>`
        $$("#contenedorbus").append(card);
    })
    
  })
  mainView.router.navigate('/busqueda/');     
}
/* FUNCIONES DE LIBRERIA*/
function backlibrary(){
    mainView.router.navigate('/inicio/');
}

/* FUNCIONES DE BUSQUEDA*/
function backbusqueda(){
    mainView.router.navigate('/inicio/');
}
/* FUNCIONES DE NUEVO PROJECTO*/
function backnuevoprojecto(){
    mainView.router.navigate('/inicio/');
}
function searchnewproject(){
  mainView.router.navigate('/resultado/');
}

/* FUNCIONES DE RESULTADO*/

function backresult(){
  mainView.router.navigate('/inicio/');
}

/* FUNCIONES DE CARDS*/
function iluminar(n) {
  $(".imge").attr("src", "./img/estrella vacia.jpg")
  for (i = 0; i <= n; i++) {
      $("#e" + i).attr("src", "./img/estrellita ilu.png")
  }
}

function seleccionar(nm) {
  nvotos++
  npuntos += nm
  apagar();
  console.log("nv =" + nvotos)
  console.log("np =" + npuntos)
  console.log("veo estrellas" + nm + "iluminadas")
}

function apagar() {
  $(".imge").attr("src", "./img/estrella vacia.jpg")
  if (nvotos > 1) {
      prom = npuntos / nvotos
      console.log("prom es igual a " + prom)
  }
  entero = parseInt(prom)
  decimal = prom - entero
  for (i = 0; i <= entero; i++) {
      $("#e" + i).attr("src", "./img/estrellita selec.png")
  }
}



function fnCamara() {
  // FOTO DESDE CAMARA
    navigator.camera.getPicture(onSuccessCamara,onErrorCamara,
    {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA
    });
  }
  
  
  function fnGaleria() {
    navigator.camera.getPicture(onSuccessCamara,onErrorCamara,
      {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      });

  }
  
  function onSuccessCamara(imageURI) {
      $$("#foto").attr("src", imageURI);
     // RESTA QUE ESTA FOTO SUBA AL STORAGE…. O HACER OTRA COSA...
  
  }
  function onErrorCamara() {
      console.log('error de camara');
  }