$(function () {
  var toggle = false

  slide = function () {
    var value = toggle ? -300 : 0
    toggle = !toggle

    $('#page-nav').animate({'margin-left': value}, 150, 'linear')
  }

  $('#hamburger').click(function () {
    slide()
  })

  $('#page-nav').delegate('a', 'click', function () {
    slide()
  })
})
