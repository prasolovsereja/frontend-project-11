/* eslint-disable no-param-reassign */
import onChange from 'on-change';
import renderStatus from './renderStatus.js';
import renderModal from './renderModal.js';
import renderVisitedLinks from './renderVisitedLinks.js';
import renderErrors from './renderErrors.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';

export default (state, elements, i18n) => onChange(state, (path, value) => {
  switch (path) {
    case 'uiState.visitedPosts':
      renderVisitedLinks(value);
      break;
    case 'uiState.modalId':
      renderModal(state.posts, elements, value);
      break;
    case 'feeds':
      renderFeeds(state, elements);
      break;
    case 'posts':
      renderPosts(state, elements);
      break;
    case 'rssForm.error':
      renderErrors(value, elements, i18n);
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
