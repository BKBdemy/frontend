<?php

function get_header() {
    include('./pages/assets/header.php');
}

function get_footer() {
    include('./pages/assets/footer.php');
}
function get_template_uri() {
    $doc_root = $_SERVER['DOCUMENT_ROOT'];
    $script_dir = __DIR__;
    $template_uri = str_replace($doc_root, '', $script_dir);
    $template_uri = str_replace('\\', '/', $template_uri);
    $template_uri = rtrim($template_uri, '/');
    $template_uri = str_replace('inc/functions', '', $template_uri);
    $template_uri = str_replace($doc_root, '', $template_uri);
    return 'http://' . $_SERVER['HTTP_HOST'] . $template_uri;
}

function get_home_url() {
    return '/bkbdemyxamp';
}