// config inicializada de cada mod

import { CONFIG } from "./config.js";
import * as cart from "./cart.js";
import { initMenu } from "./menu.js";
import { initFeatured } from "./featured.js";
import { initMusic } from "./music.js";
import { initJukebox } from "./jukebox.js";
import { initNav, initCartUI, showToast } from "./ui.js";
import { el } from "./format.js";

function applyConfig() {
  document.querySelectorAll("[data-bar-name]").forEach((n) => (n.textContent = CONFIG.barName));
  document.getElementById("hero-tagline").textContent = CONFIG.tagline;

  const hero = document.getElementById("hero-img");
  hero.src = CONFIG.heroImage;
  hero.addEventListener("error", () => hero.remove());
  if (hero.complete && hero.naturalWidth === 0) hero.remove();

  const f = CONFIG.footer;
  document.getElementById("footer-notice").textContent = f.notice;
  document.getElementById("footer-address").textContent = f.address;
  document.getElementById("footer-phone").textContent = f.phone;
  document.getElementById("footer-hours").replaceChildren(
    ...f.hours.map(([d, h]) => el("div", {}, el("dt", { text: d }), el("dd", { text: h })))
  );
  document.getElementById("footer-social").replaceChildren(
    ...f.social.map((s) => el("li", {}, el("strong", { text: `${s.label}: ` }), document.createTextNode(s.handle)))
  );
  document.getElementById("year").textContent = String(new Date().getFullYear());
}

function handleAdd(productId) {
  const result = cart.add(productId);
  if (!result.ok) {
    showToast("Este item está indisponível no momento.");
    return false;
  }
  const product = cart.getProduct(productId);
  showToast(`${product.name} na sacolinha (${result.qty}).`);
  return true;
}

applyConfig();
initNav();
initCartUI();
cart.load();
initMenu({ onAdd: handleAdd });
initFeatured({ onAdd: handleAdd });
initMusic();
initJukebox();
