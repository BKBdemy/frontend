<?php

include('./functions.php');

Route::add('/',function(){
    include('./pages/frontpage.php');
});

Route::add('/anmeldung', function() {
    include('./pages/page-login.php');
});

Route::add('/registrierung', function() {
    include('./pages/page-register.php');
});

Route::add('/datenschutz', function() {
    include('./pages/page-datenschutz.php');
});

Route::add('/impressum', function() {
    include('./pages/page-impressum.php');
});

Route::add('/kurse/.*$', function() {
    include('./pages/page-single-course.php');
});

Route::pathNotFound(function($path) {
    include('./pages/404.php');
});


if($_SERVER['REQUEST_URI'] === '/bkbdemy/impressum')  include('./pages/page-impressum.php');

Route::run(get_basepath());
exit;
