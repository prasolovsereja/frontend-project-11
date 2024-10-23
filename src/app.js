import onChange from 'on-change';
import i18next from 'i18next';
import validateUrl from './validateUrl.js';
import ru from './locales/ru.js';
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

  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const watchedState = onChange(initialState, (path, value) => {
    if (watchedState.rssForm.isValid) {
      elements.feedback.textContent = i18n.t('form.success');
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
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    console.log(url);
    const urlsList = watchedState.feeds.map((feed) => feed);
    validateUrl(url, urlsList, i18n)
      .then((validUrl) => {
        console.log(validUrl);
        watchedState.rssForm.isValid = true;
        watchedState.rssForm.error = null;
        watchedState.rssForm.state = 'success';
        watchedState.feeds.push(validUrl);
      })
      .catch((err) => {
        console.log('err>>>', err);
        watchedState.rssForm.error = err.message;
        watchedState.rssForm.isValid = false;
        watchedState.rssForm.state = 'filling';
      });
  });
};
