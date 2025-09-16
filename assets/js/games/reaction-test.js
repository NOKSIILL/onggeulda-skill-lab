// 반응속도 테스트 게임
let reactionState = {
  isWaiting: false,
  startTime: 0,
  reactions: [],
  bestTime: Infinity,
};

// 반응 테스트 리셋
function resetReactionTest() {
  const area = document.getElementById("reactionArea");
  const text = document.getElementById("reactionText");
  if (area && text) {
    area.className = "reaction-area";
    text.textContent = "클릭해서 시작하세요!";
    reactionState.isWaiting = false;
  }
}

// 반응 클릭 처리
function handleReactionClick() {
  const area = document.getElementById("reactionArea");
  const text = document.getElementById("reactionText");

  if (!area || !text) return;

  if (!reactionState.isWaiting) {
    // 게임 시작
    area.className = "reaction-area waiting";
    text.textContent = "초록색이 되면 클릭하세요!";
    reactionState.isWaiting = true;

    setTimeout(() => {
      if (reactionState.isWaiting) {
        area.className = "reaction-area ready";
        text.textContent = "지금 클릭!";
        reactionState.startTime = Date.now();
      }
    }, Math.random() * 3000 + 1000);
  } else if (area.classList.contains("ready")) {
    // 반응 측정
    const reactionTime = Date.now() - reactionState.startTime;
    reactionState.reactions.push(reactionTime);

    if (reactionTime < reactionState.bestTime) {
      reactionState.bestTime = reactionTime;
    }

    text.textContent = `${reactionTime}ms!  클릭해서 다시 시도`;
    area.className = "reaction-area";
    reactionState.isWaiting = false;

    // 통계 업데이트
    updateReactionStats();
  } else {
    // 너무 빨리 클릭
    text.textContent = "너무 빨라요!  클릭해서 다시 시도";
    area.className = "reaction-area";
    reactionState.isWaiting = false;
  }
}

// 반응속도 통계 업데이트
function updateReactionStats() {
  const bestElement = document.getElementById("bestReaction");
  const avgElement = document.getElementById("avgReactionTime");
  const attemptsElement = document.getElementById("attempts");

  if (bestElement) {
    bestElement.textContent = reactionState.bestTime + "ms";
  }

  if (avgElement && reactionState.reactions.length > 0) {
    const avg = Math.round(
      reactionState.reactions.reduce((a, b) => a + b, 0) /
        reactionState.reactions.length
    );
    avgElement.textContent = avg + "ms";
  }

  if (attemptsElement) {
    attemptsElement.textContent = reactionState.reactions.length;
  }
}
