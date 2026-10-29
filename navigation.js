// Submenú compartido por todas las páginas: clic, teclado y cierre exterior.
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".nav-dropdown");
  if (!dropdown) return;
  const trigger = dropdown.querySelector("summary");
  const nav = document.getElementById("navLinks");
  dropdown.addEventListener("toggle", () => trigger.setAttribute("aria-expanded", String(dropdown.open)));
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) dropdown.open = false;
  });
  dropdown.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { dropdown.open = false; }));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dropdown.open) {
      event.stopImmediatePropagation();
      dropdown.open = false;
      trigger.focus();
    }
  });
  // Evita que un submenú abierto reaparezca al volver a abrir el menú móvil.
  document.getElementById("menuButton")?.addEventListener("click", () => {
    queueMicrotask(() => { if (!nav.classList.contains("open")) dropdown.open = false; });
  });
  if (dropdown.querySelector('[aria-current="page"]')) trigger.classList.add("nav-current");
});
