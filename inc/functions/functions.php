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

function createVideoSlider($class,$courseData) {
    ob_start(); ?>

    <div class="<?php echo $class; ?>-slider">
        <?php foreach ($courseData as $course): ?>
            <div class="single-course">
                <h3><?php echo $course['description'];?></h3>
                <p class="course-further-info">
                    <span class="course-author-name">Tutor: <?php echo $course['author']; ?></span>
                    <span class="course-duration">Dauer: <?php echo $course['duration']; ?></span>
                    <span class="course-price">Preis: <?php echo $course['price']; ?></span>
                </p>
                <video>
                    <source src="<?php echo $course['video']; ?>" type="video/mp4">
                </video>
                <p class="course-excerpt"><?php echo $course['excerpt'];?></p>
                <a class="secondary-button" href="<?php echo get_home_url() ?>/kurse/<?php echo $course['name'] ?>">Zum Kurs</a>
            </div>
        <?php endforeach; ?>
    </div>

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

    $protocol = 'http://';
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') {
        $protocol = 'https://';
    }

    $template_uri = $protocol . $_SERVER['HTTP_HOST'] . $template_uri;

    return $template_uri;
}

function get_home_url() {

    $template_uri = str_replace($_SERVER['DOCUMENT_ROOT'], '', realpath(dirname(__FILE__)));
    $template_uri = str_replace('\\', '/', $template_uri);
    $template_uri = rtrim($template_uri, '/');
    $template_uri = str_replace('inc/functions', '', $template_uri);
    $template_uri = rtrim($template_uri, '/');
    $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https://" : "http://";
    $domain = $_SERVER['HTTP_HOST'];
    return $protocol . $domain . $template_uri;

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

    if (strpos($bodyClass, 'kurse') !== false) {
        return 'single page-single-course';
    }

    return 'page-' . $bodyClass;

}

function get_basepath() {

    $basePath = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    if ($basePath == '/' || $basePath == '\\') {
        $basePath = '';
    }
    return $basePath;

}
