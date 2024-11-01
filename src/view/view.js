/* eslint-disable no-param-reassign */
import onChange from 'on-change';
import renderStatus from './renderStatus.js';

const renderFeeds = (state, elements) => {
  elements.feedsContainer.innerHTML = '';

  const divElement = document.createElement('div');
  divElement.classList.add('card', 'border-0');

  const cardTitleContainer = document.createElement('div');
  cardTitleContainer.classList.add('card-body');
  divElement.append(cardTitleContainer);

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Фиды';
  cardTitleContainer.append(cardTitle);

  const ulElement = document.createElement('ul');
  ulElement.classList.add('list-group', 'border-0', 'rounded-0');

  state.feeds.forEach((feed) => {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item', 'border-0', 'border-end-0');

    const pElement = document.createElement('p');
    pElement.classList.add('m-0', 'small', 'text-black-50');
    pElement.textContent = feed.description;

    const h3Element = document.createElement('h3');
    h3Element.classList.add('h-6', 'm-0');
    h3Element.textContent = feed.title;

    liElement.append(h3Element);
    liElement.append(pElement);

    ulElement.prepend(liElement);
  });
  divElement.append(ulElement);
  elements.feedsContainer.append(divElement);
};

const renderPosts = (state, elements) => {
  elements.postsContainer.innerHTML = '';

  const divElement = document.createElement('div');
  divElement.classList.add('card', 'border-0');

  const cardTitleContainer = document.createElement('div');
  cardTitleContainer.classList.add('card-body');
  divElement.append(cardTitleContainer);

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Фиды';
  cardTitleContainer.append(cardTitle);

  const ulElement = document.createElement('ul');
  ulElement.classList.add('list-group', 'border-0', 'rounded-0');

  state.posts.forEach(({ id, title, link }) => {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const aElement = document.createElement('a');
    aElement.classList.add('fw-bold');
    aElement.setAttribute('href', link);
    aElement.dataset.id = id;
    aElement.setAttribute('target', '_blank');
    aElement.setAttribute('rel', 'noopener noreferrer');
    aElement.textContent = title;
    liElement.append(aElement);

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    buttonElement.setAttribute('type', 'button');
    buttonElement.dataset.id = id;
    buttonElement.dataset.bsToggle = 'modal';
    buttonElement.dataset.bsTarget = '#modal';
    buttonElement.textContent = 'Просмотр';
    liElement.append(buttonElement);

    ulElement.append(liElement);
  });
  divElement.append(ulElement);
  elements.postsContainer.append(divElement);
};

const renderError = (error, elements, i18n) => {
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

export default (state, elements, i18n) => onChange(state, (path, value) => {
  console.log('path>>> ', path);
  console.log('value >>> ', value);
  switch (path) {
    case 'feeds':
      renderFeeds(state, elements);
      break;
    case 'posts':
      renderPosts(state, elements);
      break;
    case 'rssForm.error':
      renderError(value, elements, i18n);
      break;
    case 'rssForm.isValid':
      if (!value) {
        elements.input.classList.add('is-invalid');
        return;
      }
      elements.input.classList.remove('is-invalid');
      break;
    case 'rssForm.state':
      renderStatus(value, elements, i18n);
      break;
    default:
      throw new Error(`Unknown path: ${path}`);
  }
});
