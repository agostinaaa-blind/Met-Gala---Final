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

  // Direcciones de contacto del Costume Institute incluidas en el material del proyecto.
  const departments = {
    collections: { email: "CostumeInstitute.Collections@metmuseum.org", label: "Colección e indumentaria" },
    library: { email: "CostumeInstitute.Library@metmuseum.org", label: "Biblioteca" },
    press: { email: "communications@metmuseum.org", label: "Prensa y comunicaciones" }
  };
  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const department = departments[fields.get("department")];
    if (!department) return;
    const body = `${fields.get("message").trim()}\n\nNombre: ${fields.get("name").trim() || "Sin indicar"}\nCorreo de contacto: ${fields.get("email").trim()}`;
    const mailUrl = `mailto:${department.email}?subject=${encodeURIComponent(`Consulta: ${department.label}`)}&body=${encodeURIComponent(body)}`;
    const status = document.getElementById("contactStatus");
    status.hidden = false;
    status.replaceChildren(document.createTextNode("Tu correo está preparado. Si tu aplicación no se abrió, "));
    const retryLink = document.createElement("a");
    retryLink.href = mailUrl;
    retryLink.textContent = "abrí el borrador desde este enlace";
    status.append(retryLink, document.createTextNode(`. También podés escribir a ${department.email}.`));
    window.location.href = mailUrl;
  });
});
