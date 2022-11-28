const callRequest = document.querySelector('.m-call');
const callRequestBody = callRequest.querySelector('.m-call__wrapper');


const callRequestTriggers = document.querySelectorAll('.m-call-request');

const closeModalCallIfNeed = (event) => closeModalIfClickOutside(event, () => callRequest.classList.remove('m-call--opened'), callRequestBody)


callRequestTriggers.forEach(requester =>
  requester.addEventListener('click', (e) => {
    e.preventDefault();
    callRequest.classList.add('m-call--opened')
    onOpenModal(closeModalCallIfNeed, callRequest);
  }));



function closeModalIfClickOutside(e, cb, modalBody) {
  let path = e.path || (e.composedPath && e.composedPath());

  if (!path.some(el => el === modalBody)) {
    onCloseModal(closeModalCallIfNeed, callRequest);
    cb();
  }
}

function onOpenModal(closeIfNeedCb, modalContainer) {
  modalContainer.addEventListener('click', closeIfNeedCb);

  document.body.classList.add('no-scroll-y');
  document.documentElement.classList.add('no-scroll-y');
}

document.querySelector('.m-call__close').addEventListener('click', (e) => {
  callRequest.classList.remove('m-call--opened');
  onCloseModal(closeModalCallIfNeed, callRequest)
})

function onCloseModal(closeIfNeedCb, modalContainer) {
  modalContainer.removeEventListener('click', closeIfNeedCb);
  document.body.classList.remove('no-scroll-y');
  document.documentElement.classList.remove('no-scroll-y');
}