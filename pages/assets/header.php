<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BKBdemy</title>
    <script src="<?php echo get_template_uri() ?>/dist/main.min.js"></script>
    <link rel="stylesheet" href="<?php echo get_template_uri(); ?>dist/main.min.css">
<!--    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">-->
    <link rel="icon" type="image/x-icon" href="<?php echo get_template_uri(); ?>/assets/images/icons/favicon.svg">
</head>
<body class="<?php echo get_body_class(); ?>">

<div class="scroll-up">
    <img src="<?php echo get_template_uri(); ?>/assets/images/icons/scroll-top-arrow.svg">
</div>

<?php if (get_body_class() === 'home'): ?>
    <div class="scroll-down active">
        <img src="<?php echo get_template_uri(); ?>/assets/images/icons/scroll-top-arrow.svg">
    </div>
<?php endif; ?>

<div class="scroll-up">
    <img src="<?php echo get_template_uri(); ?>/assets/images/icons/scroll-top-arrow.svg">
</div>
<div class="cookie-notice">
    <div class="cookie-header">
        <ul>
            <li class="acceptance active">Zustimmung</li>
            <li class="details">Details</li>
            <li class="about">Über Cookies</li>
        </ul>
    </div>
    <div class="content">
        <div class="single-content acceptance active">
            <p>Diese Webseite verwendet Cookies, um Ihre Benutzererfahrung zu verbessern und personalisierte Inhalte
                anzuzeigen.</p>
            <a href="/datenschutz">Mehr erfahren</a>
        </div>
        <div class="single-content details">
            <p>Die folgenden Cookies sind auf dieser Website erforderlich:</p>
            <ul>
                <li>Authentifizierungs-Cookies</li>
                <li>Sicherheits-Cookies</li>
            </ul>
            <p>Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie auf den entsprechenden Link in der
                Fußzeile klicken.</p>
        </div>
        <div class="single-content about">
            <p>Ein Cookie ist eine kleine Textdatei, die von einer Website auf Ihrem Computer oder Mobilgerät
                gespeichert wird. Cookies werden zur Speicherung von Informationen verwendet, um die Benutzererfahrung
                zu verbessern und bestimmte Funktionen bereitzustellen.</p>
        </div>
    </div>
    <div class="cookie-footer">
        <div id="accept-cookies" class="primary-button">Alle akzeptieren</div>
        <div id="deny-cookies" class="secondary-button">Ablehnen</div>
    </div>
</div>
<header>
    <div class="info">
        <div class="wrapper">
            <div class="info-item mail">
                <a href="mailto:info@bkbdemy.de"><img
                            src="<?= get_template_uri(); ?>/assets/images/icons/mail-white.svg"><span>info@bkbdemy.de</span></a>
            </div>
            <div class="info-item phone">
                <img src="<?= get_template_uri(); ?>/assets/images/icons/phone-white.svg"><span> Telefonische Unterstützung und Beratung unter: <a
                            href="tel:0251-123456">0251-123456</a></span>
            </div>
            <div class="info-item opening-times">Mo-Fr, 08.00 bis 18.00Uhr</div>
        </div>
    </div>
    <div class="wrapper">
        <nav>
            <a class="nav-item home-logo" href="<?php echo get_home_url(); ?>">
                <img src="<?php echo get_template_uri(); ?>/assets/images/logo/logo.png">
            </a>

            <div class="burger-menu">
                <div class="stripe stripe-top"></div>
                <div class="stripe stripe-mid"></div>
                <div class="stripe stripe-bottom"></div>
            </div>

            <div class="nav-bar desktop">

                <div class="user-logged-out user-container">
                    <?php create_nav_bar('desktop', [
                        [
                            'class' => 'cookie-settings',
                            'url' => '',
                            'linkText' => 'Cookie Einstellungen'
                        ],
                        [
                            'class' => 'primary-button shop-button',
                            'url' => '/kurse',
                            'linkText' => 'Shop'
                        ],
                        [
                            'class' => 'primary-button',
                            'url' => '/anmeldung',
                            'linkText' => 'Anmelden'
                        ],
                        [
                            'class' => 'secondary-button',
                            'url' => '/registrierung',
                            'linkText' => 'Registrieren']
                    ]); ?>
                </div>

                <div class="user-logged-in user-container">
                    <?php create_nav_bar('desktop', [
                        [
                            'class' => 'cookie-settings',
                            'url' => '',
                            'linkText' => 'Cookie Einstellungen'
                        ],
                        [
                            'class' => 'primary-button shop-button',
                            'url' => '/kurse',
                            'linkText' => 'Shop'
                        ],
                        [
                            'class' => 'primary-button',
                            'url' => '/dashboard',
                            'linkText' => 'Dashboard'
                        ],
                        [
                            'class' => 'secondary-button',
                            'url' => '/abmeldung',
                            'linkText' => 'Abmelden']
                    ]); ?>
                </div>

            </div>


            <div class="nav-bar mobile">
                <div class="user-logged-out user-container">
                    <?php create_nav_bar('mobile', [
                        [
                            'class' => 'mobile-button',
                            'url' => '/anmeldung',
                            'linkText' => 'Anmelden'
                        ],
                        [
                            'class' => 'mobile-button',
                            'url' => '/registrierung',
                            'linkText' => 'Registrieren'],
                        [
                            'class' => 'mobile-button',
                            'url' => '/kurse',
                            'linkText' => 'Shop'
                        ],
                        [
                            'class' => 'cookie-settings',
                            'url' => '#cookie-settings',
                            'linkText' => 'Cookie Einstellungen'
                        ]
                    ]); ?>
                </div>
                <div class="user-logged-in user-container">
                    <?php create_nav_bar('mobile', [
                        [
                            'class' => 'mobile-button',
                            'url' => '/dashboard',
                            'linkText' => 'Dashboard'
                        ],
                        [
                            'class' => 'mobile-button',
                            'url' => '/abmeldung',
                            'linkText' => 'Abmelden'],
                        [
                            'class' => 'mobile-button',
                            'url' => '/kurse',
                            'linkText' => 'Shop'
                        ],
                        [
                            'class' => 'cookie-settings',
                            'url' => '#cookie-settings',
                            'linkText' => 'Cookie Einstellungen'
                        ]
                    ]); ?>
                </div>
                <div class="info-mobile">
                    <div class="wrapper">
                        <div class="info-item mail">
                            <a href="mailto:info@bkbdemy.de"><img
                                        src="<?= get_template_uri(); ?>/assets/images/icons/mail-white.svg"><span>info@bkbdemy.de</span></a>
                        </div>
                        <div class="info-item phone">
                            <img src="<?= get_template_uri(); ?>/assets/images/icons/phone-white.svg"><span> Telefonische Unterstützung und Beratung unter: <a
                                        href="tel:0251-123456">0251-123456</a></span>
                        </div>
                        <div class="info-item opening-times">Mo-Fr, 08.00 bis 18.00Uhr</div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</header>
