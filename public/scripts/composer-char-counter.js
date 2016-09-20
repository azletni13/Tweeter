$(document).ready(function() {
  var $textarea = $('#tweet');
  var $counter = $('.counter');

  $textarea.on('keyup', (e)=> {
    const letter_count = $textarea.val().length;
    var counterLength = $counter.text(140 - letter_count);
    console.log(letter_count);
    //Changes color to red by adding redText class
    //when number goes below 0
    if ($counter.text() < 0 ) {
      $counter.addClass('redText');
    } else {
      $counter.removeClass('redText');
    }
  });


});
