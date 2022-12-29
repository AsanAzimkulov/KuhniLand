$('a[href="#"]').on('click', (e) => e.preventDefault())

const player = new Plyr('#player');


if (new Date().getTime() - window.localStorage.getItem('isCallRequested') <= 5000) {
  document.body.classList.add('call-requested');
  setTimeout(document.querySelector('.m-call-request').click(), 1500)

}