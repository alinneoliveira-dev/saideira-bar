// configs da jukebok é aqui

import { PLAYLISTS, TRACKS } from "./data/tracks.js";
import { el } from "./format.js";

const ICONS = {
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h2v12H6zM20 6v12L9.5 12z" fill="currentColor"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 6h2v12h-2zM4 6l10.5 6L4 18z" fill="currentColor"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>',
};

export function initJukebox() {
  const root = document.getElementById("jukebox-machine");
  const audio = new Audio();
  audio.preload = "none";

  const s = { playlist: PLAYLISTS[0].id, trackId: null, state: "idle" };
  const trackById = (id) => TRACKS.find((t) => t.id === id);
  const current = () => trackById(s.trackId);
  const inPlaylist = () => TRACKS.filter((t) => t.playlist === s.playlist);

  // fixo
  const stateLabel = el("span", { text: "Escolha uma faixa" });
  const nowEl = el("p", { class: "jb-now" });
  const demoEl = el("p", { class: "jb-demo" });
  const display = el("div", { class: "jb-display", "aria-live": "polite" },
    el("div", { class: "jb-state" }, el("span", { class: "jb-dot" }), stateLabel), nowEl, demoEl);

  const tabs = el("div", { class: "jb-tabs", role: "group", "aria-label": "Playlists" });
  const list = el("div", { class: "jb-tracks", role: "group", "aria-label": "Faixas" });

  const mkBtn = (cls, icon, label, handler) => {
    const b = el("button", { type: "button", class: cls, "aria-label": label });
    b.innerHTML = icon;
    b.addEventListener("click", handler);
    return b;
  };
  const prevBtn = mkBtn("jb-btn", ICONS.prev, "Faixa anterior", () => step(-1));
  const playBtn = mkBtn("jb-btn jb-btn-main", ICONS.play, "Tocar", togglePlay);
  const nextBtn = mkBtn("jb-btn", ICONS.next, "Próxima faixa", () => step(1));
  const controls = el("div", { class: "jb-controls" }, prevBtn, playBtn, nextBtn);

  root.replaceChildren(el("div", { class: "jb-arch", "aria-hidden": "true" }), display, tabs, list, controls);

  function setState(next) {
    s.state = next;
    root.dataset.state = next;
    render();
  }

  function select(id) {
    const track = trackById(id);
    if (!track) return;
    audio.pause();
    s.trackId = id;
    if (track.src) {
      audio.src = track.src;
    } else {
      audio.removeAttribute("src");
    }
    setState("selected");
  }

  function togglePlay() {
    const track = current() || inPlaylist()[0];
    if (!track) return;
    if (!current()) select(track.id);
    if (!track.src) return; // modo demonstração: não há áudio, nada começa a "tocar" ainda

    if (s.state === "playing") {
      audio.pause();
    } else {
      audio.play().catch(() => setState("selected")); // bloqueio de autoplay ou arquivo inválido
    }
  }

  function step(dir) {
    const tracks = inPlaylist();
    if (!tracks.length) return;
    const i = tracks.findIndex((t) => t.id === s.trackId);
    const next = tracks[(i + dir + tracks.length) % tracks.length];
    const wasPlaying = s.state === "playing";
    select(next.id);
    if (wasPlaying && next.src) audio.play().catch(() => setState("selected"));
  }

  audio.addEventListener("play", () => setState("playing"));
  audio.addEventListener("pause", () => { if (!audio.ended && s.state === "playing") setState("paused"); });
  audio.addEventListener("ended", () => step(1));
  audio.addEventListener("error", () => { if (current()?.src) setState("selected"); });

  function renderTabs() {
    tabs.replaceChildren(...PLAYLISTS.map((pl) => {
      const b = el("button", { type: "button", class: "jb-tab", "aria-pressed": String(pl.id === s.playlist), text: pl.label });
      b.addEventListener("click", () => { s.playlist = pl.id; render(); });
      return b;
    }));
  }

  function renderTracks() {
    list.replaceChildren(...inPlaylist().map((t, i) => {
      const selected = t.id === s.trackId;
      const b = el("button", { type: "button", class: "jb-track", "aria-pressed": String(selected) },
        el("span", { class: "jb-num", "aria-hidden": "true", text: String(i + 1).padStart(2, "0") }),
        el("span", { class: "jb-name" }, el("strong", { text: t.title }), el("span", { text: t.artist })),
        el("span", { class: "jb-dur", text: t.duration }));
      b.addEventListener("click", () => select(t.id));
      return b;
    }));
  }

  function renderDisplay() {
    const t = current();
    const hasAudio = Boolean(t?.src);
    const labels = {
      idle: "Escolha uma faixa",
      selected: hasAudio ? "Faixa selecionada" : "Selecionada · modo demonstração",
      playing: "Tocando",
      paused: "Pausada",
    };
    stateLabel.textContent = labels[s.state];
    nowEl.replaceChildren();
    if (t) {
      nowEl.append(document.createTextNode(t.title), el("small", { text: t.artist }));
    }
    demoEl.textContent = t && !hasAudio ? "Demonstração: esta faixa não tem áudio, então nada está tocando." : "";

    const playing = s.state === "playing";
    playBtn.innerHTML = playing ? ICONS.pause : ICONS.play;
    playBtn.setAttribute("aria-label", playing ? "Pausar" : "Tocar");
    playBtn.disabled = Boolean(t) && !hasAudio;
  }

  function render() {
    renderTabs();
    renderTracks();
    renderDisplay();
  }

  root.dataset.state = "idle";
  render();
}
