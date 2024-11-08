/* eslint-disable no-param-reassign */
export default (state, elements) => {
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
