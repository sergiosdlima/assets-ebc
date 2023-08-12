(function ($) {
    $('a.social-icons-link').on('click', function(ev) {
        ev.preventDefault();
        const me = $(this);
        const href = me.attr('href');
        window.open(href, 'Share', 'width=600,height=400');
    });
})(jQuery);
