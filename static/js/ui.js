// menu e sacolinha

import * as cart from "./cart.js";
import { formatCents, createImage, el } from "./format.js";
import { buildOrderSummary, buildWhatsAppUrl } from "./order.js";
import { CONFIG } from "./config.js";

let toastTimer;
export function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

export function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  const set = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => set(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) { set(false); toggle.focus(); }
  });
  window.matchMedia("(min-width: 821px)").addEventListener("change", (e) => { if (e.matches) set(false); });
}

export function initCartUI() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const toggle = document.getElementById("cart-toggle");
  const body = document.getElementById("cart-body");
  const countEl = document.getElementById("cart-count");
  const subtotalEl = document.getElementById("cart-subtotal");
  const clearBtn = document.getElementById("cart-clear");
  const waBtn = document.getElementById("cart-whatsapp");
  let lastFocus = null;
  let lastQty = 0;

  const isOpen = () => drawer.classList.contains("open");

  function open() {
    lastFocus = document.activeElement;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add("visible"));
    document.body.classList.add("no-scroll");
    drawer.focus();
  }

  function close() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("visible");
    setTimeout(() => { if (!isOpen()) backdrop.hidden = true; }, 300);
    document.body.classList.remove("no-scroll");
    (lastFocus && document.contains(lastFocus) ? lastFocus : toggle).focus();
  }

  function lineEl({ product, qty, unitCents, subtotalCents }) {
    const minus = el("button", { type: "button", "aria-label": `Diminuir quantidade de ${product.name}`, text: "−" });
    const plus = el("button", { type: "button", "aria-label": `Aumentar quantidade de ${product.name}`, text: "+" });
    const rm = el("button", { type: "button", class: "remove-btn", "aria-label": `Remover ${product.name}`, text: "Remover" });
    minus.addEventListener("click", () => cart.decrement(product.id));
    plus.addEventListener("click", () => cart.increment(product.id));
    rm.addEventListener("click", () => cart.remove(product.id));
    return el("div", { class: "cart-item" },
      createImage(product.image, "", product.category),
      el("div", {}, el("h3", { text: product.name }), el("p", { class: "unit", text: `${formatCents(unitCents)} cada` })),
      el("p", { class: "sub", text: formatCents(subtotalCents) }),
      el("div", { class: "cart-item-controls" },
        el("div", { class: "qty", role: "group", "aria-label": `Quantidade de ${product.name}` }, minus, el("output", { text: String(qty), "aria-live": "polite" }), plus),
        rm)
    );
  }

  function emptyState() {
    const btn = el("button", { type: "button", class: "btn btn-outline", text: "Ver cardápio" });
    btn.addEventListener("click", () => { close(); location.hash = "#cardapio"; });
    return el("div", { class: "cart-empty" },
      el("strong", { text: "Sacolinha vazia" }),
      el("p", { text: "Ainda não tem nada por aqui. Que tal um chopp e uma porção de batata?" }),
      btn);
  }

  function render(state) {
    countEl.textContent = String(state.totalQty);
    toggle.setAttribute("aria-label", `Abrir sacolinha, ${state.totalQty} ${state.totalQty === 1 ? "item" : "itens"}`);
    subtotalEl.textContent = formatCents(state.subtotalCents);
    clearBtn.disabled = state.lines.length === 0;
    clearBtn.hidden = state.lines.length === 0;

    if (state.totalQty > lastQty) {
      toggle.classList.remove("bump");
      void toggle.offsetWidth; // reinicia a animação
      toggle.classList.add("bump");
    }
    lastQty = state.totalQty;

    body.replaceChildren(...(state.lines.length ? state.lines.map(lineEl) : [emptyState()]));

    const summary = buildOrderSummary(state.lines, CONFIG.barName);
    const url = buildWhatsAppUrl(CONFIG.whatsappNumber, summary);
    waBtn.disabled = !url;
    waBtn.dataset.url = url || "";
  }

  toggle.addEventListener("click", open);
  document.getElementById("cart-close").addEventListener("click", close);
  document.getElementById("cart-continue").addEventListener("click", close);
  backdrop.addEventListener("click", close);
  clearBtn.addEventListener("click", () => { cart.clear(); showToast("Sacolinha esvaziada."); });
  waBtn.addEventListener("click", () => { if (waBtn.dataset.url) window.open(waBtn.dataset.url, "_blank", "noopener"); });

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key !== "Tab") return;
    const focusables = [...drawer.querySelectorAll("button:not([disabled]):not([hidden]), a[href]")];
    if (!focusables.length) { e.preventDefault(); return; }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === drawer)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  cart.subscribe(render);
}
