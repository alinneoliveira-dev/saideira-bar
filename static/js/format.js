// formatacao

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// Valores monetários trafegam em centavos (inteiros) para evitar erro de ponto flutuante.
export const toCents = (reais) => Math.round(Number(reais) * 100);
export const formatCents = (cents) => brl.format(cents / 100);

const GLYPHS = {
  cervejas: "M38 22h24v6c6 2 10 8 10 15v33a6 6 0 0 1-6 6H34a6 6 0 0 1-6-6V43c0-7 4-13 10-15v-6Z",
  chopes: "M30 24h36v52a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6V24Zm36 10h8a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-8",
  doses: "M34 26h32l-4 44a6 6 0 0 1-6 5h-12a6 6 0 0 1-6-5l-4-44Z",
  caipirinhas: "M28 26h44L56 56v22h10v4H34v-4h10V56L28 26Z",
  petiscos: "M24 60a26 26 0 0 1 52 0v6H24v-6Zm-2 10h56v6a6 6 0 0 1-6 6H28a6 6 0 0 1-6-6v-6Z",
};

export function placeholderFor(category, withLabel = true) {
  const d = GLYPHS[category] || GLYPHS.petiscos;
  const body = withLabel
    ? `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a3d2c"/><stop offset="1" stop-color="#2a1d14"/></linearGradient></defs>
    <rect width="100" height="75" fill="url(#g)"/>
    <g transform="translate(25 -4) scale(0.5)" fill="none" stroke="#d99a43" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="${d}"/></g>
    <text x="50" y="68" text-anchor="middle" font-family="Arial, sans-serif" font-size="5" letter-spacing="1" fill="#efc27d">FOTO ILUSTRATIVA</text>`
    : `<g transform="translate(54 10) scale(0.36)" fill="none" stroke="#d99a43" stroke-opacity="0.55" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><path d="${d}"/></g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid slice">${body}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function createImage(src, alt, category, { lazy = true, label = true } = {}) {
  const img = document.createElement("img");
  img.alt = alt;
  if (lazy) img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => {
    if (img.dataset.fallback) return; // evita laço infinito
    img.dataset.fallback = "1";
    img.src = placeholderFor(category, label);
  });

  if (!src) {
    img.dataset.fallback = "1";
    img.src = placeholderFor(category, label);
  } else {
    img.src = src;
  }
  return img;
}

export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value === true ? "" : value);
  }
  for (const child of children) if (child) node.append(child);
  return node;
}
