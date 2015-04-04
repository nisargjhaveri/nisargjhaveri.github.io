$(document).ready(function () {
    $('.img-slides').each(function(index, elem) {
        $(this).find('img:first').fadeIn('fast', function() {
            $(this).addClass('img-shown');
        });
    });

    window.setInterval(function() {
        $('.img-slides').each(function(index, elem) {
            $(this).find('img.img-shown').fadeOut('fast', function() {
                $this = $(this);
                $this.removeClass('img-shown');
                $next = $this.next('img');
                if ($next.length == 0) {
                    $next = $this.parent().find('img:first');
                }
                $next.fadeIn('fast', function() {
                    $(this).addClass('img-shown');
                });
            });
        });
    }, 4000);
});
