  
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
    ]
    // ... other parameters
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


$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
    $$("#btnini").on("click", adduser());
})

function adduser(){
  var username= document.getElementById("username").value;
  var useremail= document.getElementById("useremail").value;
  var userpassword= document.getElementById("userpassword").value;
  function addusertosistem( username, useremail,userpassword)
  mainView.router.navigate('/inicio/');
}

function addusertosistem(user, email,contraseña){
    var newuser={
        user: username,
        email: useremail,
        contraseña:userpassword 
    }
    console.log(newuser)
}
    