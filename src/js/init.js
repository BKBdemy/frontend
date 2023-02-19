jQuery(document).ready(function(){
    initBurgerMenu();
})

function initBurgerMenu() {

    const burgerContainer = jQuery('.burger-menu');
    const mobileContainer = jQuery('.nav-bar.mobile');
    const body = jQuery('body');

    burgerContainer.on('click', function () {
        burgerContainer.toggleClass('active');
        body.toggleClass('no-scroll');
        mobileContainer.slideToggle();
    })
}