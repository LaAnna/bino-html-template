// Mobile Navigation

var btnBurger = document.querySelector('.header__toggle');
var menu = document.querySelector('.nav');
var navLinks = document.querySelectorAll('.nav__link');
var up = document.querySelector('.up');
(function () {

    if (btnBurger) {
        btnBurger.addEventListener('click', function (event) {
            event.preventDefault();
            btnBurger.classList.toggle('open');
            menu.classList.toggle('open');
        });
    }
    if (navLinks && navLinks.length>0){
        navLinks.forEach(function (link) {
            link.addEventListener('click', closeMobileNav)
        })
    }
})();



function closeMobileNav() {
    if (btnBurger && btnBurger.classList.contains('open')) {
        btnBurger.classList.remove('open');
    }
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    }
}

// function upNav() {
//     if (up) {
//         up.addEventListener('click', scrollUp)
//     }
// }
//
// var t;
// function scrollUp() {
//     var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
//     if(top > 0) {
//         window.scrollBy(0,-100);
//         t = setTimeout('up()',20);
//     } else clearTimeout(t);
//     return false;
// }