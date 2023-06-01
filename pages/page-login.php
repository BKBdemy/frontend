<?php get_header(); ?>

    <main>
        <div class="wrapper">
            <h1 class="page-headline">Anmeldeformular</h1>
            <div class="login-form form content-container">
                <p>Geben Sie Ihre Anmeldedaten ein</p>
                <input id="user-username" type="text" name="username" placeholder="Benutzername">
                <div class="password-wrapper">
                    <input id="user-password" type="password" name="password" placeholder="Passwort">
                    <span class="password-type-toggle"></span>
                </div>
                <div class="secondary-button" id="user-login-button" type="submit">Anmelden</div>
                <div class="no-account-yet">
                    <p>Noch keinen Account? <a href="<?= get_home_url() ?>/registrierung">Registriere</a> dich jetzt!</p>
                </div>
            </div>
            <div class="error-message"></div>
        </div>
    </main>

<?php get_footer(); ?>