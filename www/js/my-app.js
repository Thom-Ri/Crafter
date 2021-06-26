// If we need to use custom DOM library, let's save it to $$ variable:
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
    ],
    // ... other parameters
    autocomplete: {
        openIn: 'popup',
        animate: false,
    },
});
  
var mainView = app.views.create('.view-main');

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
    var panel = app.panel.create({
      el: '.panel-left',
      on: {
        opened: function () {
          console.log('Panel opened')
        }
      }
    })
    $$("#btncerrarsesion").on("click", closesesion);
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
        mainView.router.navigate('/inicio/');
    })
}
function checkin(){
    var email= document.getElementById("useremailSI").value;
    var password= document.getElementById("userpasswordSI").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("todo bien, pasa")
        mainView.router.navigate('/inicio/');
    })
    .catch((error) => {
        console.log("no te conozco")
    });
    mainView.router.navigate('/inicio/');
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
function closesesion(){
    mainView.router.navigate('/index/');
    app.panel.close(mypanel);
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