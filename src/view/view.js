import onChange from 'on-change';

export default () => {
  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    button: document.querySelector('button[type="submit'),
    feedback: document.querySelector('.feedback'),
  };
  const initialState = {
    rssForm: {
      state: 'filling',
      error: null,
      isValid: true,
    },
    feeds: [],
    posts: [],
  };
  const watchedState = onChange(initialState, (path, value) => {
    if (watchedState.rssForm.isValid) {
      elements.feedback.textContent = 'RSS успешно загружен';
      elements.feedback.classList.replace('text-danger', 'text-success');
      elements.input.classList.remove('is-invalid');
      elements.input.focus();
      elements.input.value = '';
    } else {
      elements.feedback.textContent = watchedState.rssForm.error;
      elements.feedback.classList.replace('text-success', 'text-danger');
      elements.input.classList.add('is-invalid');
    }
  });
};
