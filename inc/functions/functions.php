<?php

function get_header() {

    include('./pages/assets/header.php');
}

function get_footer() {

    include('./pages/assets/footer.php');

}

function create_nav_bar($menuPosition, $links) {

    ob_start(); ?>

    <ul class="menu-<?php echo $menuPosition ?>">
        <?php foreach ($links as $link): ?>
            <li>
                <a class="<?php echo $link['class']; ?>" href="<?php echo get_home_url() . $link['url']; ?>">
                    <?php echo $link['linkText']; ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>

    <?php echo ob_get_clean();
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

    $doc_root = $_SERVER['DOCUMENT_ROOT'];
    $script_dir = __DIR__;
    $template_uri = str_replace($doc_root, '', $script_dir);
    $template_uri = str_replace('\\', '/', $template_uri);
    $template_uri = rtrim($template_uri, '/');
    $template_uri = str_replace('inc/functions', '', $template_uri);
    $template_uri = str_replace($doc_root, '', $template_uri);
    $template_uri = rtrim($template_uri, '/');
    return $template_uri;

}

function get_body_class() {

    $doc_root = $_SERVER['DOCUMENT_ROOT'];
    $script_dir = __DIR__;
    $template_uri = str_replace($doc_root, '', $script_dir);
    $template_uri = str_replace('\\', '/', $template_uri);
    $template_uri = rtrim($template_uri, '/');
    $template_uri = str_replace('inc/functions', '', $template_uri);
    $template_uri = str_replace($doc_root, '', $template_uri);
    $template_uri = str_replace('/', '', $template_uri);
    $bodyClass = $_SERVER['REQUEST_URI'];
    $bodyClass = str_replace('/', '', $bodyClass);
    $bodyClass = str_replace($template_uri, '', $bodyClass);

    if($bodyClass === "") return 'home';

    return 'page-' . $bodyClass;

}

function get_basepath() {

    $basePath = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    if ($basePath == '/' || $basePath == '\\') {
        $basePath = '';
    }
    return $basePath;

}
