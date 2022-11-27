

function isEventInElement(event, element) {
  var rect = element.getBoundingClientRect();
  var x = event.clientX;
  if (x < rect.left || x >= rect.right) return false;
  var y = event.clientY;
  if (y < rect.top || y >= rect.bottom) return false;
  return true;
}

const vidgets = [document.querySelector('.vidgets .contact__main .vidgets__button')].concat(document.querySelector('.vidgets .calculate .vidgets__button'));


document.addEventListener('mousemove', (evt) => {
  const needOpen = vidgets.some(vidget => isEventInElement(evt, vidget));

  if (needOpen) {
    document.querySelector('.vidgets').classList.add('vidgets--hover');
  }

})

$('.vidgets').on('mouseleave', function (e)  {
  $(this).removeClass('vidgets--hover')
  console.log(2)
})


$('.vidgets .contact__main .vidgets__button').hover(() => {
  $('.vidgets .contact').addClass('contact--visible');
})

$('.vidgets .calculate .vidgets__button').hover(() => {
  $('.vidgets .calculate').addClass('calculate--visible');
})

$('.vidgets').on('mouseleave', () => {
  $('.vidgets .contact').removeClass('contact--visible');
})

$('.vidgets .calculate').on('mouseleave', () => {
  $('.vidgets .calculate').removeClass('calculate--visible');
})