/*global document, $, ClipboardJS */
$(document).ready(function() {
  
  var debug = false;

  /* For copying BCH addess to clipboard */
  function initializeClipboard(selector) {
    var clipboard = new ClipboardJS(selector);
    var successClass = selector.replace(/^\./, "") + '-success';
    clipboard.on('success', function(e) {
      $(selector).addClass(successClass);
      setTimeout(function() {
        $(selector).removeClass(successClass);
      },1000);
    });
    clipboard.on('error', function(e) {
      if (debug) {
        console.log(e);
      }
    });
  }
  initializeClipboard('.donate-btn');

});
