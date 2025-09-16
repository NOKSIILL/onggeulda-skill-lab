// 메모리 게임
let memoryState = {
  cards: [],
  flippedCards: [],
  matches: 0,
  moves: 0,
  score: 0,
};

// 메모리 게임 시작
function startMemoryGame() {
  const symbols = ["🎮", "🎯", "🎲", "🎪", "🎨", "🎵", "⭐", "🔥"];
  const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

  memoryState.cards = cards;
  memoryState.flippedCards = [];
  memoryState.matches = 0;
  memoryState.moves = 0;
  memoryState.score = 0;

  const grid = document.getElementById("memoryGrid");
  if (!grid) return;

  grid.innerHTML = "";

  cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.index = index;
    card.dataset.symbol = symbol;
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });

  updateMemoryStats();
}

// 카드 뒤집기
function flipCard(event) {
  const card = event.target;
  const index = parseInt(card.dataset.index);

  if (
    card.classList.contains("flipped") ||
    card.classList.contains("matched") ||
    memoryState.flippedCards.length >= 2
  ) {
    return;
  }

  card.classList.add("flipped");
  card.textContent = card.dataset.symbol;
  memoryState.flippedCards.push(index);

  if (memoryState.flippedCards.length === 2) {
    memoryState.moves++;

    const [first, second] = memoryState.flippedCards;
    const firstCard = document.querySelector(`[data-index="${first}"]`);
    const secondCard = document.querySelector(`[data-index="${second}"]`);

    if (memoryState.cards[first] === memoryState.cards[second]) {
      // 매치!
      setTimeout(() => {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        memoryState.matches++;
        memoryState.score += 100;
        memoryState.flippedCards = [];
        updateMemoryStats();

        if (memoryState.matches === 8) {
          setTimeout(() => alert("축하합니다! 게임 완료!"), 500);
        }
      }, 500);
    } else {
      // 불일치
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = "";
        secondCard.textContent = "";
        memoryState.flippedCards = [];
      }, 500);
    }

    updateMemoryStats();
  }
}

// 메모리 게임 통계 업데이트
function updateMemoryStats() {
  const scoreElement = document.getElementById("memoryScore");
  const matchesElement = document.getElementById("matches");
  const movesElement = document.getElementById("moves");

  if (scoreElement) {
    scoreElement.textContent = memoryState.score;
  }

  if (matchesElement) {
    matchesElement.textContent = `${memoryState.matches}/8`;
  }

  if (movesElement) {
    movesElement.textContent = memoryState.moves;
  }
}
