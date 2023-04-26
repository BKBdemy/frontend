<footer>
    <div class="wrapper">
        <div class="footer-bar">
            <p>© <?php echo date('Y'); ?> BKBdemy</p>

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