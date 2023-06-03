<?php get_header(); ?>

<main>
    <div class="wrapper">
        <div class="single-course"></div>

        <div class="error-message">
            <p>
                Leider reicht Ihr Guthaben nicht auf. Begeben Sie sich bitte zu ihrem <a href="<?= get_home_url(); ?>/dashboard">Dashboard</a>
                um Ihr Guthaben aufzuladen.
            </p>
        </div>

        <div class="comment-container">
            <div class="container read-comments"></div>
        </div>

    </div>
</main>

<?php get_footer(); ?>

