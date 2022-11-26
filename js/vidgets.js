$('.vidgets .contact__main *').hover(() => {
  $('.vidgets .contact').addClass('contact--visible');
})

$('.vidgets .calculate *').hover(() => {
  $('.vidgets .calculate').addClass('calculate--visible');
})

$('.vidgets').on('mouseleave', () => {
  $('.vidgets .contact').removeClass('contact--visible');
})

$('.vidgets .calculate').on('mouseleave',() => {
  $('.vidgets .calculate').removeClass('calculate--visible');
})