/* ==========================================================================
   CART & MAGAZINE SHOP CONTROLLER
   Gestión del carrito de compras, cantidad, drawer lateral y checkout de la revista.
   ========================================================================== */

(function () {
  const MAGAZINE_ITEM = {
    id: "revista-impresa-met-archives-vol1",
    name: "The Met / Archives — Libro & Revista Impresa",
    edition: "Vol. 1 · Edición de Colección",
    price: 45000,
    formattedPrice: "$45.000",
    image: "images/portada-revista-hd.jpg" // Cambiar a la imagen final de la portada cuando esté lista
  };

  let cart = JSON.parse(localStorage.getItem("met_archives_cart") || "[]");

  function saveCart() {
    localStorage.setItem("met_archives_cart", JSON.stringify(cart));
    updateCartUI();
  }

  function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function getCartSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function formatMoney(amount) {
    return "$" + amount.toLocaleString("es-AR");
  }

  function updateCartUI() {
    const badge = document.getElementById("cartCountBadge");
    const count = getCartCount();
    if (badge) {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.add("has-items");
      } else {
        badge.classList.remove("has-items");
      }
    }

    const drawerBody = document.getElementById("cartDrawerItems");
    const emptyState = document.getElementById("cartEmptyState");
    const checkoutSection = document.getElementById("cartCheckoutSection");
    const drawerFooter = document.getElementById("cartDrawerFooter");
    const subtotalEl = document.getElementById("cartSubtotalDisplay");
    const totalEl = document.getElementById("cartTotalDisplay");
    const checkoutBtn = document.getElementById("btnCheckoutSubmit");

    if (!drawerBody) return;

    if (cart.length === 0) {
      if (emptyState) emptyState.style.display = "block";
      if (checkoutSection) checkoutSection.style.display = "none";
      if (drawerFooter) drawerFooter.style.display = "none";
      drawerBody.innerHTML = "";
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      if (emptyState) emptyState.style.display = "none";
      if (checkoutSection) checkoutSection.style.display = "block";
      if (drawerFooter) drawerFooter.style.display = "block";
      if (checkoutBtn) checkoutBtn.disabled = false;

      const subtotal = getCartSubtotal();
      if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
      if (totalEl) totalEl.textContent = formatMoney(subtotal);

      drawerBody.innerHTML = cart.map((item, index) => `
        <div class="cart-item-card" data-index="${index}">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.parentElement.innerHTML='<span>THE MET<br>/ARCHIVES</span>';">
          </div>
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="cart-item-edition">${item.edition}</p>
            <span class="cart-item-price-unit">${formatMoney(item.price)} c/u</span>
          </div>
          <div class="cart-item-qty-actions">
            <button type="button" class="cart-remove-btn" data-action="remove" data-index="${index}" title="Eliminar del carrito" aria-label="Eliminar producto">
              <i class="ri-delete-bin-line"></i>
            </button>
            <div class="magazine-qty-control" style="padding: 0.15rem 0.35rem;">
              <button type="button" class="qty-btn" data-action="decrease" data-index="${index}" style="width:24px;height:24px;font-size:0.9rem;" aria-label="Restar">-</button>
              <span class="qty-input" style="width:28px;font-size:0.85rem;">${item.quantity}</span>
              <button type="button" class="qty-btn" data-action="increase" data-index="${index}" style="width:24px;height:24px;font-size:0.9rem;" aria-label="Sumar">+</button>
            </div>
          </div>
        </div>
      `).join("");
    }
  }

  function openCartDrawer() {
    const overlay = document.getElementById("cartDrawerOverlay");
    const drawer = document.getElementById("cartDrawer");
    const successScreen = document.getElementById("cartOrderSuccess");
    const formScreen = document.getElementById("cartDrawerContent");

    if (successScreen) successScreen.classList.remove("active");
    if (formScreen) formScreen.style.display = "flex";

    if (overlay && drawer) {
      overlay.classList.add("active");
      drawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeCartDrawer() {
    const overlay = document.getElementById("cartDrawerOverlay");
    const drawer = document.getElementById("cartDrawer");
    if (overlay && drawer) {
      overlay.classList.remove("active");
      drawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  function addToCart(qty) {
    const quantity = Math.max(1, parseInt(qty || 1, 10));
    const existing = cart.find(item => item.id === MAGAZINE_ITEM.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        ...MAGAZINE_ITEM,
        quantity: quantity
      });
    }
    saveCart();
    openCartDrawer();
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();

        // Comportamiento de búsqueda global (si estamos en otra página, redirige al archivo en index con la búsqueda)
    const globalSearchInput = document.getElementById("searchInput");
    if (globalSearchInput && !window.location.pathname.endsWith("index.html") && window.location.pathname.includes(".html")) {
      globalSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && globalSearchInput.value.trim()) {
          e.preventDefault();
          window.location.href = `index.html?search=${encodeURIComponent(globalSearchInput.value.trim())}#looks`;
        }
      });
    }
    // Eventos del Header y Drawer
    const cartToggleBtn = document.getElementById("cartToggleBtn");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const cartOverlay = document.getElementById("cartDrawerOverlay");

    if (cartToggleBtn) {
      cartToggleBtn.addEventListener("click", openCartDrawer);
    }
    if (cartCloseBtn) {
      cartCloseBtn.addEventListener("click", closeCartDrawer);
    }
    if (cartOverlay) {
      cartOverlay.addEventListener("click", (e) => {
        if (e.target === cartOverlay) closeCartDrawer();
      });
    }

    // Controles de cantidad en la sección de la revista
    const secQtyInput = document.getElementById("magQtyInput");
    const secBtnDec = document.getElementById("magQtyDec");
    const secBtnInc = document.getElementById("magQtyInc");
    const secBtnAdd = document.getElementById("btnAddToBag");

    if (secBtnDec && secQtyInput) {
      secBtnDec.addEventListener("click", () => {
        let val = parseInt(secQtyInput.value, 10) || 1;
        if (val > 1) secQtyInput.value = val - 1;
      });
    }

    if (secBtnInc && secQtyInput) {
      secBtnInc.addEventListener("click", () => {
        let val = parseInt(secQtyInput.value, 10) || 1;
        secQtyInput.value = val + 1;
      });
    }

    if (secBtnAdd && secQtyInput) {
      secBtnAdd.addEventListener("click", () => {
        addToCart(secQtyInput.value);
      });
    }

    // Delegación de eventos dentro del drawer (aumentar, disminuir, eliminar)
    const drawerItems = document.getElementById("cartDrawerItems");
    if (drawerItems) {
      drawerItems.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const action = btn.dataset.action;
        const index = parseInt(btn.dataset.index, 10);
        if (isNaN(index) || !cart[index]) return;

        if (action === "remove") {
          cart.splice(index, 1);
          saveCart();
        } else if (action === "increase") {
          cart[index].quantity += 1;
          saveCart();
        } else if (action === "decrease") {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          } else {
            cart.splice(index, 1);
          }
          saveCart();
        }
      });
    }

    // Envío del Checkout
    const checkoutForm = document.getElementById("cartCheckoutForm");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        const nameInput = document.getElementById("checkoutName");
        const orderNumber = "MET-" + Math.floor(100000 + Math.random() * 900000);
        const codeDisplay = document.getElementById("orderCodeDisplay");
        const customerDisplay = document.getElementById("orderCustomerName");

        if (codeDisplay) codeDisplay.textContent = orderNumber;
        if (customerDisplay && nameInput) customerDisplay.textContent = nameInput.value;

        // Limpiar carrito
        cart = [];
        saveCart();

        // Mostrar pantalla de confirmación
        const formScreen = document.getElementById("cartDrawerContent");
        const successScreen = document.getElementById("cartOrderSuccess");
        if (formScreen) formScreen.style.display = "none";
        if (successScreen) successScreen.classList.add("active");
      });
    }

    // Botón para seguir explorando tras compra
    const btnContinueShop = document.getElementById("btnContinueShopping");
    if (btnContinueShop) {
      btnContinueShop.addEventListener("click", closeCartDrawer);
    }
  });

  window.metCart = {
    addToCart: addToCart,
    openCart: openCartDrawer,
    closeCart: closeCartDrawer
  };
})();