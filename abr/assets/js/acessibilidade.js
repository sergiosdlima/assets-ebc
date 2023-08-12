let clicks = 0;

(function($) {
    $(document).ready(function() {

        const FONT_SIZE_ADJUST = 2;

        $("a[class*='font-increase-event']").on('click', function() {
            changeFontSize($(this), FONT_SIZE_ADJUST, +1);
        });

        $("a[class*='font-decrease-event']").on('click', function() {
            changeFontSize($(this), FONT_SIZE_ADJUST*-1, -1)
        });

        $("a[class*='contrast-event']").on('click', function() {
            let html = $('html');
            html.toggleClass('contrast');
            let c = getCookie();
            c.contrast = html.hasClass('contrast');
            setCookie(c)
        });

        const FONT_SIZE_TAGS = 'a, p, h1, h2, h3, h4';
        const FONT_SIZE_CLICKS = 3;

        function changeFontSize(element, size_adjust, clicks_adjust) {
            if ((clicks + clicks_adjust) >= 0 && (clicks + clicks_adjust) <= FONT_SIZE_CLICKS) {
                $('body').find(FONT_SIZE_TAGS).each(function() {
                    $(this).css('font-size', parseInt($(this).css('font-size').replace('px', '')) + size_adjust);
                });
                clicks += clicks_adjust;
                let c = getCookie();
                c.clicks = clicks;
                setCookie(c);
            }
        }

        const COOKIE_NAME = 'agenciabrasil';
        const COOKIE_DAYS = 1;

        function setCookie(value) {
            let d = new Date();
            d.setTime(d.getTime() + (COOKIE_DAYS * 24 * 60 * 60 * 1000));
            let expires = '; expires=' + d.toUTCString();
            document.cookie = COOKIE_NAME + '=' + JSON.stringify(value) + expires + '; path=/';
        }

        function getCookie() {
            let nameEQ = COOKIE_NAME + '=';
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
            }
            return null;
        }

        let c = getCookie();

        if (c != null) {
            changeFontSize($(this), c.clicks * FONT_SIZE_ADJUST, c.clicks);
            if (c.contrast == true) {
                $('html').addClass('contrast');
            }
        } else {
            setCookie({clicks: 0, contrast: false});
        }
    });
})(jQuery);
