/* eslint-disable no-param-reassign */
export default (posts, elements, modalId) => {
  const post = posts.find(({ id }) => modalId === id.toString());
  const { modal } = elements;

  modal.title.textContent = post.title;
  modal.description.textContent = post.description;
  modal.footer.firstElementChild.href = post.link;
};
