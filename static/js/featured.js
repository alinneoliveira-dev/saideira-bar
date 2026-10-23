// destaques da casa

import { FEATURED } from "./data/products.js";
import { getProduct } from "./cart.js";
import { formatCents, createImage, el } from "./format.js";

export function initFeatured({ onAdd }) {
  const grid = document.getElementById("featured-grid");
  grid.replaceChildren();

  for (const item of FEATURED) {
    const product = getProduct(item.productId);
    if (!product) continue; // 

    const btn = el("button", { type: "button", class: "btn btn-primary", disabled: !product.available, text: product.available ? "Adicionar" : "Indisponível", "aria-label": `Adicionar ${item.title} à sacolinha` });
    btn.addEventListener("click", () => onAdd(product.id));

    const card = el("article", { class: `feat feat-${item.size || "medium"}` },
      createImage(product.image, product.name, product.category, { label: false }),
      el("div", { class: "feat-body" },
        item.badge ? el("span", { class: "feat-badge", text: item.badge }) : null,
        el("h3", { text: item.title }),
        el("p", { text: item.text }),
        el("div", { class: "feat-foot" }, el("span", { class: "feat-price", text: formatCents(Math.round(product.price * 100)) }), btn)
      )
    );
    grid.append(card);
  }
}
