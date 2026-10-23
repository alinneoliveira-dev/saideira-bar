// porogramação musical -> data/events.js.

import { EVENTS, EVENT_TYPES, HIGHLIGHT_MODE } from "./data/events.js";
import { el } from "./format.js";

function pickSpotlight() {
  const fixed = EVENTS.find((e) => e.highlight) || EVENTS[0];
  if (HIGHLIGHT_MODE !== "today") return fixed;
  const today = new Date().getDay();
  // Dia sem programação: cai no destaque fixo em vez de mostrar um vazio.
  return EVENTS.find((e) => e.day === today) || fixed;
}

export function initMusic() {
  const spotEl = document.getElementById("spotlight");
  const listEl = document.getElementById("week-list");
  if (!EVENTS.length) {
    spotEl.hidden = true;
    return;
  }

  const spot = pickSpotlight();
  const type = EVENT_TYPES[spot.type] || { label: "Evento", symbol: "♪" };
  spotEl.replaceChildren(
    el("div", { class: "spot-date" },
      el("span", { class: "spot-day", text: spot.dayLabel }),
      el("span", { class: "spot-time", text: spot.time }),
      el("span", { class: "spot-symbol", "aria-hidden": "true", text: type.symbol })),
    el("div", { class: "spot-body" },
      el("p", { class: "spot-label", text: `Em destaque · ${type.label}` }),
      el("h3", { text: spot.name }),
      el("p", { text: spot.description }),
      el("span", { class: "spot-demo", text: "Evento demonstrativo" }))
  );

  const order = (d) => (d === 0 ? 7 : d);
  const sorted = [...EVENTS].sort((a, b) => order(a.day) - order(b.day));

  listEl.replaceChildren(
    ...sorted.map((ev) => {
      const t = EVENT_TYPES[ev.type] || { label: "Evento", symbol: "♪" };
      return el("li", { class: `week-card${ev.id === spot.id ? " is-active" : ""}` },
        el("span", { class: "week-type" }, el("span", { "aria-hidden": "true", text: t.symbol }), document.createTextNode(t.label)),
        el("p", { class: "week-when" }, document.createTextNode(ev.dayLabel), el("small", { text: ev.time })),
        el("h3", { text: ev.name }),
        el("p", { text: ev.description })
      );
    })
  );
}
