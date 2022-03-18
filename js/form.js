const FILTER_DISABLE_CLASS = 'map__filters--disabled';
const FORM_DISABLE_CLASS = 'ad-form--disabled';
const filterElement = document.querySelector('.map__filters');
const formAd = document.querySelector('.ad-form');

const deactivateForms = () => {
  filterElement.classList.add(FILTER_DISABLE_CLASS);
  const formFilters = filterElement.children;
  Array.from(formFilters).forEach((formItem) => {
    formItem.setAttribute('disabled', '');
  });

  formAd.classList.add(FORM_DISABLE_CLASS);
  const formAdItems = formAd.children;
  Array.from(formAdItems).forEach((formItem) => {
    formItem.setAttribute('disabled', '');
  });
};

const activateForms = () => {
  filterElement.classList.remove(FILTER_DISABLE_CLASS);
  const formFilters = filterElement.children;
  Array.from(formFilters).forEach((formItem) => {
    formItem.removeAttribute('disabled');
  });

  formAd.classList.remove(FORM_DISABLE_CLASS);
  const formAdItems = formAd.children;
  Array.from(formAdItems).forEach((formItem) => {
    formItem.removeAttribute('disabled');
  });
};

export {deactivateForms, activateForms};
