const PLAYLIST_URL =
  "https://open.spotify.com/playlist/3AUbHIY3ijtyhvs8YvG7HY";

export function initSpotify() {
  const root = document.getElementById("jukebox");
  if (!root) return;

  const tabs = [...root.querySelectorAll("[data-spotify-tab]")];
  const panels = [...root.querySelectorAll("[data-spotify-panel]")];
  const form = root.querySelector("#spotify-search-form");
  const input = root.querySelector("#spotify-search-input");
  const status = root.querySelector("#spotify-search-status");
  const results = root.querySelector("#spotify-search-results");

  if (!form || !input || !status || !results) return;

  let searchController = null;
  const pendingRequests = new Set();

  function switchTab(name) {
    tabs.forEach((tab) => {
      const active = tab.dataset.spotifyTab === name;

      if (tab.getAttribute("role") === "tab") {
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      }
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.spotifyPanel !== name;
    });

    if (name === "search") input.focus();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.spotifyTab);
    });
  });

  function createElement(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function setStatus(message, type = "") {
    status.textContent = message;
    status.className = "phone-search-status";
    if (type) status.classList.add(`is-${type}`);
  }

  function createTrackCard(track) {
    const card = createElement("article", "spotify-track");
    const cover = createElement("div", "spotify-track-cover");

    if (track.image) {
      const image = document.createElement("img");
      image.src = track.image;
      image.alt = `Capa do álbum ${track.album || track.name}`;
      image.loading = "lazy";
      image.onerror = () => image.remove();
      cover.append(image);
    } else {
      cover.textContent = "♫";
    }

    const info = createElement("div", "spotify-track-info");
    const title = createElement("strong", "spotify-track-title", track.name);
    const artist = createElement(
      "span",
      "spotify-track-artist",
      (track.artists || []).join(", ") || "Artista desconhecido"
    );

    info.append(title, artist);

    if (track.album) {
      info.append(createElement("span", "spotify-track-album", track.album));
    }

    const actions = createElement("div", "spotify-track-actions");

    const requestButton = createElement("button", "spotify-request-button", "Pedir");
    requestButton.type = "button";
    requestButton.addEventListener("click", () => sendRequest(track, requestButton));

    const shareButton = createElement("button", "spotify-share-button", "Compartilhar");
    shareButton.type = "button";
    shareButton.addEventListener("click", () => shareTrack(track));

    actions.append(requestButton, shareButton);
    card.append(cover, info, actions);

    return card;
  }

  async function searchTracks(query) {
    if (searchController) searchController.abort();
    searchController = new AbortController();

    results.replaceChildren();
    setStatus("Procurando no Spotify...");

    try {
      const response = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(query)}`,
        { signal: searchController.signal }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível pesquisar agora.");
      }

      const tracks = data.tracks || [];

      if (!tracks.length) {
        setStatus("Não encontramos essa música. Tente outro nome.");
        return;
      }

      setStatus(`${tracks.length} resultado(s) encontrado(s).`);
      results.replaceChildren(...tracks.map(createTrackCard));
    } catch (error) {
      if (error.name === "AbortError") return;

      setStatus(
        error.message || "Falha na pesquisa. Tente novamente.",
        "error"
      );
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = input.value.trim();

    if (query.length < 2 || query.length > 100) {
      setStatus("Digite entre 2 e 100 caracteres.", "error");
      return;
    }

    searchTracks(query);
  });

  async function sendRequest(track, button) {
    if (pendingRequests.has(track.uri)) return;

    pendingRequests.add(track.uri);
    button.disabled = true;
    button.textContent = "Enviando...";

    try {
      const response = await fetch("/api/music-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track_uri: track.uri })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível enviar o pedido.");
      }

      button.textContent = "Pedido enviado ✓";
      button.classList.add("is-requested");

      const notice = createElement(
        "p",
        "spotify-request-feedback",
        `Pedido registrado: ${track.name}. Aguarde a aprovação da equipe do Saideira.`
      );

      const previous = button.closest(".spotify-track")
        ?.querySelector(".spotify-request-feedback");

      if (previous) previous.remove();
      button.closest(".spotify-track")?.append(notice);
    } catch (error) {
      button.disabled = false;
      button.textContent = "Tentar novamente";
      setStatus(
        error.message || "Não foi possível enviar o pedido.",
        "error"
      );
    } finally {
      pendingRequests.delete(track.uri);
    }
  }

  function shareTrack(track) {
    const trackUrl = track.spotify_url || PLAYLIST_URL;
    const message =
      `🎵 Quero ouvir "${track.name}" — ${(track.artists || []).join(", ")} ` +
      `no Saideira! ${trackUrl}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  switchTab("playlist");
}