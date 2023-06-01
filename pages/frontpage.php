<?php get_header(); ?>

<main>

    <section id="frontpage-slider">
        <?php
            /* including the content for the frontage image slider*/
            include_once('content/frontpage-slider-content.php'); ?>
    </section>

    <section id="teaser">
        <?php
            /* including the content for the frontage teaser content*/
            include_once('content/teaser-content.php'); ?>
    </section>

    <section id="shop-teaser">
        <?php
            /* including the content for the shop teaser content*/
            include_once('content/shop-teaser-content.php'); ?>
    </section>

    <section id="current-most-watched">
        <?php
            /* including the content for the current most watched content*/
            include_once('content/current-most-watched-content.php'); ?>
    </section>

    <section id="news">
        <?php
            /* including content for the news content*/
            include_once('content/news-content.php'); ?>
    </section>

</main>

<?php get_footer(); ?>
