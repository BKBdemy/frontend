<?php

$url = str_replace('/bkbdemyxamp', '', $_SERVER['REQUEST_URI']);

$routes = array(
    '/' => 'frontpage.php',
    '/about' => 'about.php',
    '/contact' => 'contact.php',
    '/login' => 'page-login.php'
);

if (array_key_exists($url, $routes)) {
    include('./pages/' . $routes[$url]);
} else {
    include('./pages/error-404.php');
}