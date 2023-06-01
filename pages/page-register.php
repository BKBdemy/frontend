<?php get_header(); ?>

    <main>
        <div class="wrapper">
            <h1 class="page-headline">Registrierung</h1>
            <div class="registration-form form content-container">
                <p>Melde dich jetzt an und genieße BKBdemy in vollem Umfang.</p>
                <p>Ihr Passwort:</p>
                <ul>
                    <li>Muss mindestens 8 Zeichen lang sein</li>
                    <li>Muss mindestens einen Großbuchstaben enthalten [A-Z]</li>
                    <li>Muss mindestens einen Kleinbuchstaben enthalten [a-z]</li>
                    <li>Muss mindestens eine Zahl enthalten [1,2,3,4,5,6,7,8,9,0]</li>
                    <li>Muss mindestens ein Sonderzeichen enthalten [@,#,$,%,^,&,+,=,?,!]</li>
                    <li>Darf keine Leerzeichen enthalten</li>
                </ul>
                <input id="user-reg-username" type="text" name="username" placeholder="Benutzername">
                <div class="password-wrapper">
                    <input id="user-reg-password" type="password" name="password" placeholder="Passwort">
                    <span class="password-type-toggle"></span>
                </div>
                <div class="secondary-button" id="user-registration-button" type="submit">Registrieren</div>
            </div>
            <p class="error-message"></p>
        </div>
    </main>

<?php get_footer(); ?>