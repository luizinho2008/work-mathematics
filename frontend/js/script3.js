const flashcards = document.querySelectorAll(".flashcard");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalCounter = document.getElementById("modalCounter");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const searchInput = document.getElementById("searchInput");
const showFavoritesBtn = document.getElementById("showFavoritesBtn");
const gridContainer = document.getElementById("gridContainer");

const sair = () => location.href = "inicio.html";

// Dados dos flashcards
const flashcardData = [
  { title: "Retas e Planos", description: "Retas podem ser paralelas, concorrentes ou reversas. Planos podem ser paralelos ou concorrentes. Uma reta pode estar contida ou ser externa a um plano." },
  { title: "Ângulos", description: "Ângulos são formados por duas semi-retas com mesma origem. Tipos principais: agudo (< 90°), reto (= 90°), obtuso (> 90° e < 180°) e raso (= 180°)." },
  { title: "Polígonos", description: "Figuras planas fechadas formadas por segmentos de reta. Triângulos, quadriláteros, pentágonos, etc. A soma dos ângulos internos de um polígono de n lados é (n−2)×180°." },
  { title: "Círculo", description: "Figura plana delimitada por uma circunferência. Elementos: raio, diâmetro, corda, arco, setor circular e segmento circular." },
  { title: "Áreas", description: "Fórmulas importantes: Triângulo = (b × h)/2; Retângulo = b × h; Círculo = π × r²; Trapézio = [(B + b) × h]/2." },
  { title: "Prismas e Pirâmides", description: "Sólidos com bases planas. Prismas têm duas bases; pirâmides têm uma base e vértice. Volume do prisma = área da base × altura. Volume da pirâmide = (1/3) × área da base × altura." },
  { title: "Cilindros e Cones", description: "Cilindro tem duas bases circulares e superfície lateral curva. Cone tem uma base e um vértice. Volume do cilindro = πr²h. Volume do cone = (1/3)πr²h." },
  { title: "Esferas", description: "Corpo redondo em que todos os pontos estão a mesma distância do centro. Volume = (4/3)πr³. Área = 4πr²." },
  { title: "Volume e Capacidade", description: "Volume é o espaço ocupado por um corpo. Medido em m³, cm³, etc. Capacidade é o quanto cabe dentro, medida em litros. 1 L = 1000 cm³." },
  { title: "Teorema de Pitágoras", description: "Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos: c² = a² + b²." },
  { title: "Teorema de Tales", description: "Se linhas paralelas cortam dois lados de um triângulo, elas formam segmentos proporcionais nos lados cortados." },
  { title: "Área da Superfície de Prismas e Pirâmides", description: "Prisma: Área total = Soma das áreas das faces laterais + 2×área da base. Pirâmide: Área total = Área da base + Área das faces triangulares laterais." },
  { title: "Área da Superfície de Cilindros e Cones", description: "Cilindro: Área total = 2πr² + 2πrh. Cone: Área total = πr² + πr√(r²+h²) (geratriz = √(r²+h²))." },
  { title: "Teorema de Euler para Poliedros", description: "Para qualquer poliedro convexo: V - A + F = 2, onde V = vértices, A = arestas, F = faces." },
  { title: "Coordenadas Tridimensionais (3D)", description: "Pontos no espaço são representados por (x, y, z). Distância entre dois pontos: √((x2-x1)² + (y2-y1)² + (z2-z1)²)." },
  { title: "Diagonais de Poliedros", description: "Segmentos de reta que conectam dois vértices não consecutivos de um poliedro. Úteis para estudar estruturas internas." },
  { title: "Volume de Prismas Obliquos", description: "Volume = Área da base × altura perpendicular. Mesma fórmula dos prismas retos." },
  { title: "Volume de Pirâmides Oblíquas", description: "Volume = (1/3) × área da base × altura perpendicular." },
  { title: "Seção Transversal", description: "Interseção de um sólido com um plano. Pode gerar triângulos, quadrados, círculos, etc." },
  { title: "Relações Métricas no Espaço", description: "Distâncias, ângulos e projeções de pontos, retas e planos no espaço 3D." },
  { title: "Poliedros Regulares", description: "Sólidos convexos com faces congruentes e vértices idênticos. Exemplos: Tetraedro, Cubo, Octaedro, Dodecaedro, Icosaedro." },
  { title: "Cilindro Circunscrito", description: "Cilindro que envolve completamente um sólido, tocando todos os vértices da base." },
  { title: "Cone Circunscrito", description: "Cone que envolve uma pirâmide ou um polígono, passando por seus vértices." },
  { title: "Relação entre Área e Volume", description: "Sólidos similares: razão dos volumes = cubo da razão das arestas; razão das áreas = quadrado da razão das arestas." },
  { title: "Ângulos Sólidos", description: "Medida do ângulo tridimensional formado por faces que se encontram em um vértice de um sólido." },
  { title: "Projeção Ortogonal", description: "Projeção perpendicular de um ponto, reta ou figura sobre um plano ou eixo." },
  { title: "Teorema de Cavalieri", description: "Sólidos com alturas iguais e áreas de seções transversais iguais têm volumes iguais." }
];

let currentIndex = 0;

// Abrir modal ao clicar
flashcards.forEach(card => {
  card.addEventListener("click", () => {
    currentIndex = parseInt(card.dataset.index);
    showModal(currentIndex);
  });
});

function showModal(index) {
  const data = flashcardData[index];
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  modalCounter.textContent = `${index + 1} de ${flashcardData.length}`;
  favoriteBtn.classList.toggle("favorited", data.favorited);
  modal.style.display = "flex";
}

// Fechar modal
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });
window.addEventListener("keydown", e => { if(e.key === "Escape") modal.style.display = "none"; });

// Navegação
nextBtn.addEventListener("click", () => { currentIndex = (currentIndex + 1) % flashcardData.length; showModal(currentIndex); });
prevBtn.addEventListener("click", () => { currentIndex = (currentIndex - 1 + flashcardData.length) % flashcardData.length; showModal(currentIndex); });

// Favoritar
favoriteBtn.addEventListener("click", () => {
  flashcardData[currentIndex].favorited = !flashcardData[currentIndex].favorited;
  favoriteBtn.classList.toggle("favorited", flashcardData[currentIndex].favorited);
});

// Filtrar favoritos
let showingFavorites = false;
showFavoritesBtn.addEventListener("click", () => {
  showingFavorites = !showingFavorites;
  renderFlashcards();
  showFavoritesBtn.textContent = showingFavorites ? "Mostrar Todos" : "Mostrar Favoritos";
});

// Pesquisa
searchInput.addEventListener("input", () => renderFlashcards());

function renderFlashcards() {
  const query = searchInput.value.toLowerCase();
  gridContainer.innerHTML = "";

  flashcardData.forEach((card, i) => {
    if (showingFavorites && !card.favorited) return;
    if (!card.title.toLowerCase().includes(query)) return;

    const div = document.createElement("div");
    div.className = "flashcard";
    div.dataset.index = i;
    div.innerHTML = `<h3>${card.title}</h3>`;
    div.addEventListener("click", () => {
      currentIndex = i;
      showModal(currentIndex);
    });
    gridContainer.appendChild(div);
  });
}

// Inicializa
renderFlashcards();