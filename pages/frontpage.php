<?php get_header(); ?>

<main>
    <section id="teaser">
        <div class="wrapper">
            <div class="registration-teaser">
                <h2>Registriere dich und genieße die Vorteile der BKBdemy Academy</h2>
                <p>Willkommen in der BKBdemy Academy! Hier findest du eine breite Palette an spannenden Kursen, die von erfahrenen Experten entwickelt wurden und dir dabei helfen, neue Fähigkeiten zu erlernen und dein Wissen zu erweitern. Egal, ob du dich beruflich weiterentwickeln oder einfach nur deine persönlichen Interessen vertiefen möchtest, unsere Kurse bieten dir das Wissen und die Werkzeuge, die du brauchst, um deine Ziele zu erreichen. Registriere dich jetzt und tauche ein in die Welt der BKBdemy Academy! </p>
                <a class="secondary-button" href="<?php echo get_home_url(); ?>/registrierung">Registrieren</a>
            </div>

            <div class="new-courses-teaser">
                <h1 class="course-headline section-headline">Unsere neuesten Kurse!</h1>
                <?php /* createVideoSlider('course',[
                        [
                        'name' => 'go-course-231231',
                        'description' => 'Learn GO with ease',
                        'author' => 'Marc Brockhaus',
                        'duration' => '16 Stunden',
                        'price' => '99,99€',
                        'video' => 'https://www.youtube.com/embed/YS4e4q9oBaU',
                        'excerpt' => 'Lerne GOlang in wenigen Stunden'
                        ],
                        [
                            'name' => 'java-script-10214142"',
                            'description' => 'JS Full Stack',
                            'author' => 'Timothy Roth',
                            'duration' => '11 Stunden',
                            'price' => '99,99€',
                            'video' => 'https://www.youtube.com/embed/jS4aFq5-91M',
                            'excerpt' => 'JS Fullstack im Handumdrehen'
                        ],
                        [
                            'name' => 'python-script-10214142"',
                            'description' => 'Python from 0 to hero ',
                            'author' => 'Maja Mathefrau',
                            'duration' => '322 Stunden',
                            'price' => '99,99€',
                            'video' =>'https://www.youtube.com/embed/rfscVS0vtbw',
                            'excerpt' => 'Python - Der einzige Python-Kurs den du je brauchen wirst!'
                        ]
                    ]
                ); */?>
            </div>
        </div>
    </section>
    <section id="current-most-watched">
        <div class="wrapper">
            <h1 class="section-headline">Teilnehmer sehen sich gerade an</h1>
            <?php /* createVideoSlider('most-watched',[
                    [
                        'name' => 'go-course-231231',
                        'description' => 'Learn GO with ease',
                        'author' => 'Marc Brockhaus',
                        'duration' => '16 Stunden',
                        'price' => '99,99€',
                        'video' => 'https://www.youtube.com/embed/YS4e4q9oBaU',
                        'excerpt' => 'Lerne GOlang in wenigen Stunden'
                    ],
                    [
                        'name' => 'java-script-10214142"',
                        'description' => 'JS Full Stack',
                        'author' => 'Timothy Roth',
                        'duration' => '11 Stunden',
                        'price' => '99,99€',
                        'video' => 'https://www.youtube.com/embed/jS4aFq5-91M',
                        'excerpt' => 'JS Fullstack im Handumdrehen'
                    ],
                    [
                        'name' => 'python-script-10214142"',
                        'description' => 'Python from 0 to hero ',
                        'author' => 'Maja Mathefrau',
                        'duration' => '322 Stunden',
                        'price' => '99,99€',
                        'video' =>'https://www.youtube.com/embed/rfscVS0vtbw',
                        'excerpt' => 'Python - Der einzige Python-Kurs den du je brauchen wirst!'
                    ],
                    [
                        'name' => 'go-course-231231',
                        'description' => 'Learn GO with ease',
                        'author' => 'Marc Brockhaus',
                        'duration' => '16 Stunden',
                        'price' => '99,99€',
                        'video' => 'https://www.youtube.com/embed/YS4e4q9oBaU',
                        'excerpt' => 'Lerne GOlang in wenigen Stunden'
                    ],
                    [
                        'name' => 'java-script-10214142"',
                        'description' => 'JS Full Stack',
                        'author' => 'Timothy Roth',
                        'duration' => '11 Stunden',
                        'price' => '99,99€',
                        'video' => 'https://www.youtube.com/embed/jS4aFq5-91M',
                        'excerpt' => 'JS Fullstack im Handumdrehen'
                    ],
                    [
                        'name' => 'python-script-10214142"',
                        'description' => 'Python from 0 to hero ',
                        'author' => 'Maja Mathefrau',
                        'duration' => '322 Stunden',
                        'price' => '99,99€',
                        'video' =>'https://www.youtube.com/embed/rfscVS0vtbw',
                        'excerpt' => 'Python - Der einzige Python-Kurs den du je brauchen wirst!'
                    ]
                ]
            ); */?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
