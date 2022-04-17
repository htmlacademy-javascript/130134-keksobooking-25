const FILTER_DISABLE_CLASS = 'map__filters--disabled';
const FORM_DISABLE_CLASS = 'ad-form--disabled';
const filterElement = document.querySelector('.map__filters');
const formAdElement = document.querySelector('.ad-form');

const deactivateForms = () => {
  filterElement.classList.add(FILTER_DISABLE_CLASS);
  const formFilters = filterElement.children;
  Array.from(formFilters).forEach((formItem) => {
    formItem.disabled = true;
  });

  formAdElement.classList.add(FORM_DISABLE_CLASS);
  const formAdItems = formAdElement.children;
  Array.from(formAdItems).forEach((formItem) => {
    formItem.disabled = true;
  });
};

deactivateForms();
