/* eslint-disable no-param-reassign */
export default (error, elements, i18n) => {
  elements.feedback.textContent = '';
  if (error) {
    elements.input.readOnly = false;
    elements.button.disabled = false;
    elements.button.innerHTML = '';
    elements.button.textContent = 'Добавить';
    elements.feedback.classList.remove('text-success');
    elements.feedback.classList.add('text-danger');
    elements.feedback.textContent = i18n.t(error);
  }
};
