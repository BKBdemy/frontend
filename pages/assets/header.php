<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BKBdemy</title>
    <script src="<?php echo get_template_uri() ?>/dist/main.min.js"></script>
    <link rel="stylesheet" href="<?php echo get_template_uri(); ?>/dist/main.min.css">
</head>
<body>
<header>
    <div class="wrapper">
        <nav>
            <a class="nav-item home-logo" href="<?php echo get_home_url(); ?>">
                <img src="<?php echo get_template_uri(); ?>/assets/images/logo/logo.svg">
                <p>BKBDEMY</p>
            </a>

            <div class="nav-bar">
                <ul>
                    <li>
                        <a href="<?php echo get_home_url(); ?>/anmeldung">
                            Anmelden
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo get_home_url(); ?>/registrierung">
                            Registrieren
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</header>
