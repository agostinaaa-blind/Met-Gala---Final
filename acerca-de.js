document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menuButton.innerHTML = `<i class="${open ? "ri-close-line" : "ri-menu-line"}" aria-hidden="true"></i>`;
  }
  menuButton.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
  const questions = [...document.querySelectorAll(".about-question")];
  const expandButton = document.getElementById("expandQuestions");
  expandButton.hidden = false;
  function syncButton() {
    const allOpen = questions.every((question) => question.open);
    expandButton.innerHTML = `${allOpen ? "Cerrar todas" : "Expandir todas"} <i class="${allOpen ? "ri-subtract-line" : "ri-add-line"}" aria-hidden="true"></i>`;
  }
  expandButton.addEventListener("click", () => {
    const open = !questions.every((question) => question.open);
    questions.forEach((question) => { question.open = open; });
    syncButton();
  });
  questions.forEach((question) => question.addEventListener("toggle", syncButton));
  syncButton();
});
