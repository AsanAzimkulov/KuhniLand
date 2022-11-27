// Stages

if ($('.stages .slider__item').length > 1) {
  new ChiefSlider('.stages .slider')
}

$('.stages__top li').on('click', function (e) {
  e.preventDefault();
  if (!$(this).hasClass('stages__top__item--active') && !$(this).hasClass('stages__top__item--dec')) {
    $('.stages__top__item').removeClass('stages__top__item--active');
    $(this).addClass('stages__top__item--active');
    $(this).parents('.stages').find('.slider__indicators li').eq($('.stages__top .stages__top__item').index(this)).click();
  }
});

$('.stages .slider').on('transition-start', function (e) {
  $('.stages__top li').removeClass('stages__top__item--active');
  $('.stages__top li.stages__top__item').eq($('.stages .slider__indicators li.active').attr('data-slide-to')).addClass('stages__top__item--active');
});