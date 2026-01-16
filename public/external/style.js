
$(document).ready(function(){

  $('.navbar-nav .nav-link').each(function () {
    let current_page = location.href.replace(/.$/, '');
    let nav_link = $(this).attr('href');

    if (current_page === nav_link) {
      $(this).addClass('active');
    }
  });

  $('.banner-slider').flickity({
    // options
    cellAlign: 'center',
    wrapAround: true,
    pageDots: false,
    dragThreshold: 50,
    autoPlay: 6000,
    arrowShape: {
      x0: 10,
      x1: 60, y1: 50,
      x2: 70, y2: 40,
      x3: 30
    }
  });

  $('.testimonial-slider').flickity({
    // options
    cellAlign: 'left',
    wrapAround: true,
    pageDots: true,
    prevNextButtons: false,
    dragThreshold: 50,
    adaptiveHeight: false,
    autoPlay: 6000,
    arrowShape: {
      x0: 10,
      x1: 60, y1: 50,
      x2: 70, y2: 40,
      x3: 30
    }
  });

  isScrollTop();

  window.onscroll = function() {
    isScrollTop();
  };

  $('#btnScrollTop').on("click", function(){
    $('html, body').animate({scrollTop:0}, 'slow');
  });

  $("#loading").delay(1000).fadeOut("slow");

});

function isScrollTop() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    $('#btnScrollTop').show();
    $('#header').addClass('sticky');
  } else {
    $('#btnScrollTop').hide();
    $('#header').removeClass('sticky');
  }
}