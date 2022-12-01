// Call request modal
const callRequest = document.querySelector('.m-call');
const callRequestBody = callRequest.querySelector('.m-call__wrapper');


const callRequestTriggers = document.querySelectorAll('.m-call-request');

const closeModalCallIfNeed = (event) => closeModalIfClickOutside(event, () => callRequest.classList.remove('m-call--opened'), callRequestBody)



callRequestTriggers.forEach(requester =>
  requester.addEventListener('click', (e) => {
    e.preventDefault();
    callRequest.classList.add('m-call--opened');
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

// Main modal
const mainModals = document.querySelectorAll('.main-modal');

[...mainModals].forEach((modal) => {

  if (modal.querySelector('.slider') && Array.from(modal.querySelectorAll('.slider .slider__item')).length > 1) {
    setTimeout(() => new ChiefSlider(modal.querySelector('.slider')), 4000)
  }

  const mainModalBody = modal.querySelector('.main-modal__body');

  const callMainModalTriggers = document.querySelectorAll(`.call-main-modal[data-main-modal="${modal.dataset.mainModal}"]`);

  const closeMainModalIfNeed = (event) => closeModalIfClickOutside(event, () => modal.classList.remove('main-modal--opened'), mainModalBody)

  callMainModalTriggers.forEach(trigger =>
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (+modal.dataset.mainModal === 4) {
        // Review modal
        [...modal.querySelectorAll('.main-modal__text'), ...modal.querySelectorAll('.main-modal__subtitle'), ...modal.querySelectorAll('.main-modal__date')].forEach(el => el.remove());

        const content = trigger.closest('.reviews__item').querySelector('.reviews__item__modal-content');
        console.log(content)

        Array.from(content.children).forEach(contentElement => mainModalBody.append(contentElement));

      }
      modal.classList.add('main-modal--opened')
      onOpenModal(closeMainModalIfNeed, modal);
    }));

  modal.querySelector('.main-modal__close').addEventListener('click', (e) => {
    modal.classList.remove('main-modal--opened');
    onCloseModal(closeMainModalCallIfNeed, modal)
  })

})


// Calc modal

const calcModal = document.querySelector('.calc-modal');
const calcModalClose = document.querySelector('.calc-modal__close');

const calcForm = document.querySelector('.calc__form');

function empty() { }

calcForm.addEventListener('submit', (e) => {
  e.preventDefault();
  onOpenModal(empty, calcModal)
  calcModal.classList.add('calc-modal--opened');
})

calcModalClose.addEventListener('click', () => {
  onCloseModal(empty, calcModal);
  calcModal.classList.remove('calc-modal--opened')
})