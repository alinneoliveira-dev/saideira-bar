// cardápio: filtros por categoria, busca, paginação e cards.

import { CATEGORIES, PRODUCTS } from "./data/products.js";
import { formatCents, createImage, el } from "./format.js";

const PAGE_SIZE = 12;

export function initMenu({ onAdd }) {
  const filtersEl = document.getElementById("menu-filters");
  const gridEl = document.getElementById("product-grid");
  const statusEl = document.getElementById("menu-status");
  const moreBtn = document.getElementById("menu-more");
  const searchEl = document.getElementById("menu-search");

  const state = { category: "todos", query: "", visible: PAGE_SIZE };

  const normalize = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  function filtered() {
    const q = normalize(state.query.trim());
    return PRODUCTS.filter((p) => {
      if (state.category !== "todos" && p.category !== state.category) return false;
      if (!q) return true;
      return normalize(`${p.name} ${p.description}`).includes(q);
    });
  }

  function renderFilters() {
    filtersEl.replaceChildren();
    const all = [{ id: "todos", label: "Todos" }, ...CATEGORIES];
    for (const cat of all) {
      const count = cat.id === "todos" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat.id).length;
      const btn = el("button", { type: "button", class: "filter-btn", "data-category": cat.id, "aria-pressed": String(state.category === cat.id) },
        document.createTextNode(cat.label), el("span", { class: "filter-count", text: String(count), "aria-hidden": "true" }));
      btn.addEventListener("click", () => {
        state.category = cat.id;
        state.visible = PAGE_SIZE;
        renderFilters();
        renderGrid();
      });
      filtersEl.append(btn);
    }
  }

  function card(p) {
    const category = CATEGORIES.find((c) => c.id === p.category);
    const media = el("div", { class: "product-media" }, createImage(p.image, p.name, p.category));
    if (!p.available) media.append(el("span", { class: "product-tag", text: "Indisponível" }));

    const addBtn = el("button", { type: "button", class: "add-btn", disabled: !p.available, "aria-label": `Adicionar ${p.name} à sacolinha`, text: p.available ? "Adicionar" : "Esgotado" });
    addBtn.addEventListener("click", () => {
      if (onAdd(p.id)) {
        addBtn.classList.add("added");
        addBtn.textContent = "Adicionado";
        setTimeout(() => {
          addBtn.classList.remove("added");
          addBtn.textContent = "Adicionar";
        }, 1200);
      }
    });

    return el("article", { class: `product${p.available ? "" : " is-unavailable"}`, "data-id": p.id },
      media,
      el("div", { class: "product-body" },
        el("h3", { text: p.name }),
        el("p", { class: "product-desc", text: p.description }),
        p.info ? el("p", { class: "product-info", text: `${category ? category.label + " · " : ""}${p.info}` }) : null,
        el("div", { class: "product-foot" }, el("span", { class: "product-price", text: formatCents(Math.round(p.price * 100)) }), addBtn)
      )
    );
  }

  function renderGrid() {
    const list = filtered();
    const shown = list.slice(0, state.visible);
    gridEl.replaceChildren();
    if (!list.length) {
      gridEl.append(el("p", { class: "menu-empty", text: "Nenhum item encontrado. Tente outra categoria ou outra busca." }));
    } else {
      gridEl.append(...shown.map(card));
    }
    statusEl.textContent = list.length ? `Mostrando ${shown.length} de ${list.length} ${list.length === 1 ? "item" : "itens"}.` : "";
    moreBtn.hidden = shown.length >= list.length;
  }

  moreBtn.addEventListener("click", () => {
    state.visible += PAGE_SIZE;
    renderGrid();
  });

  let timer;
  searchEl.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.query = searchEl.value;
      state.visible = PAGE_SIZE;
      renderGrid();
    }, 150);
  });

  renderFilters();
  renderGrid();
}
