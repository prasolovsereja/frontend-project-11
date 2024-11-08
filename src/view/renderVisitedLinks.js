export default (setId) => {
  const currentVisitedId = [...setId.values()][setId.size - 1];
  const currentLink = document.querySelector(`[data-id="${currentVisitedId}"]`);

  currentLink.classList.toggle('fw-bold');
  currentLink.classList.toggle('fw-normal');
};
