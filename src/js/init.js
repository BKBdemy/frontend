jQuery(document).ready(function(){
    initBurgerMenu();
    initCourseSlider();
    initMostWatchedSlider();
    initScrollUp();
    fetchAPI();
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

function initCourseSlider() {

    let container = jQuery('.course-slider');

    if (container.length) {
        jQuery(container).slick({
            arrows: false,
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 300,
            adaptiveHeight: false,
            slidesToShow: 1,
        });
    }
}

function initMostWatchedSlider() {
    let container = jQuery('.most-watched-slider');

    if (container.length) {
        jQuery(container).slick({
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 300,
            adaptiveHeight: false,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 1600,
                    settings: {
                        dots: true,
                        arrows: false
                    }
                }
            ]
        });
    }
}

function initScrollUp() {
    const button = jQuery('.scroll-up');

    button.on('click', function () {
        jQuery(window).scrollTop(0);
    })

    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 150) {
            button.addClass('active')
        } else {
            button.removeClass('active');
        }
    });
}

async function fetchAPI() {

    fetch('https://bkbdemy.pxroute.net/api/products', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}