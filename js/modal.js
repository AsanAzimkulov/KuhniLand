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
    onCloseModal(cb, callRequest);
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
  closeIfNeedCb();
  modalContainer.removeEventListener('click', closeIfNeedCb);
  document.body.classList.remove('no-scroll-y');
  document.documentElement.classList.remove('no-scroll-y');
}

const mainModals = document.querySelectorAll('.main-modal');

[...mainModals].forEach((modal) => {

  const mainModalBody = modal.querySelector('.main-modal__body');

  const callMainModalTriggers = document.querySelectorAll(`.call-main-modal[data-main-modal="${modal.dataset.mainModal}"]`);

  const closeMainModalIfNeed = (event) => closeModalIfClickOutside(event, () => modal.classList.remove('main-modal--opened'), mainModalBody)

  callMainModalTriggers.forEach(trigger =>
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('main-modal--opened')
      onOpenModal(closeMainModalIfNeed, modal);
    }));

  modal.querySelector('.main-modal__close').addEventListener('click', (e) => {
    modal.classList.remove('main-modal--opened');
    onCloseModal(closeMainModalCallIfNeed, modal)
  })



})
