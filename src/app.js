import onChange from 'on-change';
import validateUrl from './validateUrl.js';
// import view from './view/view.js';

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
      elements.feedback.textContent = watchedState.error;
      elements.feedback.classList.replace('text-success', 'text-danger');
      elements.input.classList.add('is-invalid');
    }
  });
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    console.log(url);
    // const urlsList = watchedState.feeds.map((feed) => feed);
    validateUrl(url, [])
      .then((validUrl) => {
        console.log(validUrl);
        watchedState.rssForm.isValid = true;
        watchedState.rssForm.error = null;
        watchedState.rssForm.state = 'success';
        watchedState.feeds.push(validUrl);
      })
      .catch((err) => {
        console.log(err);
        watchedState.rssForm.error = err.message;
        watchedState.rssForm.isValid = false;
        watchedState.rssForm.state = 'filling';
      });
  });
};
