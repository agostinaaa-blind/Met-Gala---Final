/* ==========================================================================
   GALA / ARCHIVO — SCRIPT PRINCIPAL
   Archivo: main.js
   Descripción: Configuración centralizada de datos (JSON) para fácil edición
                de imágenes/textos y lógica interactiva de la web.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // --------------------------------------------------------------------------
  // SECCIÓN 1: LOOKS DESTACADOS (Filtros por año, buscador y grilla principal)
  // --------------------------------------------------------------------------
  const looks = window.archiveLooks;

  // --------------------------------------------------------------------------
  // SECCIÓN 2: GALERÍA EDITORIAL INTERACTIVA 
  // --------------------------------------------------------------------------
  const galleryLooks = window.archiveGalleryLooks;

  // --------------------------------------------------------------------------
  // SECCIÓN 3: ARTÍCULOS & ENSAYOS DE ALTA COSTURA (Tarjetas y Modal Editorial)
  // --------------------------------------------------------------------------
  const articles = window.archiveArticles;

  /* ==========================================================================
     2. ESTADO DE LA APLICACIÓN
     ========================================================================== */
  let activeYear = "all";
  let currentSearch = "";
  // Si viene con un parámetro de búsqueda desde otra página (?search=...)
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get("search");
  if (initialSearch && searchInput) {
    searchInput.value = initialSearch;
    currentSearch = initialSearch.toLowerCase();
    searchClear.classList.add("visible");
  }
  let galleryIndex = 0;

  /* ==========================================================================
     3. ELEMENTOS DEL DOM
     ========================================================================== */
  const looksGrid = document.getElementById("looksGrid");
  const resultCount = document.getElementById("resultCount");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const yearButtons = document.querySelectorAll(".year-button");

  const galleryImage = document.getElementById("galleryImage");
  const galleryYear = document.getElementById("galleryYear");
  const galleryName = document.getElementById("galleryName");
  const galleryTheme = document.getElementById("galleryTheme");
  const galleryDescription = document.getElementById("galleryDescription");
  const galleryCounter = document.getElementById("galleryCounter");
  const galleryPrevious = document.getElementById("galleryPrevious");
  const galleryNext = document.getElementById("galleryNext");

  const articlesGrid = document.getElementById("articlesGrid");
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  const newsletterForm = document.getElementById("newsletterForm");
  const successMessage = document.getElementById("successMessage");

  const editorialModal = document.getElementById("editorialModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalContent = document.getElementById("modalContent");

  /* ==========================================================================
     4. FUNCIONES DE RENDERIZADO: LOOKS & FILTROS
     ========================================================================== */
  function renderLooks() {
    const query = currentSearch.toLowerCase().trim();

    const filtered = looks.filter((look) => {
      const matchesYear = activeYear === "all" || String(look.year) === activeYear;
      const information = [
        look.name,
        look.year,
        look.designer,
        look.theme
      ].join(" ").toLowerCase();

      return matchesYear && (query === "" || information.includes(query));
    });

    resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "resultado" : "resultados"}`;

    if (filtered.length === 0) {
      looksGrid.innerHTML = `
        <div class="empty-state">
          <p>No encontramos un look con esa búsqueda.</p>
          <button type="button" id="showAllButton">Volver a todo el archivo</button>
        </div>
      `;

      const showAllButton = document.getElementById("showAllButton");
      if (showAllButton) {
        showAllButton.addEventListener("click", () => {
          activeYear = "all";
          currentSearch = "";
          searchInput.value = "";
          searchClear.classList.remove("visible");
          updateYearButtons();
          renderLooks();
        });
      }
      return;
    }

    looksGrid.innerHTML = filtered.map((look, index) => {
      const number = String(index + 1).padStart(2, "0");
      return `
        <a class="look-card" href="${window.lookUrl(look)}" aria-label="Ver look de ${look.name}, Met Gala ${look.year}">
          <div class="look-image-wrap">
            <img class="look-image" src="${look.image}" alt="${look.name} en la Met Gala ${look.year}" style="object-position:${look.position}">
            <span class="card-index">${number}</span>
            <span class="card-year">${look.year}</span>
          </div>
          <div class="look-meta">
            <div>
              <h3>${look.name}</h3>
              <p>${look.designer}</p>
            </div>
            <span class="card-arrow" aria-hidden="true"><i class="ri-arrow-right-up-line"></i></span>
          </div>
          <p class="look-description">${look.description}</p>
        </a>
      `;
    }).join("");
  }

  function updateYearButtons() {
    yearButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.year === activeYear);
    });
  }

  // Desplazamiento fluido editorial con aceleración y desaceleración orgánica
  function luxuryScrollTo(targetElement, duration = 850) {
    if (!targetElement) return;
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 80;
    const targetY = Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY - headerHeight);
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;

    let startTime = null;
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // Eventos de botones de año
  yearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeYear = button.dataset.year;
      updateYearButtons();
      renderLooks();
      const looksSection = document.getElementById("looks");
      if (looksSection) {
        luxuryScrollTo(looksSection, 750);
      }
    });
  });

  // Enlaces con navegación suave de alta costura
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        event.preventDefault();
        luxuryScrollTo(target, 850);
      }
    });
  });

  // Eventos del buscador
  searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value;
    searchClear.classList.toggle("visible", currentSearch.length > 0);
    renderLooks();
  });

  searchClear.addEventListener("click", () => {
    currentSearch = "";
    searchInput.value = "";
    searchClear.classList.remove("visible");
    renderLooks();
    searchInput.focus();
  });

  /* ==========================================================================
     5. FUNCIONES DE RENDERIZADO: GALERÍA EDITORIAL
     ========================================================================== */
  function renderGallery() {
    const look = galleryLooks[galleryIndex];
    if (!look) return;

    galleryImage.src = look.image;
    galleryImage.alt = `${look.name} en la Met Gala ${look.year}`;
    galleryImage.style.objectPosition = look.position;

    galleryYear.textContent = look.year;
    galleryName.innerHTML = `<a href="${window.lookUrl(look)}">${look.name} <span class="gallery-look-arrow" aria-hidden="true"><i class="ri-arrow-right-up-line"></i></span></a>`;
    galleryImage.closest("a").href = window.lookUrl(look);
    galleryTheme.textContent = look.theme;
    galleryDescription.textContent = look.description;
    galleryCounter.textContent = `${String(galleryIndex + 1).padStart(2, "0")} — ${String(galleryLooks.length).padStart(2, "0")}`;
  }

  galleryPrevious.addEventListener("click", () => {
    galleryIndex = (galleryIndex - 1 + galleryLooks.length) % galleryLooks.length;
    renderGallery();
  });

  galleryNext.addEventListener("click", () => {
    galleryIndex = (galleryIndex + 1) % galleryLooks.length;
    renderGallery();
  });

  const heroPlay = document.querySelector(".hero-play");
  if (heroPlay) {
    heroPlay.addEventListener("click", (event) => {
      event.preventDefault();
      const gallerySection = document.getElementById("galeria");
      if (gallerySection) {
        luxuryScrollTo(gallerySection, 900);
      }
    });
  }

  /* ==========================================================================
     6. RENDERIZADO: ARTÍCULOS, ANÁLISIS Y MODAL EDITORIAL
     ========================================================================== */
  function renderArticles() {
    if (!articlesGrid) return;

    articlesGrid.innerHTML = articles.map((article, index) => `
      <article class="article-card" data-article-index="${index}" tabindex="0" role="button" aria-label="Leer historia completa: ${article.title}">
        <div class="article-image-wrap">
          <img src="${article.image}" alt="${article.name}, Met Gala ${article.year}" style="object-position:${article.position}">
        </div>
        <p class="article-label">ANÁLISIS <i class="ri-circle-fill label-dot"></i> ${article.year}</p>
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <button type="button" class="article-read-btn" data-article-index="${index}" aria-label="Leer historia de ${article.name}">
          Leer historia <i class="ri-arrow-right-up-line"></i>
        </button>
      </article>
    `).join("");

    // Eventos para abrir el modal al hacer click en la tarjeta o en el botón "Leer historia"
    articlesGrid.querySelectorAll(".article-card").forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.getAttribute("data-article-index"));
        openArticleModal(index);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          const index = Number(card.getAttribute("data-article-index"));
          openArticleModal(index);
        }
      });
    });
  }

  // Funciones de apertura y cierre del Modal Editorial
  function openArticleModal(index) {
    const article = articles[index];
    if (!article || !editorialModal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-visual-side">
        <img class="modal-visual-img" src="${article.image}" alt="${article.name}, Met Gala ${article.year}" style="object-position:${article.position}">
        <div class="modal-visual-overlay"></div>
        <div class="modal-visual-top">
        </div>
        <div class="modal-visual-bottom">
          <p class="modal-visual-caption">${article.caption}</p>
          <p class="modal-visual-credit">${article.credit}</p>
        </div>
      </div>

      <div class="modal-story-side">
        <div class="modal-category-eyebrow">
          <span>${article.category}</span>
          <i class="ri-circle-fill"></i>
          <span>${article.year}</span>
        </div>

        <h2 class="modal-title">${article.title}</h2>
        <p class="modal-dek">${article.dek}</p>

        <div class="modal-meta-bar">
          <div class="modal-meta-item">
            <i class="ri-quill-pen-line"></i>
            <span>${article.author}</span>
          </div>
          <div class="modal-meta-item">
            <i class="ri-time-line"></i>
            <span>${article.readTime}</span>
          </div>
          <div class="modal-meta-item">
            <i class="ri-vip-diamond-line"></i>
            <span>${article.designer}</span>
          </div>
        </div>

        <div class="modal-story-body">
          <p class="modal-lead-p">${article.lead}</p>

          ${article.paragraphs.map(p => `<p>${p}</p>`).join("")}

          <div class="modal-pull-quote">
            <q>${article.quote.text}</q>
            <cite>— ${article.quote.author}</cite>
          </div>

          <p>${article.closing}</p>

          <div class="modal-editorial-footer">
            <div class="modal-footer-seal">
              <i class="ri-vip-crown-line"></i>
              <span>The Met Archives · Edición Especial</span>
            </div>
            <span>Costume Institute Benefit</span>
          </div>
        </div>
      </div>
    `;

    editorialModal.classList.add("active");
    editorialModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeArticleModal() {
    if (!editorialModal) return;
    editorialModal.classList.remove("active");
    editorialModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Eventos para cerrar el modal
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeArticleModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeArticleModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && editorialModal && editorialModal.classList.contains("active")) {
      closeArticleModal();
    }
  });

  /* ==========================================================================
     7. MENÚ MÓVIL RESPONSIVE
     ========================================================================== */
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.innerHTML = isOpen ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.innerHTML = '<i class="ri-menu-line"></i>';
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    });
  });

  /* ==========================================================================
     8. FORMULARIO NEWSLETTER
     ========================================================================== */
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.style.display = "none";
    successMessage.classList.add("visible");
  });

  /* ==========================================================================
     9. CONTROL DEL VIDEO HERO (AUTOPLAY CONTINUO EN MÓVILES E IOS)
     ========================================================================== */
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    heroVideo.muted = true;
    const playHeroVideo = () => {
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const unlockPlay = () => {
            heroVideo.play();
            document.removeEventListener("touchstart", unlockPlay);
            document.removeEventListener("click", unlockPlay);
          };
          document.addEventListener("touchstart", unlockPlay, { once: true, passive: true });
          document.addEventListener("click", unlockPlay, { once: true, passive: true });
        });
      }
    };
    playHeroVideo();
  }

  /* ==========================================================================
     10. INICIALIZACIÓN
     ========================================================================== */
  renderLooks();
  renderGallery();
  renderArticles();
});
