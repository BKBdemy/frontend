<?php get_header(); ?>

    <main>
        <div class="wrapper user-container user-logged-in">
            <div>
                <h1 class="page-headline">Willkommen <span id="registration-success-username"></span></h1>
                <div class="registration-form">
                    <p>Herzlichen Glückwunsch.</p>
                    <p>Sie sind nun ein Teil der BKBdemy.</p>
                    <p><a class="secondary-button" href="<?= get_home_url(); ?>/dashboard">Hier</a> gehts zum Dashboard</p>
                </div>
            </div>
        </div>

        <div class="wrapper user-container user-logged-out">
            <div>
                <h1 class="page-headline">Ups. Da ist etwas schiefgelaufen.</h1>
                <div class="registration-form">
                    <p>Es tut uns leid.</p>
                    <p>Bitte versuche es erneut</p>
                    <p><a class="secondary-button" href="<?= get_home_url(); ?>/registrierung">Hier</a> gehts zur Registrierung.</p>
                </div>
            </div>
        </div>
    </main>

<?php get_footer(); ?>