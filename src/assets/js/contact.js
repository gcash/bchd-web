/* Reads parameters from the URL by name */
var getUrlParameter = function getUrlParameter(param) {
  var pageURL = window.location.search.substring(1),
      urlVariables = pageURL.split('&'),
      parameterName,
      i;
  for (i = 0; i < urlVariables.length; i++) {
    parameterName = urlVariables[i].split('=');
    if (parameterName[0] === param) {
      return parameterName[1] === undefined ? true : decodeURIComponent(parameterName[1]);
    }
  }
};


/* Write the UTM Source to the contact form */
var utmSource = 'none';
if (getUrlParameter('utm_source')) {
  utmSource = getUrlParameter('utm_source');
}
var $utmSourceField = $("<input type='hidden' name='utm_source' value='" + utmSource + "'>");
$("form").first().prepend($utmSourceField);


/* Process the form submission via ajax */
$(document).ready(function() {
  var $form = $('#contact-form');
  var $formMessages = $('#form-messages');
  
  $form.submit(function(e) {
    e.preventDefault();
    var formData = $form.serialize();

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: formData,
      crossOrigin: true
    })
      .done(function(response) {
      $formMessages.removeClass('error');
      $formMessages.addClass('success');
      $formMessages.text('Thank you, your message has been sent and you will receive a reply shortly.');
      $('.contact-input').val('');
    })
      .fail(function(data) {
      $formMessages.removeClass('success');
      $formMessages.addClass('error');
      $formMessages.text('There was an error processing your request. Please try again or contact us directly at info@ this domain.');
    });
  });
});


/* Process the modal form submission via ajax */
$(document).ready(function() {
  var $form = $('#modal-form');
  var $formMessages = $('#modal-messages');

  $form.submit(function(e) {
    e.preventDefault();
    var formData = $form.serialize();

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: formData,
      crossOrigin: true
    })
      .done(function(response) {
      $formMessages.removeClass('error');
      $formMessages.addClass('success');
      $formMessages.text('Thank you, your message has been sent and you will receive a reply shortly.');
      $('.contact-input').val('');
      $('#modal-complete').show();
      $('#modal-btn').hide();
    })
      .fail(function(data) {
      $formMessages.removeClass('success');
      $formMessages.addClass('error');
      $formMessages.text('There was an error processing your request. Please try again or contact us directly at info@ this domain.');
    });
  });
});
