<?php get_header(); ?>

    <main>
        <div class="wrapper">
            <h1 class="page-headline">Shop</h1>

            <div id="search-filter">
                <div class="title-filter">
                    <img src="<?= get_template_uri(); ?>/assets/images/icons/icons8-suche.svg">
                    <input type="text" placeholder="Suche nach Titeln">
                </div>
                <div class="difficulty-filter">
                    <div class="dropown-title"><span>Schwierigkeit</span><img
                            src="<?= get_template_uri(); ?>/assets/images/icons/icons8-pfeil%20-ausklappen-30.png">
                    </div>
                    <div class="dropdown">
                        <div>
                            <label for="difficulty-1">Anfänger</label>
                            <input type="checkbox" name="difficulty-1">
                        </div>
                        <div>
                            <label for="difficulty-2">Fortgeschritten</label>
                            <input type="checkbox" name="difficulty-2">
                        </div>
                        <div>
                            <label for="difficulty-2">Experte</label>
                            <input type="checkbox" name="difficulty-3">
                        </div>

                    </div>
                </div>
            </div>
            <div id="results"></div>
        </div>
    </main>

<?php get_footer(); ?>