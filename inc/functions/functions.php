<?php

function get_header() {
    include('./pages/assets/header.php');
}

function get_footer() {
    include('./pages/assets/footer.php');
}

function getRootDir() {
    $root = $_SERVER['DOCUMENT_ROOT'];
    $dir = dirname($_SERVER['PHP_SELF']);
    return rtrim(str_replace($root, '', $dir), '/');
}
