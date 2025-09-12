// 색깔 맞추기 게임
let colorGameState = {
  score: 0,
  level: 1,
  correct: 0,
  total: 0,
  targetColor: "",
  options: [],
};

// 색깔 게임 시작
function startColorGame() {
  colorGameState.score = 0;
  colorGameState.level = 1;
  colorGameState.correct = 0;
  colorGameState.total = 0;

  generateColorChallenge();
  updateColorStats();
}

// 색상 챌린지 생성
function generateColorChallenge() {
  const colors = [];

  // 타겟 색상 생성
  const targetHue = Math.floor(Math.random() * 360);
  const targetSat = 50 + Math.floor(Math.random() * 50);
  const targetLight = 40 + Math.floor(Math.random() * 40);
  colorGameState.targetColor = `hsl(${targetHue}, ${targetSat}%, ${targetLight}%)`;

  // 옵션 색상들 생성 (하나는 정답)
  colors.push(colorGameState.targetColor);

  for (let i = 0; i < 5; i++) {
    const hue = (targetHue + (Math.random() - 0.5) * 60 + 360) % 360;
    const sat = Math.max(
      20,
      Math.min(100, targetSat + (Math.random() - 0.5) * 40)
    );
    const light = Math.max(
      20,
      Math.min(80, targetLight + (Math.random() - 0.5) * 30)
    );
    colors.push(`hsl(${hue}, ${sat}%, ${light}%)`);
  }

  // 섞기
  colors.sort(() => Math.random() - 0.5);
  colorGameState.options = colors;

  // UI 업데이트
  const targetColorElement = document.getElementById("targetColor");
  if (targetColorElement) {
    targetColorElement.style.backgroundColor = colorGameState.targetColor;
  }

  const optionsContainer = document.getElementById("colorOptions");
  if (optionsContainer) {
    optionsContainer.innerHTML = "";

    colors.forEach((color, index) => {
      const option = document.createElement("div");
      option.className = "color-option";
      option.style.backgroundColor = color;
      option.addEventListener("click", () => selectColor(color));
      optionsContainer.appendChild(option);
    });
  }
}

// 색상 선택
function selectColor(selectedColor) {
  colorGameState.total++;

  if (selectedColor === colorGameState.targetColor) {
    colorGameState.correct++;
    colorGameState.score += colorGameState.level * 10;

    if (colorGameState.correct % 5 === 0) {
      colorGameState.level++;
    }
  }

  updateColorStats();
  setTimeout(generateColorChallenge, 500);
}

// 색상 게임 통계 업데이트
function updateColorStats() {
  const scoreElement = document.getElementById("colorScore");
  const levelElement = document.getElementById("colorLevel");
  const accuracyElement = document.getElementById("colorAccuracy");

  if (scoreElement) {
    scoreElement.textContent = colorGameState.score;
  }

  if (levelElement) {
    levelElement.textContent = colorGameState.level;
  }

  if (accuracyElement) {
    const accuracy =
      colorGameState.total > 0
        ? Math.round((colorGameState.correct / colorGameState.total) * 100)
        : 100;
    accuracyElement.textContent = accuracy + "%";
  }
}
