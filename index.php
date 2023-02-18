<?php

include('./functions.php');
include('./inc/classes/route.php');

define('BASEPATH', '/bkbdemyxamp');

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

Route::pathNotFound(function($path) {
    include('./pages/404.php');
});

Route::run(BASEPATH);
exit;
