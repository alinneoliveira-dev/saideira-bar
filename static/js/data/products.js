export const CATEGORIES = [
  { id: "cervejas", label: "Cervejas" },
  { id: "chopes", label: "Chopes" },
  { id: "doses", label: "Doses e destilados" },
  { id: "caipirinhas", label: "Caipirinhas e batidas" },
  { id: "petiscos", label: "Petiscos e porções" },
];

const PHOTOS = [];

const img = (name) => (PHOTOS.includes(name) ? `/static/img/products/${name}.jpg` : "");

export const PRODUCTS = [
  // ---- Cervejas
  { id: "cer-001", name: "Pilsen Tradicional 600 ml", category: "cervejas", description: "A garrafa de sempre, estupidamente gelada.", price: 14.0, image: img("cer-001"), available: true, info: "600 ml" },
  { id: "cer-002", name: "Pilsen Premium 600 ml", category: "cervejas", description: "Mais corpo, amargor suave e espuma cremosa.", price: 18.0, image: img("cer-002"), available: true, info: "600 ml" },
  { id: "cer-003", name: "Long Neck Pilsen", category: "cervejas", description: "Para quem prefere a garrafinha no balcão.", price: 9.0, image: img("cer-003"), available: true, info: "330 ml" },
  { id: "cer-004", name: "Long Neck Premium", category: "cervejas", description: "Puro malte, dourada e refrescante.", price: 12.0, image: img("cer-004"), available: true, info: "330 ml" },
  { id: "cer-005", name: "Lata Pilsen", category: "cervejas", description: "Lata geladinha para levar ou beber ali mesmo.", price: 7.5, image: img("cer-005"), available: true, info: "350 ml" },
  { id: "cer-006", name: "IPA da Casa", category: "cervejas", description: "Lupulada, cítrica e com final seco.", price: 22.0, image: img("cer-006"), available: false, info: "500 ml" },
  { id: "cer-007", name: "Balde com 6 Long Necks", category: "cervejas", description: "Seis long necks no gelo para dividir com a turma.", price: 48.0, image: img("cer-007"), available: true, info: "6 x 330 ml" },
  { id: "cer-008", name: "Combo Balde + Porção", category: "cervejas", description: "Balde com 6 long necks e uma porção de batata frita.", price: 79.0, image: img("cer-008"), available: true, info: "Combinação" },

  // ---- Chopes
  { id: "cho-001", name: "Chope Claro 300 ml", category: "chopes", description: "Tirado na pressão certa, colarinho de dois dedos.", price: 9.5, image: img("cho-001"), available: true, info: "300 ml" },
  { id: "cho-002", name: "Chope Claro 500 ml", category: "chopes", description: "O clássico caneco para a conversa render.", price: 14.0, image: img("cho-002"), available: true, info: "500 ml" },
  { id: "cho-003", name: "Chope Escuro 300 ml", category: "chopes", description: "Notas de malte torrado e final suave.", price: 11.0, image: img("cho-003"), available: true, info: "300 ml" },
  { id: "cho-004", name: "Chope Escuro 500 ml", category: "chopes", description: "Encorpado, cremoso e de bebericar sem pressa.", price: 16.0, image: img("cho-004"), available: true, info: "500 ml" },
  { id: "cho-005", name: "Chope de Vinho 300 ml", category: "chopes", description: "Meio a meio de chope claro e escuro, no estilo da casa.", price: 12.0, image: img("cho-005"), available: true, info: "300 ml" },
  { id: "cho-006", name: "Torre de Chope 3 L", category: "chopes", description: "Torre com torneirinha para a mesa toda se servir.", price: 85.0, image: img("cho-006"), available: true, info: "3 litros" },

  // ---- Doses e destilados
  { id: "dos-001", name: "Cachaça Tradicional", category: "doses", description: "Dose da prata da casa, direto do alambique.", price: 6.0, image: img("dos-001"), available: true, info: "50 ml" },
  { id: "dos-002", name: "Cachaça Envelhecida", category: "doses", description: "Amadeirada, para tomar devagar.", price: 12.0, image: img("dos-002"), available: true, info: "50 ml" },
  { id: "dos-003", name: "Cachaça com Mel e Limão", category: "doses", description: "Especial da casa, suave de descer.", price: 10.0, image: img("dos-003"), available: true, info: "50 ml" },
  { id: "dos-004", name: "Shot de Tequila", category: "doses", description: "Acompanha limão e sal.", price: 12.0, image: img("dos-004"), available: true, info: "40 ml" },
  { id: "dos-005", name: "Licor de Jenipapo", category: "doses", description: "Doce, aromático e bem brasileiro.", price: 9.0, image: img("dos-005"), available: true, info: "50 ml" },
  { id: "dos-006", name: "Amaro da Casa", category: "doses", description: "Digestivo de ervas para fechar a noite.", price: 11.0, image: img("dos-006"), available: false, info: "50 ml" },

  // ---- Caipirinhas e batidas
  { id: "cai-001", name: "Caipirinha de Limão", category: "caipirinhas", description: "A tradicional: limão, açúcar, gelo e cachaça.", price: 16.0, image: img("cai-001"), available: true, info: "400 ml" },
  { id: "cai-002", name: "Caipirinha de Morango", category: "caipirinhas", description: "Morango macerado e um toque de limão.", price: 19.0, image: img("cai-002"), available: true, info: "400 ml" },
  { id: "cai-003", name: "Caipirinha de Maracujá", category: "caipirinhas", description: "Azedinha na medida certa, com polpa de verdade.", price: 19.0, image: img("cai-003"), available: true, info: "400 ml" },
  { id: "cai-004", name: "Caipiroska de Limão", category: "caipirinhas", description: "Mesma receita da caipirinha, com vodca.", price: 20.0, image: img("cai-004"), available: true, info: "400 ml" },
  { id: "cai-005", name: "Batida de Coco", category: "caipirinhas", description: "Cremosa, gelada e com cachaça de leve.", price: 18.0, image: img("cai-005"), available: true, info: "400 ml" },
  { id: "cai-006", name: "Batida de Amendoim", category: "caipirinhas", description: "Sabor de paçoca em forma de drink.", price: 18.0, image: img("cai-006"), available: true, info: "400 ml" },
  { id: "cai-007", name: "Drink da Casa", category: "caipirinhas", description: "Cachaça, mel, limão-siciliano e hortelã. A receita é segredo.", price: 24.0, image: img("cai-007"), available: true, info: "350 ml" },

  // ---- Petiscos e porções
  { id: "pet-001", name: "Batata Frita", category: "petiscos", description: "Crocante por fora, macia por dentro, com molho da casa.", price: 28.0, image: img("pet-001"), available: true, info: "Serve 2 pessoas" },
  { id: "pet-002", name: "Calabresa Acebolada", category: "petiscos", description: "Calabresa na chapa com cebola dourada.", price: 34.0, image: img("pet-002"), available: true, info: "Serve 2 pessoas" },
  { id: "pet-003", name: "Torresmo Crocante", category: "petiscos", description: "Sequinho e estalando de crocante.", price: 32.0, image: img("pet-003"), available: true, info: "Serve 2 pessoas" },
  { id: "pet-004", name: "Pão de Alho", category: "petiscos", description: "Pão quentinho com manteiga de alho e queijo gratinado.", price: 18.0, image: img("pet-004"), available: true, info: "4 unidades" },
  { id: "pet-005", name: "Amendoim Torrado", category: "petiscos", description: "Para beliscar enquanto a cerveja não chega.", price: 8.0, image: img("pet-005"), available: true, info: "Porção pequena" },
  { id: "pet-006", name: "Tábua de Frios", category: "petiscos", description: "Queijos, salame, presunto, azeitonas e torradas.", price: 58.0, image: img("pet-006"), available: true, info: "Serve 3 a 4 pessoas" },
  { id: "pet-007", name: "Mandioca Frita", category: "petiscos", description: "Dourada, macia e com molho verde.", price: 26.0, image: img("pet-007"), available: true, info: "Serve 2 pessoas" },
  { id: "pet-008", name: "Frango a Passarinho", category: "petiscos", description: "Pedacinhos fritos com alho e salsa.", price: 38.0, image: img("pet-008"), available: true, info: "Serve 2 a 3 pessoas" },
  { id: "pet-009", name: "Bolinho de Bacalhau", category: "petiscos", description: "Cinco bolinhos crocantes com limão.", price: 36.0, image: img("pet-009"), available: false, info: "5 unidades" },
  { id: "pet-010", name: "Pastel de Queijo", category: "petiscos", description: "Massa fininha e recheio generoso, frito na hora.", price: 14.0, image: img("pet-010"), available: true, info: "Unidade" },
];

export const FEATURED = [
  { productId: "cer-008", title: "Balde da Turma", text: "Seis long necks no gelo e uma porção de batata frita. Pede e já sentou.", badge: "Combo demonstrativo", size: "large" },
  { productId: "pet-003", title: "O torresmo que estrala", text: "Sequinho, estalando e feito na hora.", badge: "Clássico da casa", size: "medium" },
  { productId: "cai-007", title: "Drink da Casa", text: "Cachaça, mel, limão-siciliano e hortelã.", badge: "Autoral", size: "medium" },
  { productId: "cho-006", title: "Torre de Chope", text: "Três litros e uma torneirinha na mesa.", badge: "Para dividir", size: "wide" },
];
