<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BKBdemy</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <script src="<?php echo get_template_uri() ?>/dist/main.min.js"></script>
    <link rel="stylesheet" href="<?php echo get_template_uri(); ?>/dist/main.min.css">
</head>
<body class="<?php echo get_body_class(); ?>">

<header>
    <div class="wrapper">
        <nav>
            <a class="nav-item home-logo" href="<?php echo get_home_url(); ?>">
                <img src="<?php echo get_template_uri(); ?>/assets/images/logo/logo.svg">
            </a>

            <div class="burger-menu">
                <div class="stripe stripe-top"></div>
                <div class="stripe stripe-mid"></div>
                <div class="stripe stripe-bottom"></div>
            </div>

            <div class="nav-bar desktop">
                <?php get_nav_bar(); ?>
            </div>

            <div class="nav-bar mobile">
                <?php get_nav_bar(); ?>
            </div>
        </nav>
    </div>
</header>
