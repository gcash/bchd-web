/*global $, document */
$(document).ready(function() {

  var debug = false;

  function closeAllPanels() {
    $('.slide-panel').slideUp(0);
    if (debug) {
      console.log('Closed all slide panels.');
    }
  }

  function getTarget($link) {
    var dataTarget = $link.data('target');
    if (dataTarget == undefined) {
      if (debug) {
        console.log('Target was blank. Checking for a parent ID.');
      }
      dataTarget = $link.parent().attr('id');
    }
    return $('#' + dataTarget);
  }

  function updateBtnText($btn) {
    if (debug) {
      console.log($btn);
    }
    var $icon = $btn.siblings('.slide-panel-expand-btn');
    if ($icon) {
      $icon.toggleClass('open');
    }
    $btn.toggleClass('open');
  }

  function togglePanel(e) {
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this);
    var $target = getTarget($this);
    $target.slideToggle(150);
    updateBtnText($this);
    if (debug) {
      console.log('Toggled slide state of ' + $target.attr('id'));
    }
  }

  $('.slide-btn').click(togglePanel);
  
  closeAllPanels();

});
