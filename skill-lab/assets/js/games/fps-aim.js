// FPS 에임 훈련 게임 로직
let gameState = {
  isPlaying: false,
  score: 0,
  hits: 0,
  misses: 0,
  totalClicks: 0,
  reactionTimes: [],
  timeLeft: 30,
  currentTarget: null,
  targetStartTime: 0,
  gameTimer: null,
  targetTimer: null,
};

// 게임 시작
function startGame() {
  document.getElementById("startScreen").style.display = "none";
  gameState.isPlaying = true;
  gameState.score = 0;
  gameState.hits = 0;
  gameState.misses = 0;
  gameState.totalClicks = 0;
  gameState.reactionTimes = [];
  gameState.timeLeft = 30;

  updateStats();
  startGameTimer();
  spawnTarget();
}

// 게임 타이머 시작
function startGameTimer() {
  gameState.gameTimer = setInterval(() => {
    gameState.timeLeft--;
    document.getElementById("timer").textContent = gameState.timeLeft;

    if (gameState.timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// 타겟 생성
function spawnTarget() {
  if (!gameState.isPlaying) return;

  if (gameState.currentTarget) {
    gameState.currentTarget.remove();
  }

  const gameArea = document.getElementById("gameArea");
  const target = document.createElement("div");
  target.className = "target";

  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 60;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  target.style.left = x + "px";
  target.style.top = y + "px";

  target.addEventListener("click", hitTarget);
  gameArea.appendChild(target);

  gameState.currentTarget = target;
  gameState.targetStartTime = Date.now();

  gameState.targetTimer = setTimeout(() => {
    if (gameState.currentTarget === target) {
      target.remove();
      gameState.currentTarget = null;
      spawnTarget();
    }
  }, Math.random() * 2000 + 1000);
}

// 타겟 명중
function hitTarget(event) {
  event.stopPropagation();

  const reactionTime = Date.now() - gameState.targetStartTime;
  gameState.reactionTimes.push(reactionTime);
  gameState.hits++;
  gameState.totalClicks++;
  gameState.score += Math.max(100 - Math.floor(reactionTime / 10), 10);

  showHitEffect(
    event.target,
    "+" + Math.max(100 - Math.floor(reactionTime / 10), 10)
  );

  event.target.remove();
  gameState.currentTarget = null;
  clearTimeout(gameState.targetTimer);

  updateStats();

  setTimeout(spawnTarget, Math.random() * 500 + 200);
}

// 명중 효과 표시
function showHitEffect(target, text) {
  const effect = document.createElement("div");
  effect.className = "hit-effect";
  effect.textContent = text;
  effect.style.left = target.style.left;
  effect.style.top = target.style.top;

  document.getElementById("gameArea").appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 800);
}

// 미스 효과 표시
function showMissEffect(x, y) {
  const effect = document.createElement("div");
  effect.className = "miss-effect";
  effect.textContent = "MISS";
  effect.style.left = x + "px";
  effect.style.top = y + "px";

  document.getElementById("gameArea").appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 600);
}

// 통계 업데이트
function updateStats() {
  document.getElementById("score").textContent = gameState.score;

  const accuracy =
    gameState.totalClicks > 0
      ? Math.round((gameState.hits / gameState.totalClicks) * 100)
      : 100;
  document.getElementById("accuracy").textContent = accuracy + "%";

  const avgReaction =
    gameState.reactionTimes.length > 0
      ? Math.round(
          gameState.reactionTimes.reduce((a, b) => a + b, 0) /
            gameState.reactionTimes.length
        )
      : 0;
  document.getElementById("avgReaction").textContent = avgReaction + "ms";
}

// 게임 종료
function endGame() {
  gameState.isPlaying = false;
  clearInterval(gameState.gameTimer);
  clearTimeout(gameState.targetTimer);

  if (gameState.currentTarget) {
    gameState.currentTarget.remove();
  }

  document.getElementById("finalScore").textContent = gameState.score;
  document.getElementById("finalAccuracy").textContent =
    Math.round((gameState.hits / Math.max(gameState.totalClicks, 1)) * 100) +
    "%";
  document.getElementById("finalReaction").textContent =
    gameState.reactionTimes.length > 0
      ? Math.round(
          gameState.reactionTimes.reduce((a, b) => a + b, 0) /
            gameState.reactionTimes.length
        ) + "ms"
      : "0ms";
  document.getElementById("finalHits").textContent = gameState.hits;

  document.getElementById("gameOver").style.display = "flex";
}

// 게임 재시작
function restartGame() {
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("startScreen").style.display = "flex";
}

// 게임 영역 클릭 시 미스 처리
document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.getElementById("gameArea");
  if (gameArea) {
    gameArea.addEventListener("click", function (event) {
      if (!gameState.isPlaying) return;

      if (event.target === this) {
        gameState.misses++;
        gameState.totalClicks++;
        showMissEffect(event.offsetX, event.offsetY);
        updateStats();
      }
    });
  }
});
