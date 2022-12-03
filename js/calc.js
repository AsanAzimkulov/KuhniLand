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
    return dimensions[conf];
  }
}

const dimensions = {
  [formValues[formFields.configuration].straight]: [2.2, 2.8, 3.5],
  [formValues[formFields.configuration].angular]: [2.6, 3.5],
  [formValues[formFields.configuration].uShaped]: [4],
  [formValues[formFields.configuration].withIsland]: [3.5]
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
    console.log(installation)
    return materialPrices[formValues[formFields.material][material]][installation];
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

class FileNameBuilder {
  constructor(value, separator) {
    this.value = value;
    this.separator = separator;
    this.items = [];

  }


  add(value) {
    this.value = this.value + this.separator + value
    return this;
  }

  remove(value) {
    this.value = this.value.replace(value, '').replace(this.separator + this.separator, this.separator);
  }

}

function setLink(formData) {
  const downloadBtn = calculationModal.querySelector('#calc-modal-installation-button');
  const shareBtn = calculationModal.querySelector('#calc-modal-share');

  const terms = {
    base: 'grill-kuhnya',
    separator: '-',
    [formFields.configuration]: {
      [formValues[formFields.configuration].straight]: 'pryamaya',
      [formValues[formFields.configuration].angular]: 'uglovaya',
      [formValues[formFields.configuration].uShaped]: 'p-obraznaya',
      [formValues[formFields.configuration].withIsland]: 's-ostrovkov',
    },
    [formFields.installation]: {
      [formValues[formFields.installation].inside]: 'dom',
      [formValues[formFields.installation].outside]: 'ulitsa',
    },
    [formFields.material]: {
      [formValues[formFields.material].composit]: 'kompozit',
      [formValues[formFields.material].steel]: 'stal',
    },
    [formFields.dimension]: ['mini', 'midi', 'max']
  };

  const fileName = new FileNameBuilder(terms.base, terms.separator);

  function formatDimension() {
    const confDimensions = dimensions[formData.get(formFields.configuration)];
    const dimension = Number.parseFloat(formData.get(formFields.dimension).replace(',', '.'));
    let index = 0;

    if (confDimensions.length === 3) {
      index = confDimensions.indexOf(dimension);
    } else if (confDimensions.length === 2) {
      index = confDimensions.indexOf(dimension) === 0 ? 0 : 2;
    } else {
      index = 0
    }
    return terms[formFields.dimension][index];
  }

  fileName
    .add(
      terms[formFields.configuration][formData.get(formFields.configuration)]
    )
    .add(
      terms[formFields.installation][formData.get(formFields.installation)]
    )
    .add(
      terms[formFields.material][formData.get(formFields.material)]
    )
    .add(formatDimension())

  if (formData.get(formFields.material) === formValues[formFields.material].steel) {
    // If the material is steel there is no difference between the installation types

    fileName.remove(
      terms[formFields.installation][formData.get(formFields.installation)]
    )
  }


  const css = `.calc-modal__wrapper--extras {
    background: url(../../images/${fileName.value}-m.png) no-repeat;
    background-position: center;
    background-size: cover;
  }
  @supports (gap: 1px) {
    .calc-modal__wrapper--extras {
      background: url(../../images/${fileName.value}-m.webp) no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
  @media (min-width: 768px) {
    .calc-modal__wrapper--extras {
      background: url(../../images/${fileName.value}-t.png) no-repeat;
      background-position: center;
      background-size: cover;
    }
    @supports (gap: 1px) {
      .calc-modal__wrapper--extras {
        background: url(../../images/${fileName.value}-t.webp) no-repeat;
        background-position: center;
        background-size: cover;
      }
    }
  }
  @media (min-width: 1440px) {
    .calc-modal__wrapper--extras {
      background: url(../../images/${fileName.value}.png) no-repeat;
      background-position: center;
      background-size: cover;
    }
    @supports (gap: 1px) {
      .calc-modal__wrapper--extras {
        background: url(../../images/${fileName.value}.webp) no-repeat;
        background-position: center;
        background-size: cover;
      }
    }
  }`;

  const head = document.head || document.getElementsByTagName('head')[0],
    style = document.querySelector('head #calc-modal-bg-extras') || document.createElement('style');

  head.appendChild(style);

  style.type = 'text/css';
  style.id = 'calc-modal-bg-extras';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

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

  setLink(formData);
}


