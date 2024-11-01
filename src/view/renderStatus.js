/* eslint-disable no-param-reassign */
export default (processState, elements, i18n) => {
  switch (processState) {
    case 'filling':
      elements.input.readOnly = false;
      elements.button.disabled = false;
      break;
    case 'processing':
      elements.input.readOnly = true;
      elements.button.disabled = true;
      break;
    case 'success':
      elements.input.readOnly = false;
      elements.button.disabled = false;
      elements.button.innerHTML = '';
      elements.button.textContent = 'Добавить';
      elements.form.reset();
      elements.form.focus();
      elements.feedback.classList.replace('text-danger', 'text-success');
      elements.feedback.textContent = i18n.t('form.success');
      break;
    default:
      throw new Error(`Unknown processState: ${processState}`);
  }
};
