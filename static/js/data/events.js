export const EVENT_TYPES = {
  karaoke: { label: "Karaokê", symbol: "♪" },
  playlist: { label: "Playlist da casa", symbol: "◐" },
  classicos: { label: "Clássicos", symbol: "★" },
  retro: { label: "Anos 80 e 90", symbol: "◆" },
  nacional: { label: "Música nacional", symbol: "✦" },
};

export const EVENTS = [
  { id: "ev-001", name: "Noite de Karaokê", day: 4, dayLabel: "Quinta", time: "20h", type: "karaoke", highlight: true, description: "O microfone é seu. Escolha a música, suba e mande ver, sem julgamento." },
  { id: "ev-002", name: "Sextou com a Playlist da Casa", day: 5, dayLabel: "Sexta", time: "19h", type: "playlist", highlight: false, description: "A trilha da casa para começar o fim de semana com a cerveja no ponto." },
  { id: "ev-003", name: "Noite de Clássicos Brasileiros", day: 3, dayLabel: "Quarta", time: "19h30", type: "classicos", highlight: false, description: "Samba, MPB e bossa para cantar junto e conversar sem pressa." },
  { id: "ev-004", name: "Especial Anos 80 e 90", day: 6, dayLabel: "Sábado", time: "21h", type: "retro", highlight: false, description: "Pop, rock e aquela música que todo mundo sabe cantar o refrão." },
  { id: "ev-005", name: "Roda de Música Nacional", day: 0, dayLabel: "Domingo", time: "16h", type: "nacional", highlight: false, description: "Tarde de petisco, roda de conversa e música brasileira ao vivo no som da casa." },
];

// comportamento do destaque musical:
//  "fixed"  -> sempre destaca o evento com highlight: true
//  "today"  -> destaca o evento de hoje; se não houver, cai no destaque fixo
export const HIGHLIGHT_MODE = "fixed";
