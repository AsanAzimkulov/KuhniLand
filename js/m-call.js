const forms = document.querySelectorAll('.m-call__form');

function onCallRequest(e) {
  e.preventDefault();
  document.body.classList.add('call-requested');
}

forms.forEach(form => form.addEventListener('submit', onCallRequest));