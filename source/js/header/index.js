var nav = $('#navHeader');
var navTop = nav.outerHeight();
$(window).on('scroll',function() {
    const winTop_2 = $(window).scrollTop();
    if(winTop_2 > navTop) {
        nav.addClass('header-bg-color');
    } else {
        nav.removeClass('header-bg-color');
    }
})