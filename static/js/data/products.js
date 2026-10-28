export const CATEGORIES = [
  { id: "cervejas", label: "Cervejas" },
  { id: "chopps", label: "Chopps" },
  { id: "doses", label: "Doses e destilados" },
  { id: "caipirinhas", label: "Caipirinhas e batidas" },
  { id: "petiscos", label: "Petiscos e porções" },
];

const PHOTOS = ["cai-001","cai-002","cai-003","cai-005","cai-006","dos-003","dos-004","pet-001","pet-002","pet-003","pet-005","pet-006","pet-007","pet-008","pet-009","dos-002","dos-001","cer-001","cer-002","cer-003","cer-004","cer-007","cer-005","cer-006","cer-008","cho-001","cho-002","cho-003","cho-004","cho-005","cho-006"];

const img = (name) => (PHOTOS.includes(name) ? `/static/img/products/${name}.jpg` : "");

export const PRODUCTS = [
  // cervejas
  { id: "cer-001", name: "Original Tradicional 600 ml", category: "cervejas", description: "A garrafa de sempre, estupidamente gelada.", price: 18.0, image: img("cer-001"), available: true, info: "600 ml" },
  { id: "cer-002", name: "Heineken Tradicional 600 ml", category: "cervejas", description: "A verdinha mais famosa. Cerveja encorpada e com colarinho cremoso.", price: 20.0, image: img("cer-002"), available: true, info: "600 ml" },
  { id: "cer-003", name: "Brahma Tradicional 600ml", category: "cervejas", description: "O sabor marcante da tradição", price: 18.0, image: img("cer-003"), available: true, info: "600 ml" },
  { id: "cer-004", name: "Budweiser Tradicional 600ml", category: "cervejas", description: "Puro malte internacional, cor dourada e sabor marcante com final suave", price: 20.0, image: img("cer-004"), available: true, info: "600 ml" },
  { id: "cer-005", name: "Lata Original", category: "cervejas", description: "Lata geladinha para levar ou beber ali mesmo.", price: 7.0, image: img("cer-005"), available: true, info: "350 ml" },
  { id: "cer-006", name: "IPA da Casa", category: "cervejas", description: "Lupulada, cítrica e com final seco.", price: 22.0, image: img("cer-006"), available: false, info: "300 ml" },
  { id: "cer-007", name: "Balde com 3 Long Necks", category: "cervejas", description: "Três long necks no gelo para dividir com a turma.", price: 48.0, image: img("cer-007"), available: true, info: "3 x 600 ml" },
  { id: "cer-008", name: "Combo Balde Heineken", category: "cervejas", description: "Balde com 6 long necks.", price: 79.0, image: img("cer-008"), available: true, info: "6 x 600ml" },

  // chopps
  { id: "cho-001", name: "Chopp Claro 300 ml", category: "chopps", description: "Tirado na pressão certa, colarinho de dois dedos.", price: 9.5, image: img("cho-001"), available: true, info: "300 ml" },
  { id: "cho-002", name: "Chopp Claro 500 ml", category: "chopps", description: "O clássico caneco para a conversa render.", price: 14.0, image: img("cho-002"), available: true, info: "500 ml" },
  { id: "cho-003", name: "Chopp Escuro 300 ml", category: "chopps", description: "Notas de malte torrado e final suave.", price: 11.0, image: img("cho-003"), available: true, info: "300 ml" },
  { id: "cho-004", name: "Chopp Escuro 500 ml", category: "chopps", description: "Encorpado, cremoso e de bebericar sem pressa.", price: 16.0, image: img("cho-004"), available: true, info: "500 ml" },
  { id: "cho-005", name: "Chopp de Vinho 300 ml", category: "chopps", description: "Meio a meio de chopp claro e escuro, no estilo da casa.", price: 12.0, image: img("cho-005"), available: true, info: "300 ml" },
  { id: "cho-006", name: "Torre de Chopp 3 L", category: "chopps", description: "Torre com torneirinha para a mesa toda se servir.", price: 85.0, image: img("cho-006"), available: true, info: "3 litros" },

  // doses e destilados
  { id: "dos-001", name: "Shot de 51", category: "doses", description: "Clássica cachaça brasileira: destilado de cana-de-acuçar tradicional", price: 6.0, image: img("dos-001"), available: true, info: "50 ml" },
  { id: "dos-002", name: "Shot de 43", category: "doses", description: "Licor espanhol premiu, dourado e suave.", price: 28.0, image: img("dos-002"), available: false, info: "50 ml" },
  { id: "dos-003", name: "Cachaça com Sal e Limão", category: "doses", description: "Dose dupla de cachaça artesanal da casa, acompanhado de limãozin", price: 10.0, image: img("dos-003"), available: true, info: "50 ml" },
  { id: "dos-004", name: "Shot de Tequila", category: "doses", description: "Auntêntico destilado de agave azul, com sal e limão", price: 12.0, image: img("dos-004"), available: true, info: "50 ml" },

  // caipirinhas e batidas
  { id: "cai-001", name: "Caipirinha de Limão", category: "caipirinhas", description: "A tradicional: limão, açúcar, gelo e cachaça.", price: 16.0, image: img("cai-001"), available: true, info: "400 ml" },
  { id: "cai-002", name: "Caipirinha de Morango", category: "caipirinhas", description: "Morango macerado e um toque de limão.", price: 19.0, image: img("cai-002"), available: true, info: "400 ml" },
  { id: "cai-003", name: "Caipirinha de Maracujá", category: "caipirinhas", description: "Azedinha na medida certa, com polpa de verdade.", price: 19.0, image: img("cai-003"), available: true, info: "400 ml" },
  { id: "cai-005", name: "Batida de Coco", category: "caipirinhas", description: "Cremosa, gelada e com cachaça de leve.", price: 20.0, image: img("cai-005"), available: true, info: "400 ml" },
  { id: "cai-006", name: "Espanhola", category: "caipirinhas", description: "Vinho com abacaxi e leite condensado, cremosa na medida certa.", price: 24.0, image: img("cai-006"), available: true, info: "400 ml" },

  // petiscos e porções
  { id: "pet-001", name: "Batata Frita", category: "petiscos", description: "Crocante por fora e macia por dentro.", price: 28.0, image: img("pet-001"), available: true, info: "Serve 2 pessoas" },
  { id: "pet-002", name: "Calabresa Acebolada", category: "petiscos", description: "Calabresa na chapa com cebola dourada.", price: 34.0, image: img("pet-002"), available: true, info: "Serve 2 pessoas" },
  { id: "pet-003", name: "Torresmo Crocante", category: "petiscos", description: "Sequinho e estalando de crocante.", price: 32.0, image: img("pet-003"), available: true, info: "Serve 2 pessoas" },
  { id: "pet-005", name: "Amendoim Torrado", category: "petiscos", description: "Para beliscar enquanto a cerveja não chega.", price: 8.0, image: img("pet-005"), available: true, info: "Porção pequena" },
  { id: "pet-006", name: "Tábua de Frios", category: "petiscos", description: "Salames, azeitonas e ovos de codorna.", price: 58.0, image: img("pet-006"), available: true, info: "Serve 3 a 4 pessoas" },
  { id: "pet-007", name: "Mandioca Frita", category: "petiscos", description: "Dourada, macia e com molho verde.", price: 26.0, image: img("pet-007"), available: true, info: "Serve 2 pessoas" },
  { id: "pet-008", name: "Frango a Passarinho", category: "petiscos", description: "Pedacinhos fritos com alho e salsa.", price: 38.0, image: img("pet-008"), available: true, info: "Serve 2 a 3 pessoas" },
  { id: "pet-009", name: "Bolinho de Bacalhau", category: "petiscos", description: "Seis bolinhos crocantes com limão.", price: 36.0, image: img("pet-009"), available: false, info: "6 unidades" },
];

export const FEATURED = [
  { productId: "cer-008", title: "Balde da Turma", text: "Seis long necks no gelo e uma porção de batata frita. Pede e já sentou.", badge: "Combo demonstrativo", size: "large" },
  { productId: "pet-003", title: "O torresmo que estrala", text: "Sequinho, estalando e feito na hora.", badge: "Clássico da casa", size: "medium" },
  { productId: "cai-007", title: "Drink da Casa", text: "Cachaça, mel, limão-siciliano e hortelã.", badge: "Autoral", size: "medium" },
  { productId: "cho-006", title: "Torre de Chopp", text: "Três litros e uma torneirinha na mesa.", badge: "Para dividir", size: "wide" },
];
