// import onChange from 'on-change';
import _ from 'lodash';
import axios from 'axios';
import i18next from 'i18next';
import validateUrl from './validateUrl.js';
import ru from './locales/ru.js';
import view from './view/view.js';
import getData from './parser.js';
import fetchData from './fetch.js';
import updatePosts from './updater.js';

export default () => {
  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    button: document.querySelector('button[type="submit'),
    feedback: document.querySelector('.feedback'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
    modal: {
      title: document.querySelector('.modal-title'),
      description: document.querySelector('.modal-body'),
      footer: document.querySelector('.modal-footer'),
    },
  };

  const initialState = {
    rssForm: {
      state: 'filling',
      error: null,
      isValid: true,
    },
    feeds: [],
    posts: [],
    uiState: {
      visitedPosts: new Set(),
      modalId: null,
    },
  };

  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const watchedState = view(initialState, elements, i18n);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    watchedState.rssForm.state = 'filling';
    const url = formData.get('url');
    const urlsList = watchedState.feeds.map((feed) => feed.url);
    validateUrl(url, urlsList, i18n)
      .then((validUrl) => {
        console.log(validUrl);
        watchedState.rssForm.error = null;
        watchedState.rssForm.state = 'processing';
        return fetchData(validUrl);
      })
      .then(({ data }) => {
        const [feed, posts] = getData(data.contents);
        const newFeed = { ...feed, id: _.uniqueId(), url };
        const newPosts = posts.map((post) => ({ ...post, id: _.uniqueId(), feedId: newFeed.id }));
        watchedState.feeds = [newFeed, ...watchedState.feeds];
        watchedState.posts = [...newPosts, ...watchedState.posts];
        watchedState.rssForm.state = 'success';
      })
      .catch((err) => {
        watchedState.rssForm.isValid = err.name !== 'ValidationError';
        if (err.name === 'ValidationError') {
          watchedState.rssForm.error = err.message;
        } else if (err.NotValidRss) {
          watchedState.rssForm.error = 'form.errors.notValidRSS';
        } else if (axios.isAxiosError(err)) {
          watchedState.rssForm.error = 'form.errors.networkError';
        }
        watchedState.rssForm.state = 'filling';
      });
  });

  elements.postsContainer.addEventListener('click', ({ target }) => {
    if (target.closest('a')) {
      const { id } = target.dataset;
      watchedState.uiState.visitedPosts.add(id);
    }
    if (target.closest('button')) {
      const { id } = target.dataset;
      watchedState.uiState.visitedPosts.add(id);
      watchedState.uiState.modalId = id;
    }
  });

  setTimeout(() => updatePosts(watchedState), 5000);
};
