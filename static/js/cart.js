// sacola

import { PRODUCTS } from "./data/products.js";
import { toCents } from "./format.js";

const STORAGE_KEY = "boteco.sacolinha.v1";
const MAX_QTY = 99;

const productsById = new Map(PRODUCTS.map((p) => [p.id, p]));
const listeners = new Set();

// items: Map<productId, quantity>. O id evita duplicar o mesmo produto.
let items = new Map();

export const getProduct = (id) => productsById.get(id);

function sanitizeQty(value) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 1) return 0;
  return Math.min(n, MAX_QTY);
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...items].map(([id, qty]) => ({ id, qty }))));
  } catch {
    /* armazenamento indisponível, segue só em memória - IMPLEMENTAR*/
  }
}

function notify() {
  save();
  const snapshot = getState();
  listeners.forEach((fn) => fn(snapshot));
}

export function subscribe(fn) {
  listeners.add(fn);
  fn(getState());
  return () => listeners.delete(fn);
}

export function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(raw)) {
      for (const entry of raw) {
        const product = productsById.get(entry?.id);
        const qty = sanitizeQty(entry?.qty);
        if (product && product.available && qty) items.set(product.id, qty);
      }
    }
  } catch {
    items = new Map();
  }
  notify();
}

export function add(id, amount = 1) {
  const product = productsById.get(id);
  if (!product || !product.available) return { ok: false, reason: "indisponivel" };
  const qty = sanitizeQty((items.get(id) || 0) + sanitizeQty(amount));
  items.set(id, qty);
  notify();
  return { ok: true, qty };
}

export function setQty(id, qty) {
  if (!items.has(id)) return;
  const clean = sanitizeQty(qty);
  if (clean === 0) items.delete(id);
  else items.set(id, clean);
  notify();
}

export const increment = (id) => setQty(id, (items.get(id) || 0) + 1);
export const decrement = (id) => setQty(id, (items.get(id) || 0) - 1);

export function remove(id) {
  if (items.delete(id)) notify();
}

export function clear() {
  if (items.size === 0) return;
  items.clear();
  notify();
}

export function getState() {
  const lines = [...items].map(([id, qty]) => {
    const product = productsById.get(id);
    const unitCents = toCents(product.price);
    return { product, qty, unitCents, subtotalCents: unitCents * qty };
  });
  return {
    lines,
    totalQty: lines.reduce((sum, l) => sum + l.qty, 0),
    subtotalCents: lines.reduce((sum, l) => sum + l.subtotalCents, 0),
  };
}
