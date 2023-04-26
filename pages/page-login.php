<?php get_header(); ?>

<main>
    <div class="wrapper">
        <h1 class="page-headline">Anmeldeformular</h1>
        <form method="get" action="<?php echo get_home_url(); ?>/anmeldung">
            <label for="inputfeld">Inputfeld</label>
            <input name="inputfeld" type="text">
            <label for="inputfeld">Inputfeld</label>
            <input name="inputfeld" type="text">
            <label for="inputfeld">Inputfeld</label>
            <input name="inputfeld" type="text">
            <label for="inputfeld">Inputfeld</label>
            <input name="inputfeld" type="text">
            <label for="inputfeld">Inputfeld</label>
            <input name="inputfeld" type="text">
            <input type="submit" value="senden">
        </form>
    </div>
</main>

<?php get_footer(); ?>