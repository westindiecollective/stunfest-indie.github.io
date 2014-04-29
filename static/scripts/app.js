$(function () {
  var SMALL_SIZE = 800

  var w = $(window)
  var toggle = false

  // Slide function.
  slide = function () {
    var value = toggle ? -300 : 0
    toggle = !toggle

    $('#page-nav').animate({'margin-left': value}, 150, 'linear')
  }

  // Add slide on click.
  $('#hamburger').click(function () {
    slide()
  })

  // Slide on click on a list's item.
  $('#page-nav').delegate('a', 'click', function () {
    // Do not slide on click if not on a small screen.
    // (the hamburger is only used there)
    if (w.width() <= SMALL_SIZE) {
     slide()
    }
  })

  // Window handler.
  w.resize(function () {
    if (w.width() > SMALL_SIZE) {
      // Remove the margin modification when the size is normal.
      $('#page-nav').css('margin-left', '')

      // Reset toggle if activated.
      toggle && (toggle = false)
    }
  })

  // Lightbox
  $('.card__cover a').magnificPopup({
    type:'image',
    closeOnContentClick: true
  })
})
