

var welcome = document.getElementById('welcome');
var logout = document.getElementById('logout');

var savedName = localStorage.getItem('acc');

welcome.innerHTML = `<h1 class="text-uppercase text-center display-3"><span class="d-inline-block">welcome back</span> ${savedName} </h1>`

logout.addEventListener('click' , function(){
    localStorage.removeItem('acc');
    window.location = '../index.html'
})

//to prevent the user from entering the home page without logging in
if (savedName == null) {
    window.location = '../index.html';
}