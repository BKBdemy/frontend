/* Defining Global Variables or Objects*/

/* This variable stores the current videos of the course when its initialized*/
let currentCourse = null;
/* This variable checks wether the token has already been verified once within the session or not*/
let verifyToken = true;
/* Caching the Video Data of a Course for reusing purposes, using a boolean to reset the cache when mandatory */
let videoProgressCache = {
    videos: {},
    invalidated: true
}


/* These functions will initialize when the document (DOM) is ready */
jQuery(document).ready(function () {
    /* Menu Navigation*/
    initBurgerMenu();
    initScroll();
    initFrontpageSlider();
    initNewsSlider();

    /*Initialize User Status*/
    initCookieNotice();
    initLogin();
    initLogout();
    initRegistration();

    /*Initialize Page Content*/
    initIncreaseUserBalance();
    initVisiblePassword();
    initHandleUserContainer();
    initLoadUserData();
    initLoadNewProducts();
    initLoadAllProducts();
    initLoadMostWatchedProducts();
    initLoadSingleProduct();
    initLoadOwnedProducts();
    initDashboardNavigation();
    initLoadCurrentUserLevel();
})

/* callback functions */

function progressBar(courseProgress, progressBarElement, progressTextElement) {
    const progressBar = jQuery(progressBarElement);
    const courseProgressText = jQuery(progressTextElement);
    progressBar.width(`${courseProgress}%`);

    courseProgressText.text(courseProgress === 100 ? 'Abgeschlossen' : `Kursfortschritt: ${courseProgress.toFixed(2)}%`);

    return courseProgress.toFixed(2);
}



async function addComment(courseID) {
    const input = jQuery('.write-comment textarea');
    const loginInput = {
        comment: input.val()
    }

    fetch('https://bkbdemy.pxroute.net/api/products/' + courseID + '/comments', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + await getToken(),
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(loginInput)
    })
        .then(response => response.json())
        .then(() => {
            loadCourseComments();
            input.val("");
            const button = jQuery('.submit-comment');
            /* Removing the class that is added when clicking the button*/
            button.removeClass('disabled');
        })
        .catch(error => {
            console.error('Error:', error)
        });
}

function loadCourseComments() {

    const URL = window.location.href;
    const courseID = parseInt(URL.split('/kurse/')[1]);
    const bodyClass = jQuery('body').hasClass('page-single-course');

    if (bodyClass) {
        fetch('https://bkbdemy.pxroute.net/api/products/' + courseID + '/comments', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                renderComments(data, 3);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

async function addBalance(amount) {

    fetch('https://bkbdemy.pxroute.net/api/auth/increase_balance/' + parseInt(amount), {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + await getToken(),
            'Content-Type': 'application/json'
        })
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
        });
}

function courseVideoSlider() {
    const container = jQuery('.course-progress-wrapper .bottom');
    jQuery(container).slick({
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: false,
        adaptiveHeight: false,
        slidesToShow: 1,
    });
}

async function getCourseProgress(videos) {
    let CourseIDs = [];
    videos.forEach(function (video) {
        CourseIDs.push(video.IndexID);
    });

    const watchedVideos = await getWatchedVideos();

    let watched = 0;

    if (watchedVideos) {
        watchedVideos.forEach(function (video) {
            if (CourseIDs.includes(video.IndexID)) {
                watched++;
            }
        });

        const length = videos.length;
        const courseProgress = (watched / length) * 100;
        return courseProgress;

    }

    return 0;
}

function addToWatchedVideos() {
    const videos = jQuery('.course-progress-wrapper video');

    if (videos.length) {
        videos.each(function () {
            const video = $(this);
            const videoId = video.attr('id');
            const ID = videoId.split('video-')[1];
            const points = video.attr('data-src');
            video.on('ended', async function () {
                videoProgressCache.invalidated = true;
                await updateVideoProgress(ID, points);
                try {
                    fetch('https://bkbdemy.pxroute.net/api/video/' + parseInt(ID) + '/progress', {
                        method: 'POST',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + await getToken(),
                            'Content-Type': 'application/json'
                        })
                    })
                        .then(response => response)
                        .then(async () => {
                            await updateCourseProgress(currentCourse);
                        })
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
    }
}

function returnDifficulty(integer) {
    if (integer === 1) return 'Anfänger';
    if (integer === 2) return 'Fortgeschritten';
    if (integer === 3) return 'Experte';
}

function getHomeUrl() {
    const homeURL = window.location.origin;
    return homeURL;
}

function animateErrorMessage() {

    const container = jQuery('.error-message');
    container.addClass('animate');
    container.addClass('active');

    setTimeout(function () {
        container.removeClass('animate');
    }, 1000)
}

async function getToken(verifyToken) {
    const token = localStorage.getItem('authToken');
    try {

        if (!verifyToken) {
            return token;
        }

        const response = await fetch('https://bkbdemy.pxroute.net/api/auth/me', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        });
        //const data = await response.json();
        if (response.status === 401) return null;
        verifyToken = true;
        return token;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getUserData() {
    if (await getToken()) {
        return fetch('https://bkbdemy.pxroute.net/api/auth/me', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + await getToken(),
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json());
    }
    return null;
}

async function getWatchedVideos() {
    const token = localStorage.getItem('authToken');

    try {

        if (!videoProgressCache.invalidated) {
            return videoProgressCache.videos;
        }

        const response = await fetch('https://bkbdemy.pxroute.net/api/video/watched', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        });

        if (response.ok) {
            const data = await response.json();
            videoProgressCache.videos = data;
            videoProgressCache.invalidated = false;
            return videoProgressCache.videos;
        } else {
            throw new Error('Failed to fetch watched videos');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function checkSingleVideoProgress(videoID) {
    const watchedVideos = await getWatchedVideos();
    let watchedVideoIDs = [];

    if (watchedVideos) {
        for (const video of watchedVideos) {
            watchedVideoIDs.push(video.IndexID);
        }

        if (watchedVideoIDs.includes(videoID)) return 'Abgeschlossen';
        return 'Ausstehend';
    }
    return 'Ausstehend';
}

async function getOwnedProducts() {
    if (await getToken()) {
        return fetch('https://bkbdemy.pxroute.net/api/products/owned', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + await getToken(),
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json());
    }
    return null;
}

async function updateVideoProgress(ID, points) {
    const element = jQuery('#video-progress-' + ID);
    if (!element.hasClass('Abgeschlossen')) {
        element.addClass('Abgeschlossen');
        await addBalance(points);
    }
}

function setCookie(name, value, expires) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 60 * 1000);
    const expiresUTC = date.toUTCString();
    document.cookie = `${name}=${value}; expires=${expiresUTC}; path=/`;
}

async function updateCourseProgress(updatedCourseMeta) {
    const progress = await getCourseProgress(updatedCourseMeta);
    progressBar(progress, jQuery('.progress-bar').last(), jQuery('.progress-bar-text').last());
}

function purchaseCourse(courseID, loggedIn) {
    const purchaseButton = jQuery('a[href="#kaufen"]');
    purchaseButton.on('click', function () {
        if (!loggedIn) {
            window.location.href = getHomeUrl() + '/anmeldung';
        } else {
            fetch('https://bkbdemy.pxroute.net/api/products/' + courseID + '/purchase', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + loggedIn,
                    'Content-Type': 'application/json'
                })
            })
                .then(response => {
                    response.status === 200 ? window.location.href = getHomeUrl() + '/kurse/' + courseID : animateErrorMessage();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    })
}

async function currentUserLevel() {

    const loggedIn = await getToken();
    if (loggedIn) {

        const userMeta = await getUserData();
        const points = userMeta.points;
        if (points <= 999) return 'ITA <br />' + points + '/' + 1000 + ' Punkte';
        if (points <= 2999) return '1. Ausbildungsjahr <br />' + (points - 1000) + '/' + 3000 + ' Punkte';
        if (points <= 4999) return '2. Ausbildungsjahr <br />' + (points - 3000) + '/' + 5000 + ' Punkte';
        if (points <= 9999) return '3. Ausbildungsjahr <br />' + (points - 5000) + '/' + 10000 + ' Punkte';
        if (points >= 10000) return 'Anwendungsentwickler <br />' + points + ' Punkte';

    }

}

/* Handle User Input*/
function initializeSearchFilter() {
    const checkboxes = jQuery('input[type="checkbox"]');
    const searchFilter = jQuery('.title-filter input');

    searchFilter.on('input', function () {
        const currentValue = searchFilter.val().toLowerCase().trim();
        const checkedAttributes = checkboxes.filter(':checked').map(function () {
            return jQuery(this).attr('name');
        }).get();

        const items = jQuery('.single-course');
        if (checkedAttributes.length > 0) {
            items.filter(function () {
                const $this = jQuery(this);
                const title = $this.find('h3').text().toLowerCase();
                return !checkedAttributes.some(function (attr) {
                    return $this.hasClass(attr);
                }) || title.indexOf(currentValue) === -1;
            }).addClass('hide');
            items.filter(function () {
                const $this = jQuery(this);
                const title = $this.find('h3').text().toLowerCase();
                return checkedAttributes.some(function (attr) {
                    return $this.hasClass(attr);
                }) && title.indexOf(currentValue) !== -1;
            }).removeClass('hide');
        } else {
            items.filter(function () {
                const $this = jQuery(this);
                const title = $this.find('h3').text().toLowerCase();
                return title.indexOf(currentValue) === -1;
            }).addClass('hide');
            items.filter(function () {
                const $this = jQuery(this);
                const title = $this.find('h3').text().toLowerCase();
                return title.indexOf(currentValue) !== -1;
            }).removeClass('hide');
        }
    });

    checkboxes.on('change', function () {
        const currentValue = searchFilter.val().toLowerCase().trim();
        const checkedAttributes = checkboxes.filter(':checked').map(function () {
            return jQuery(this).attr('name');
        }).get();

        const items = jQuery('.single-course');
        if (checkedAttributes.length > 0) {
            items.filter(function () {
                const $this = jQuery(this);
                const title = $this.find('h3').text().toLowerCase();
                return !checkedAttributes.some(function (attr) {
                    return $this.hasClass(attr);
                }) || title.indexOf(currentValue) === -1;
            }).addClass('hide');
            items.filter(function () {
                const $this = jQuery(this);
                const title = $this.find('h3').text().toLowerCase();
                return checkedAttributes.some(function (attr) {
                    return $this.hasClass(attr);
                }) && title.indexOf(currentValue) !== -1;
            }).removeClass('hide');
        } else {
            items.filter(function () {
                const $this = jQuery(this);
                const title = $this.find('h3').text().toLowerCase();
                return title.indexOf(currentValue) === -1;
            }).addClass('hide');
            items.filter(function () {
                const $this = jQuery(this);
                const title = $this.find('h3').text().toLowerCase();
                return title.indexOf(currentValue) !== -1;
            }).removeClass('hide');
        }
    });
}

function validateUserInput(username, password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=?!])(?=\S+$).{8,}$/;

    let errorMessage = "";

    if (username === "") {
        errorMessage += "Bitte geben Sie Ihren gewünschten Nutzernamen ein.\n";
    }
    if (!passwordRegex.test(password)) {
        errorMessage += "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Ziffer und ein Sonderzeichen enthalten.\n";
    }

    if (errorMessage !== "") {
        return errorMessage;
    } else {
        return true;
    }
}

function returnUserInputAsObject(username, password) {
    const userInput = {
        username: password.val(),
        password: username.val()
    }

    return userInput;
}

function validateUserRegistrationInput(data) {
    if (data.token === "") {
        const errorContainer = jQuery('.error-message');
        errorContainer.html("Der Benutzername ist bereits vergeben.");
        animateErrorMessage();
    } else {
        localStorage.setItem('authToken', data.token);
        window.location.href = getHomeUrl() + "/registrierung-erfolgreich";
    }
}

function validateUserLoginInput(data) {

    if (data.token === "") {
        const errorContainer = jQuery('.error-message');
        errorContainer.html("Benutzername oder Passwort ungültig!");
        animateErrorMessage();
    } else {
        localStorage.setItem('authToken', data.token);
        window.location.href = getHomeUrl() + "/dashboard";
    }
}

function processUserInput(password, username) {

    const userInput = returnUserInputAsObject(password, username);

    const validationResult = validateUserInput(userInput.username, userInput.password);
    return validationResult;
}

/*Render Functions*/
function renderAddComment(courseID) {


    const container = jQuery('.comment-container');
    const html =
        `
            <div class="container write-comment">
                <h3>Schreibe einen Kommentar</h3>
                <textarea placeholder="Dein Kommentar"></textarea>
                <div class="primary-button submit-comment">Kommentar absenden</div>
            </div>
        `
    container.append(html);

    const button = jQuery('.submit-comment');
    const textarea = jQuery('textarea');

    button.on('click', async () => {
        if (textarea.val() !== "") {
            button.addClass('disabled');
            await addComment(courseID);
        } else {
            textarea.addClass('animate');
            setTimeout(function () {
                textarea.removeClass('animate');
            }, 1000)
        }
    });
}

function renderComments(data, amount) {
    const container = jQuery('.read-comments');
    container.empty();
    let counter = 0;
    if (data.length > 0) {
        data.forEach(function (comment) {
            if (counter < amount) {
                let date = comment.CreatedAt;

                let formattedDate = new Date(date).toLocaleString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });

                formattedDate = formattedDate.replace(',', ' um');

                const html =
                    `    
                    <div class="single-comment">
                        <h3>${comment.Username}</h3>
                        <p>schrieb am ${formattedDate} Uhr</p>
                        <p>${comment.Text}</p>
                    </div>
                `
                container.append(html);
                counter++;
            }
        })
        container.addClass('flex');
    }

    const element =
        `
            <div class="show-more primary-button">mehr anzeigen</div>
        `
    if (data.length > counter) {
        container.append(element);
        const button = jQuery('.show-more');
        button.on('click', () => {
            counter += 3;
            renderComments(data, counter);
        })
    }
}

function renderNewProducts(data, slider) {
    const length = data.length;
    let counter = 0;
    data.forEach(function (course) {
        if (counter >= length - 3) {
            const content =
                `
                        <div class="single-course">
                            <h3>${course.Name}</h3>
                            <p>Schwierigkeit: ${returnDifficulty(course.Difficulty)}</p>
                            <img src="https://bkbdemy.pxroute.net${course.Image}">
                            <p class="course-excerpt">${course.Description}</p>                          
                            <a class="secondary-button" href="${getHomeUrl()}/kurse/${course.ID}">Zum Kurs</a>
                        </div>
                    `
            slider.append(content);
        }
        counter++;
    })
}

function renderMostWatchedProducts(data, slider) {
    data.forEach(function (course) {
        const content =
            `
                <div class="single-course">
                    <div class="headline-wrapper">
                        <h3>${course.Name}</h3>
                        <p>Schwierigkeit: ${returnDifficulty(course.Difficulty)}</p>
                    </div>
                    <img src="https://bkbdemy.pxroute.net${course.Image}">
                    <p class="course-excerpt">${course.Description}</p>
                    <a class="secondary-button" href="${getHomeUrl()}/kurse/${course.ID}">Zum Kurs</a>
                </div>
            `
        slider.append(content);
    });
}

async function renderOwnedProducts(products) {
    const container = jQuery('#owned-courses');
    if (container.length && products.length) {
        for (const product of products) {
            const progress = await getCourseProgress(product.Videos);
            const content = `
        <div class="single-course">
          <h3>${product.Name}</h3>
          <p class="course-difficulty">Schwierigkeit: ${returnDifficulty(product.Difficulty)}</p>
          <div class="progress-bar-container">
            <div class="progress-bar"></div>
            <span class="progress-bar-text"></span>
          </div>    
          <img src="https://bkbdemy.pxroute.net${product.Image}">
          <p class="course-excerpt">${product.Description}</p>                         
          <a class="secondary-button" href="${getHomeUrl()}/kurse/${product.ID}">Zum Kurs</a>
        </div>
      `;
            container.append(content);
            progressBar(progress, container.find('.progress-bar').last(), container.find('.progress-bar-text').last());
        }
    } else {
        container.html('Derzeit gehören dir keine Kurse.');
    }
}


function renderSingleCourseResult(data, container) {
    data.forEach(function (course) {
        const content =
            `
                        <div class="single-course difficulty-${course.Difficulty}">
                            <h3>${course.Name}</h3>
                            <p>Schwierigkeit: ${returnDifficulty(course.Difficulty)}</p>
                            <img src="https://bkbdemy.pxroute.net${course.Image}">
                            <p class="course-excerpt">${course.Description}</p>                          
                            <a class="secondary-button" href="${getHomeUrl()}/kurse/${course.ID}">Zum Kurs</a>
                        </div>
                    `
        container.append(content);
    })
}

async function renderCourse(data, products, courseID) {
    const container = jQuery('.single-course:not(#results .single-course)');
    let content = null;
    if (products && products.some(product => product.ID === courseID)) {
        currentCourse = data.Videos;
        const progress = await getCourseProgress(currentCourse);
        content =
            `
                      <div class="course-progress-wrapper">
                      <h1 class="page-headline">${data.Name}</h1>
                        <div class="content-wrapper">
                            <div class="top">   
                                <p class="course-difficulty">Schwierigkeit: ${returnDifficulty(data.Difficulty)}</p>
                               <img src="https://bkbdemy.pxroute.net${data.Image}">
                                <div class="progress-bar-container">
                                  <div class="progress-bar"></div>
                                  <span class="progress-bar-text"></span>
                                </div>            
                                <p class="shop-teaser">Weitere coole Kurse findest du hier bei uns im <a class="primary-button" href="${getHomeUrl()}/kurse">Shop</a></p>
                            </div>
                            <div class="bottom">
                                ${await renderCourseVideos(currentCourse)};
                            </div>
                        </div>
                    </div>
                     `
        setTimeout(() => {
            progressBar(progress, container.find('.progress-bar').last(), container.find('.progress-bar-text').last());
        }, 1)
        renderAddComment(courseID);
    } else {
        content = `
                    <h1 class="page-headline">${data.Name}</h1>
                    </div>     
                    <div class="content-wrapper">
                         <div class="top">
                            <video controls poster="https://bkbdemy.pxroute.net${data.Image}">
                                <source src="https://bkbdemy.pxroute.net${data.PreviewURL}" type="video/mp4">
                            </video>
                            <p class="shop-teaser">Weitere coole Kurse findest du hier bei uns im <a class="primary-button" href="${getHomeUrl()}/kurse">Shop</a></p>
                        </div>
                        <div class="bottom">
                            <h3 class="course-further-info">
                                <span class="course-price">Preis: ${data.Price} Coins</span>
                            </h3>
                            <p class="course-difficulty">Schwierigkeit: ${returnDifficulty(data.Difficulty)}</p>
                            <p class="course-excerpt">${data.Description}</p>
                            <div class="button-row">
                                <a class="secondary-button" href="#kaufen">Diesen Kurs kaufen</a>
                                <a class="primary-button" href="#zurück">Zurück</a>
                            </div>     
                        </div>
                    </div>         
                `;
    }
    container.append(content);

    const backButton = jQuery('a[href="#zurück"]');
    backButton.on('click', function () {
        window.history.back();
    })
}

async function renderCourseVideos(videos) {
    let content = '';
    let currentVideo = 1;
    let courseLength = videos.length;

    for (const video of videos) {
        const videoProgress = await checkSingleVideoProgress(video.IndexID);
        const html = `
            <div class="single-video">
                <h3><span id="video-progress-${video.IndexID}" class="${videoProgress}"></span>${video.Name} (${currentVideo} von ${courseLength})</h3>
                <p class="points">${video.Points} Punkte</p>
                <p>${video.Description}</p>
                <video id="video-${video.IndexID}" data-src="${video.Points}" controls preload="metadata" poster="https://bkbdemy.pxroute.net${video.Thumbnail}">
                    <source src="https://bkbdemy.pxroute.net/api/video/${video.IndexID}/stream">
                </video>
            </div>
        `;

        currentVideo++;
        content += html;
    }

    return content;
}


/* initiated by default when the document is ready loaded */
async function initLoadOwnedProducts() {
    const products = await getOwnedProducts();
    renderOwnedProducts(products);
}

function initCookieNotice() {
    const cookieNoticeContainer = jQuery('.cookie-notice');
    const cookieSettings = jQuery('.cookie-settings');

    cookieSettings.on('click', function () {
        cookieNoticeContainer.addClass('active');
    })

    function isCookieAccepted() {
        return document.cookie.indexOf('accept-cookie-notice=1') !== -1;
    }

    if (!isCookieAccepted()) {
        setTimeout(function () {
            cookieNoticeContainer.addClass('active');
        }, 1000);
    }

    const acceptCookies = jQuery('#accept-cookies');
    const denyCookies = jQuery('#deny-cookies');


    acceptCookies.on('click', function () {
        setCookie('accept-cookie-notice', '1', 1440);
        cookieNoticeContainer.removeClass('active');
    })

    denyCookies.on('click', function () {
        /* Usually here you will be redirected but in this Project denying = accepting is okay since its just for showcase purposes */
        setCookie('accept-cookie-notice', '1', 1440);
        cookieNoticeContainer.removeClass('active');
    })

    const navItem = jQuery('.cookie-header ul li');
    const content = jQuery('.content .single-content');

    navItem.on('click', function () {
        const item = $(this);
        const classes = item.attr('class');
        const classesArray = classes.split(' ');
        const navClass = classesArray[0];

        item.addClass('active');
        navItem.not(item).removeClass('active');
        content.removeClass('active');
        jQuery('.content .' + navClass).addClass('active');
    })
}

async function initLoadUserData() {

    if (await getToken()) {
        userMeta = await getUserData();
        const userFrontpageContainer = jQuery('.registration-teaser h3')
        const userDashboardUsernameContainer = jQuery('#my-account #username');
        const userDashboardCurrentBalanceContainer = jQuery('#current-balance');
        const userRegistrationSuccessUsernameContainer = jQuery('#registration-success-username');

        if (userFrontpageContainer.length) userFrontpageContainer.html(userMeta.username)
        if (userDashboardUsernameContainer.length) userDashboardUsernameContainer.html(userMeta.username);
        if (userRegistrationSuccessUsernameContainer.length) userRegistrationSuccessUsernameContainer.html(userMeta.username);
        if (userDashboardCurrentBalanceContainer.length) userDashboardCurrentBalanceContainer.html(userMeta.balance + ' Coins');
    }
}

async function initHandleUserContainer() {

    const loggedInContainer = jQuery('.user-logged-in');
    const loggedOutContainer = jQuery('.user-logged-out');
    await getToken() ? loggedInContainer.addClass('active') : loggedOutContainer.addClass('active');

}

function initLogout() {

    const submit = jQuery('#user-logout-button');

    submit.on('click', async function () {

        fetch('https://bkbdemy.pxroute.net/api/auth/logout', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + await getToken(),
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(data => {
                localStorage.removeItem('authToken');
                window.location.href = getHomeUrl();
            })
            .catch(error => {
                console.error('Error:', error)
            });
    });
}

function initLogin() {

    const submit = jQuery('#user-login-button');
    const passwordInput = jQuery('#user-password');
    const usernameInput = jQuery('#user-username');

    submit.on('click', function () {
        const loginInput = {
            username: usernameInput.val(),
            password: passwordInput.val()
        }

        fetch('https://bkbdemy.pxroute.net/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginInput)
        })
            .then(response => response.json())
            .then(data => {
                validateUserLoginInput(data);
            })
            .catch(error => {
                console.error('Error:', error)
            });
    });
}

function initRegistration() {

    const submit = jQuery('#user-registration-button');
    const passwordInput = jQuery('#user-reg-password');
    const usernameInput = jQuery('#user-reg-username')
    const errorContainer = jQuery('.error-message');

    submit.on('click', function () {

        if (processUserInput(passwordInput, usernameInput) === true) {
            fetch('https://bkbdemy.pxroute.net/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(returnUserInputAsObject(passwordInput, usernameInput))
            })
                .then(response => response.json())
                .then(data => {
                    validateUserRegistrationInput(data);
                })
                .catch(error => {
                    console.error('Error:', error)
                });
        } else {
            errorContainer.html(processUserInput(passwordInput, usernameInput));
            animateErrorMessage();
        }
    });
}

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
            autoplaySpeed: 10000,
            speed: 600,
            adaptiveHeight: false,
            slidesToShow: 1,
        });
    }
}

function initFrontpageSlider() {

    let container = jQuery('.frontpage-slider');

    if (container.length) {
        jQuery(container).slick({
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 300,
            adaptiveHeight: false,
            slidesToShow: 1,
        });
    }
}

function initNewsSlider() {

    let container = jQuery('.news-slider');

    if (container.length) {
        jQuery(container).slick({
            arrows: false,
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 600,
            adaptiveHeight: true,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
    }
}

function initMostWatchedSlider() {
    let container = jQuery('.most-watched-slider');

    if (container.length) {
        jQuery(container).slick({
            arrows: false,
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 600,
            adaptiveHeight: false,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }
}

function initScroll() {
    const button = jQuery('.scroll-up');
    const scrollDown = jQuery('.scroll-down')
    const teaserContent = jQuery('#teaser .wrapper');

    button.on('click', function () {
        jQuery(window).scrollTop(0);
    })

    scrollDown.on('click', function () {
        jQuery(window).scrollTop(350)
    })

    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 150) {
            button.addClass('active')
            teaserContent.addClass('active')
            scrollDown.removeClass('active')
        } else {
            button.removeClass('active');
            scrollDown.addClass('active')
            teaserContent.removeClass('active');
        }
    });
}

async function initLoadNewProducts() {
    const slider = jQuery('.course-slider');

    if (slider.length) {
        fetch('https://bkbdemy.pxroute.net/api/products')
            .then(response => response.json())
            .then(data => {
                renderNewProducts(data, slider);
            })
            .then(() => {
                initCourseSlider()
            })
            .catch(error => {
                console.error(error);
            });
    }
}

async function initLoadAllProducts() {
    const container = jQuery('.page-single-course #results');
    if (container.length) {
        fetch('https://bkbdemy.pxroute.net/api/products')
            .then(response => response.json())
            .then(data => {
                renderSingleCourseResult(data, container);
            })
            .then(() => {
                initializeSearchFilter();
            })
            .catch(error => {
                console.error(error);
            });
    }
}

async function initLoadMostWatchedProducts() {
    const slider = jQuery('.most-watched-slider');

    if (slider.length) {
        fetch('https://bkbdemy.pxroute.net/api/products')
            .then(response => response.json())
            .then(data => {
                renderMostWatchedProducts(data, slider);
            })
            .then(() => {
                initMostWatchedSlider()
            })
            .catch(error => {
                console.error(error);
            });
    }
}

async function initLoadSingleProduct() {

    const bodyClass = jQuery('body').hasClass('page-single-course');
    const URL = window.location.href;
    const courseID = parseInt(URL.split('/kurse/')[1]);
    const products = await getOwnedProducts();
    const loggedIn = await getToken();

    if (bodyClass) {
        fetch('https://bkbdemy.pxroute.net/api/products/' + courseID)
            .then(response => {
                if (response.status === 404) {
                    window.location.href = getHomeUrl() + '/404';
                } else {
                    return response.json();
                }
            })
            .then(async data => {
                await renderCourse(data, products, courseID);
                loadCourseComments();
            })
            .then(() => {
                courseVideoSlider();
            })
            .then(async () => {
                addToWatchedVideos();
                purchaseCourse(courseID, loggedIn);
            })
            .catch(error => {
                console.error(error);
            });
    }
}

function initDashboardNavigation() {
    const navItem = jQuery('.page-dashboard nav ul li');
    const contentContainers = jQuery('.dashboard-container');

    navItem.on('click', function () {
        const item = jQuery(this);
        const target = jQuery(item.attr('data-src'));

        contentContainers.removeClass('active');
        target.addClass('active');

        navItem.removeClass('active');
        item.addClass('active');
    });
}

async function initIncreaseUserBalance() {
    const button = jQuery('#increase-balance-button');
    const inputField = jQuery('input[name="userBalance"]');
    const responseContainer = jQuery('.page-dashboard .response-message p');
    const currentBalance = jQuery('.page-dashboard #current-balance');

    button.on('click', async function () {
        await addBalance(inputField.val());

        setTimeout(async () => {
            const userData = await getUserData();
            currentBalance.html(userData.balance + " Coins");
        }, 200);

        const inputValue = inputField.val();

        if (inputValue > 0) {
            responseContainer.removeClass('error').addClass('success');
            responseContainer.html(`Herzlichen Glückwunsch. Sie haben Ihren Kontostand um ${inputValue} Coins erhöht. Viel Spaß beim Ausgeben :)`);
            inputField.val(0);
        } else {
            responseContainer.removeClass('success').addClass('error');
            responseContainer.html('Bitte geben Sie einen gültigen Wert ein.');
        }

        responseContainer.addClass('animate');
        setTimeout(() => {
            responseContainer.removeClass('animate');
        }, 1000);
    });
}

async function initLoadCurrentUserLevel() {
    const container = jQuery('#user-level');
    const level = await currentUserLevel();
    if (container.length) container.html('Ihr Level: ' + level);
}

function initVisiblePassword() {
    const element = jQuery('.password-type-toggle');
    element.on('click', function () {
        const clickedElement = jQuery(this);
        const inputField = clickedElement.siblings('input');
        clickedElement.toggleClass('active');
        inputField.attr('type', inputField.attr('type') === "password" ? 'text' : 'password');
    })
}