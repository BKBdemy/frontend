jQuery(document).ready(function () {
    initBurgerMenu();
    initScrollUp();
    initGetNewProducts();
    initGetMostWatchedProducts();
    getSingleProduct();
});

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

    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 150) {
            button.addClass('active')
        } else {
            button.removeClass('active');
        }
    });
}

async function initGetNewProducts() {
    const slider = jQuery('.course-slider');
    if (slider.length) {
        fetch('/src/js/api.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(function (course) {
                    const content =
                        `
                        <div class="single-course">
                            <h3><?php echo $course['description'];?></h3>
                            <p class="course-further-info">
                                <span class="course-author-name">Tutor: Gibt API nicht her</span>
                                <span class="course-duration">Dauer: Gibt API nicht her</span>
                                <span class="course-price">Preis: ${course.Price}€</span>
                            </p>
                            <video>
                                <source <!--src=""--> type="video/mp4">
                            </video>
                            <p class="course-excerpt">${course.Description}</p>
                            <a class="secondary-button" href="https://bkbdemy.yfain.de/kurse/${course.ID}">Zum Kurs</a>
                        </div>
                    `
                    slider.append(content);
                })

            })
            .then(() => {
                initCourseSlider()
            })
            .catch(error => {
                console.error(error);
            });
    }
}

async function initGetMostWatchedProducts() {
    const slider = jQuery('.most-watched-slider');
    if (slider.length) {
        fetch('/src/js/api.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(function (course) {
                    const content =
                        `
                        <div class="single-course">
                            <h3><?php echo $course['description'];?></h3>
                            <p class="course-further-info">
                                <span class="course-author-name">Tutor: Gibt API nicht her</span>
                                <span class="course-duration">Dauer: Gibt API nicht her</span>
                                <span class="course-price">Preis: ${course.Price}€</span>
                            </p>
                            <video>
                                <source <!--src=""--> type="video/mp4">
                            </video>
                            <p class="course-excerpt">${course.Description}</p>
                            <a class="secondary-button" href="https://bkbdemy.yfain.de/kurse/${course.ID}">Zum Kurs</a>
                        </div>
                    `
                    slider.append(content);
                })

            })
            .then(() => {
                initMostWatchedSlider()
            })
            .catch(error => {
                console.error(error);
            });
    }
}

async function getSingleProduct() {
    const container = jQuery('.single-course');
    const bodyClass = jQuery('body').hasClass('page-single-course');
    const URL = window.location.href;
    const courseID = parseInt(URL.split('/kurse/')[1]);

    if (bodyClass) {
        fetch('/src/js/api.json')
            .then(response => response.json())
            .then(data => {
                const course = data.find(product => product.ID === courseID);
                const content = `
                    <h3>${course.Name}</h3>
                    <p class="course-further-info">
                      <span class="course-author-name">Tutor: Gibt API nicht her</span>
                      <span class="course-duration">Dauer: Gibt API nicht her</span>
                      <span class="course-price">Preis: ${course.Price}€</span>
                    </p>
                    <video>
                      <source src="${course.MPD_URL}" type="video/mp4">
                    </video>
                    <p class="course-excerpt">${course.Description}</p>
                    <a class="secondary-button" href="#kaufen">Kurs kaufen</a>
                    <a class="primary-button" href="https://bkbdemy.yfain.de/">Zurück</a>
                `;
                container.append(content);
            })
            .catch(error => {
                console.error(error);
        });
    }
}