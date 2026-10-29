document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("lookContent");
  const slug = new URLSearchParams(window.location.search).get("look");
  const look = window.allArchiveLooks.find((item) => window.lookSlug(item) === slug);
  const editorial = window.archiveArticles.find((item) => window.lookSlug(item) === slug);
  const configuredStory = window.lookStories[slug];
  // Los artículos existentes se reutilizan desde la misma fuente que los modales.
  const story = look ? {
    title: `${look.name}: el look de la Met Gala ${look.year}`,
    subtitle: look.description,
    heading: "Una lectura del look",
    paragraphs: [],
    detail: look.description,
    youtubeUrl: "",
    photos: [
      { src: "", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "", alt: "", caption: "Los detalles de la pieza", position: "50% 50%" }
    ],
    ...configuredStory,
    ...(editorial ? {
      title: editorial.title,
      subtitle: editorial.dek,
      lead: editorial.lead,
      paragraphs: editorial.paragraphs,
      closing: editorial.closing,
      author: editorial.author
    } : {})
  } : null;
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    menuButton.innerHTML = '<i class="ri-menu-line"></i>';
  }

  menuButton.addEventListener("click", () => {
    if (navLinks.classList.contains("open")) return closeMenu();
    navLinks.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Cerrar menú");
    menuButton.innerHTML = '<i class="ri-close-line"></i>';
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  if (!look || !story) {
    document.title = "Look no encontrado — The Met Archives";
    content.innerHTML = `<section class="look-empty"><p class="look-eyebrow">The Met Archives</p><h1>Este look no está en el archivo.</h1><p>Seguí explorando los looks que hicieron historia.</p><a class="look-text-link" href="index.html#looks">Volver al archivo <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a></section>`;
    return;
  }

  document.title = `${look.name} · Met Gala ${look.year} — The Met Archives`;
  document.querySelector('meta[name="description"]').content = story.subtitle;
  const related = window.allArchiveLooks.filter((item) => item !== look)
    .sort((a, b) => Number(b.year === look.year) - Number(a.year === look.year)).slice(0, 3);

  // Los espacios y las fotos se editan en photos dentro de look-stories.js.
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const photos = story.photos ?? [];
  // Solo construimos el iframe con el ID de un enlace de YouTube válido.
  function youtubeVideoId(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      if (!["https:", "http:"].includes(url.protocol)) return null;
      const host = url.hostname.toLowerCase();
      let id;
      if (host === "youtu.be" || host === "www.youtu.be") {
        id = url.pathname.split("/")[1];
      } else if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
        const parts = url.pathname.split("/");
        id = url.pathname === "/watch" ? url.searchParams.get("v")
          : ["embed", "shorts", "live"].includes(parts[1]) ? parts[2] : null;
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id || "") ? id : null;
    } catch {
      return null;
    }
  }
  const videoId = youtubeVideoId(story.youtubeUrl);
  const youtubeVideo = videoId ? `
    <section class="look-video-section" aria-labelledby="videoTitle">
      <p class="look-eyebrow"><i class="ri-youtube-fill" aria-hidden="true"></i> En movimiento</p>
      <h2 id="videoTitle">Otra mirada al look</h2>
      <div class="look-video-player">
        <iframe src="https://www.youtube.com/embed/${videoId}?playsinline=1" title="Video del look de ${escapeHtml(look.name)} en la Met Gala ${look.year}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <a class="look-video-link" href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">Ver en YouTube <i class="ri-external-link-line" aria-hidden="true"></i><span class="sr-only"> (abre en otra pestaña)</span></a>
    </section>` : "";
  // Devuelve la clase CSS de una foto según su orientación.
  const photoClass = (photo) => photo.orientation === 'horizontal' ? 'look-photo look-photo--horizontal' : 'look-photo';

  const photoGallery = photos.length ? `
    <section class="look-photo-section" aria-labelledby="photoTitle">
      <div class="look-photo-heading"><p class="look-eyebrow">Archivo visual</p><h2 id="photoTitle">El look, de cerca</h2></div>
      <div class="look-photo-grid">${photos.map((photo, index) => `
        <figure class="${photoClass(photo)}">
          ${photo.src?.trim() ? `
            <div class="look-photo-frame"><img src="${escapeHtml(photo.src.trim())}" alt="${escapeHtml(photo.alt || `${look.name}: ${photo.caption || `foto ${index + 1}`}`)}" style="object-position:${escapeHtml(photo.position || "50% 50%")}" loading="lazy" decoding="async"></div>
          ` : `
            <div class="look-photo-placeholder" role="img" aria-label="Espacio reservado para una fotografía de ${look.name}">
              <span class="look-photo-number">${String(index + 1).padStart(2, "0")}</span>
              <i class="ri-image-2-line" aria-hidden="true"></i>
              <span>Una nueva perspectiva</span>
              <span class="look-photo-soon">Fotografía próximamente</span>
            </div>
          `}
          ${photo.caption ? `<figcaption>${escapeHtml(photo.caption)}</figcaption>` : ""}
        </figure>`).join("")}</div>
    </section>` : "";

  content.innerHTML = `
    <div class="look-breadcrumb"><a href="index.html#looks"><i class="ri-arrow-left-line" aria-hidden="true"></i> Volver a los looks</a><span>Archivo / ${look.year} / ${look.name}</span></div>
    <article>
      <header class="look-cover">
        <div class="look-cover-copy">
          <p class="look-eyebrow">El look en detalle <span>Met Gala ${look.year}</span></p>
          <h1>${story.title}</h1>
          <p class="look-cover-dek">${story.subtitle}</p>
          <a class="look-cover-scroll" href="#historia">Descubrí la historia <span aria-hidden="true"><i class="ri-arrow-down-line" aria-hidden="true"></i></span></a>
        </div>
        <figure class="look-cover-image">
          <img src="${look.image}" alt="El look de ${look.name} en la Met Gala ${look.year}" style="object-position:${look.coverPosition || look.position}" fetchpriority="high">
          <figcaption>${look.name} <span>Met Gala / ${look.year}</span></figcaption>
        </figure>
      </header>
      <div class="look-story-layout" id="historia">
        <aside class="look-facts" aria-label="Ficha del look">
          <p class="look-eyebrow">Ficha de archivo</p>
          <dl>
            <dt>Artista</dt><dd>${look.name}</dd>
            <dt>Año</dt><dd>${look.year}</dd>
            <dt>Diseño / propuesta</dt><dd>${look.designer}</dd>
            <dt>Universo del look</dt><dd>${look.theme}</dd>
          </dl>
          <a class="look-text-link" href="index.html#looks">Explorar más looks <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a>
        </aside>
        <div class="look-story">
          <p class="look-byline">Por ${story.author || "Redacción Gala / Archivo"} <span>· Lectura editorial</span></p>
          <p class="look-lead">${story.lead || look.description}</p>
          ${story.paragraphs[0] ? `<p>${story.paragraphs[0]}</p>` : ""}
          <h2>${story.heading}</h2>
          ${story.paragraphs[1] ? `<p>${story.paragraphs[1]}</p>` : ""}
          ${photoGallery}
          <div class="look-callout"><span class="look-eyebrow">La clave del look</span><p>${story.detail}</p></div>
          ${story.paragraphs.slice(2).map((paragraph) => `<p>${paragraph}</p>`).join("")}
          ${story.closing ? `<p>${story.closing}</p>` : ""}
          ${youtubeVideo}
          <div class="look-story-end"><span>The Met / Archives</span><a href="index.html#looks">Volver al archivo <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a></div>
        </div>
      </div>
    </article>
    <section class="look-related section-shell" aria-labelledby="relatedTitle">
      <div class="section-heading"><h2 id="relatedTitle">El archivo continúa</h2><a class="look-text-link" href="index.html#looks">Ver todos los looks <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a></div>
      <div class="looks-grid">${related.map((item) => `
        <a class="look-card" href="${window.lookUrl(item)}" aria-label="Ver look de ${item.name}, Met Gala ${item.year}">
          <div class="look-image-wrap"><img class="look-image" src="${item.image}" alt="${item.name}, Met Gala ${item.year}" style="object-position:${item.position}" loading="lazy"><span class="card-year">${item.year}</span></div>
          <div class="look-meta"><div><h3>${item.name}</h3><p>${item.designer}</p></div><span class="card-arrow" aria-hidden="true"><i class="ri-arrow-right-up-line" aria-hidden="true"></i></span></div>
        </a>`).join("")}</div>
    </section>`;
});
