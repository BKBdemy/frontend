<?php

include('./functions.php');

Route::add('/',function(){
    include('./pages/frontpage.php');
});

Route::add('/anmeldung', function() {
    include('./pages/page-login.php');
});

Route::add('/abmeldung', function() {
    include('./pages/page-logout.php');
});

Route::add('/dashboard', function() {
    include('./pages/page-dashboard.php');
});

Route::add('/registrierung', function() {
    include('./pages/page-register.php');
});

Route::add('/registrierung-erfolgreich', function() {
    include('./pages/page-registration-success.php');
});

Route::add('/datenschutz', function() {
    include('./pages/page-datenschutz.php');
});

Route::add('/impressum', function() {
    include('./pages/page-impressum.php');
});

Route::add('/kurse', function() {
    include('./pages/page-courses.php');
});

Route::add('/kurse/.*$', function() {
    include('./pages/page-single-course.php');
});

Route::pathNotFound(function($path) {
    include('./pages/404.php');
});

Route::run(get_basepath());
exit;
