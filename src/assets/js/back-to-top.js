/*global document, $, Clipboard */
$(document).ready(function() {

  var offset = 220;
  var duration = 500;

  $(window).scroll(function() {
    if ($(this).scrollTop() > offset) {
      $('.backToTop').fadeIn(duration);
    } else {
      $('.backToTop').fadeOut(duration);
    }
  });

  $('.backToTop').click(function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, duration);
    return false;
  });
  
});
