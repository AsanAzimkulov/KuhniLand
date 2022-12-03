const form = document.querySelector('.calc__form');



const formFields = {
  material: 'Материал фасада',
  installation: 'Тип размещения',
  dimension: 'Размер',
  configuration: 'Конфигурация'
}

const formValues = {
  [formFields.material]: {
    steel: 'нержавеющая сталь',
    composit: 'композит',
  },
  [formFields.configuration]: {
    straight: 'Прямая',
    angular: 'Угловая',
    uShaped: 'П-образная',
    withIsland: 'С островком'
  },
  [formFields.installation]: {
    inside: 'закрытая терраса',
    outside: 'открытая терраса'
  },
  [formFields.dimension](conf) {
    const dimension = {
      [this[formFields.configuration].straight]: [2.2, 2.8, 3.5],
      [this[formFields.configuration].angular]: [2.6, 3.5],
      [this[formFields.configuration].uShaped]: [4],
      [this[formFields.configuration].withIsland]: [3.5]
    }

    return dimension[conf];

  }
}

function getChecked(field) {
  const fieldInputsWrappers = Array.from(form.querySelectorAll(`input[name='${field}']`));
  return fieldInputsWrappers.find(input => input.checked);
}


// Inputs listeners

const confInputs = Array.from(form.querySelectorAll(`input[name='${formFields.configuration}']`));

const dimensionInputs = Array.from(form.querySelectorAll(`input[name='${formFields.dimension}']`));

const dimensionInputsWrappers = dimensionInputs.map(x => x.closest('.calc__input'));


confInputs.forEach(confInput => confInput.addEventListener('click', (e) => {
  const activeConfButton = confInputs.find((btn) => btn.checked);

  const dimensions = formValues[formFields.dimension](activeConfButton.value);


  dimensionInputs.forEach((input, index) => {

    if (!dimensions.some(dimension => dimension === Number.parseFloat(input.value))) {
      dimensionInputsWrappers[index].classList.add('calc__input--off');
    } else {
      dimensionInputsWrappers[index].classList.remove('calc__input--off');
    }
  });

  const firstVisibleInputWrapper = dimensionInputsWrappers.find(input => !input.classList.contains('calc__input--off'));

  firstVisibleInputWrapper.querySelector('input').checked = true;

}));


// Main function

const materialPrices = {
  [formValues[formFields.material].steel]: 200000,
  [formValues[formFields.material].composit]: {
    [formValues[formFields.installation].inside]: 275000,
    [formValues[formFields.installation].outside]: 350000,
  }
}

function getPricePerMeter(formData) {
  const material = formData.get(formFields.material) === formValues[formFields.material].steel ? 'steel' : 'composit'

  if (material === 'composit') {
    const installation = formData.get(formFields.installation);
    return materialPrices[formValues[formFields.material][material][installation]];
  }

  return materialPrices[formValues[formFields.material][material]]
}

function formatByThousands(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

function roundToNearestThousand(value) {
  return Math.round(value / 1000) * 1000;
}

function formatConfiguration(conf) {
  if (conf === formValues[formFields.configuration].uShaped) {
    return conf;
  }

  return conf.toLowerCase();
}

function formatMaterial(material) {
  if (material === formValues[formFields.material].steel) {
    return 'нержавеющая сталь';
  }
  return 'композитный HPL';
}

function formatKitchenName(material) {
  if (material === formValues[formFields.material].steel) {
    return 'нержавеющей стали';
  }
  return 'композитного материала';
}

form.addEventListener('submit', onCalc);

const calculationModal = document.querySelector('.calc-modal');

function onCalc(e) {
  const formData = new FormData(form);

  const dimension = calculationModal.querySelector('#calc-modal-dimension');
  dimension.textContent = formData.get(formFields.dimension);

  const pricePerMeter = calculationModal.querySelector('#calc-modal-price-pm');
  pricePerMeter.textContent = formatByThousands(getPricePerMeter(formData));

  const total = calculationModal.querySelector('#calc-modal-total');
  total.textContent = formatByThousands(roundToNearestThousand(
    getPricePerMeter(formData) * Number.parseFloat(formData.get(formFields.dimension).replace(',', '.'))
  ));

  const configuration = calculationModal.querySelector('#calc-modal-configuration');
  configuration.textContent = formatConfiguration(formData.get(formFields.configuration));

  const material = calculationModal.querySelector('#calc-modal-material');
  material.textContent = formatMaterial(formData.get(formFields.material));

  const name = calculationModal.querySelector('#calc-modal-name');
  name.textContent = formatKitchenName(formData.get(formFields.material));

  const installation = calculationModal.querySelector('#calc-modal-installation');
  installation.textContent = formData.get(formFields.installation);
}


