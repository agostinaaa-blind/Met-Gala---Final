document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("navLinks");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menuButton.innerHTML = `<i class="${open ? "ri-close-line" : "ri-menu-line"}" aria-hidden="true"></i>`;
  }
  menuButton.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });

  // Esta selección es independiente de los looks: contiene las notas del PDF.
  const labels = { diseno: "Diseño", historia: "Historia", tematicas: "Temáticas" };
  const stories = window.journalArticles;

  const search = document.getElementById("articleSearch");
  const grid = document.getElementById("journalGrid");
  const count = document.getElementById("articleCount");
  const buttons = [...document.querySelectorAll("[data-category]")];
  let category = "all";
  const normalize = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  function render() {
    const query = normalize(search.value);
    const matches = stories.filter((story) => (category === "all" || story.category === category) && normalize([story.author, story.title, story.source, story.year, story.summary].join(" ")).includes(query));
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.category === category)));
    count.textContent = `${matches.length} ${matches.length === 1 ? "artículo" : "artículos"}`;
    if (!matches.length) {
      grid.innerHTML = `<div class="journal-empty"><h3>No encontramos esa historia.</h3><p>Probá con otro tema, autor o año.</p><button id="resetArticles" type="button">Ver todos los artículos <i class="ri-arrow-right-up-line" aria-hidden="true"></i></button></div>`;
      document.getElementById("resetArticles").addEventListener("click", () => { category = "all"; search.value = ""; render(); search.focus(); });
      return;
    }
    grid.innerHTML = matches.map((story) => `
      <a class="journal-card" href="${escape(story.url)}" target="_blank" rel="noopener">
        <div class="journal-card-image"><img src="${escape(story.image)}" alt="${escape(story.alt)}" style="object-position:${escape(story.position)}" loading="lazy"><span class="journal-card-year">${story.year}</span><span class="journal-card-arrow"><i class="ri-external-link-line" aria-hidden="true"></i></span></div>
        <p class="journal-card-category">${labels[story.category]} <span>/ ${escape(story.source)}</span></p>
        <h3>${escape(story.title)}</h3><p class="journal-card-summary">${escape(story.summary)}</p>
        <p class="journal-card-author">Por ${escape(story.author)}</p>
        <span class="journal-card-read">Leer nota completa <i class="ri-external-link-line" aria-hidden="true"></i><span class="sr-only"> (abre en otra pestaña en ${escape(story.source)})</span></span>
      </a>`).join("");
  }
  buttons.forEach((button) => button.addEventListener("click", () => { category = button.dataset.category; render(); }));
  search.addEventListener("input", render);
  render();
});
