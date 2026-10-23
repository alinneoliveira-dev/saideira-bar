// montagem do pedido

import { formatCents } from "./format.js";

export function buildOrderSummary(lines, barName) {
  if (!lines.length) return "";
  const rows = lines.map(
    ({ product, qty, unitCents, subtotalCents }) =>
      `${qty}x ${product.name} (${formatCents(unitCents)} cada) = ${formatCents(subtotalCents)}`
  );
  const total = lines.reduce((sum, l) => sum + l.subtotalCents, 0);
  return [`Pedido - ${barName}`, "", ...rows, "", `Total: ${formatCents(total)}`].join("\n");
}

export function buildWhatsAppUrl(number, summary) {
  const digits = String(number || "").replace(/\D/g, "");
  if (!digits || !summary) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(summary)}`;
}
