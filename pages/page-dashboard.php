<?php get_header(); ?>

    <main>
        <div class="wrapper">
            <div class="user-container user-logged-in">
                <div>
                    <h1 class="page-headline">Dashboard</h1>
                    <div class="dashboard-content-wrapper">
                        <nav>
                            <ul>
                                <li class="active" data-src="#my-account">Mein Account</li>
                                <li data-src="#my-courses">Meine Kurse</li>
                                <li data-src="#my-currency">Mein Kontostand</li>
                            </ul>
                        </nav>
                        <div class="dashboard-container content-container active" id="my-account">
                            <p>
                                Hallo <span id="username"></span>
                                <span id="user-level"></span>
                            </p>
                            <p>Willkommen in Ihrem persönlichen Dashboard. Hier können Sie Ihren Kontostand sowie Ihre
                                Kurse verwalten. </ br>
                                Viel Spaß wünscht Ihnen Ihr BKBdemy Team!
                            </p>
                        </div>
                        <div class="dashboard-container" id="my-courses">
                            <div class="further-courses">
                                <a class="secondary-button" href="<?= get_home_url(); ?>/kurse">zum Shop</a>
                            </div>
                            <div id="owned-courses"></div>
                        </div>
                        <div class="dashboard-container content-container" id="my-currency">
                            <p>
                                Ihr aktueller Kontostand beträgt <span id="current-balance"></span>
                            </p>
                            <p>Da wir Sie unglaublich gern haben, können Sie hier Ihren Kontostand erhöhen.</p>
                            <div class="increase-balance">
                                <div class="user-input">
                                    <img src="<?= get_template_uri(); ?>/assets/images/icons/icons8-muenzen-50.png">
                                    <input type="number" min="1" name="userBalance">
                                </div>
                                <img id="increase-balance-button"
                                     src="<?= get_template_uri(); ?>/assets/images/icons/icons8-hinzufuegen-50.png">
                            </div>
                            <div class="response-message">
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-container user-logged-out">
                <p id="log-in-message">
                    Bitte <a href="<?= get_home_url(); ?>/registrierung">erstellen Sie einen Account</a> oder <a
                        href="<?= get_home_url(); ?>/anmeldung">melden</a> Sie sich an.
                </p>
            </div>
        </div>
    </main>

<?php get_footer(); ?>