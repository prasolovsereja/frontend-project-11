/* eslint-disable no-param-reassign */
export default (state, elements) => {
  elements.postsContainer.innerHTML = '';

  const divElement = document.createElement('div');
  divElement.classList.add('card', 'border-0');

  const cardTitleContainer = document.createElement('div');
  cardTitleContainer.classList.add('card-body');
  divElement.append(cardTitleContainer);

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Посты';
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
