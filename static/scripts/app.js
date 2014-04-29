$(function () {
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
    slide()
  })

  // Window handler.
  var w = $(window)
  w.resize(function () {
    if (w.width() > 500) {
      // Remove the margin modification when the size is normal.
      $('#page-nav').css('margin-left', '')

      // Reset toggle if activated.
      toggle && (toggle = false)
    }
  })
})
