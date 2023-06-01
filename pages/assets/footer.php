<footer>
    <div class="wrapper">
        <div class="footer-bar">
            <p>© <?php echo date('Y'); ?> BKBdemy</p>
            <div class="payment-options">
                <img src="<?= get_template_uri(); ?>/assets/images/icons/zahlung-versand.svg">
                <p>Alle Preise inkl. gesetzl. Mehrwertsteuer</p>
            </div>
            <?php create_nav_bar('footer', [
                [
                    'class' => '',
                    'url' => '/datenschutz',
                    'linkText' => 'Datenschutz'
                ],
                [
                    'class' => '',
                    'url' => '/impressum',
                    'linkText' => 'Impressum']
            ]); ?>
        </div>
    </div>
</footer>

</body>
</html>