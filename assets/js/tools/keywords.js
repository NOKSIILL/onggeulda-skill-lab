// 키워드 생성기
const keywordData = {
  nouns: [
    "바다",
    "산",
    "별",
    "꿈",
    "여행",
    "책",
    "음악",
    "햇살",
    "바람",
    "구름",
    "꽃",
    "나무",
    "새",
    "달",
    "강",
    "숲",
    "길",
    "집",
    "친구",
    "사랑",
  ],
  adjectives: [
    "아름다운",
    "신비로운",
    "따뜻한",
    "차가운",
    "밝은",
    "어두운",
    "큰",
    "작은",
    "빠른",
    "느린",
    "새로운",
    "오래된",
    "깊은",
    "높은",
    "넓은",
    "좁은",
    "강한",
    "약한",
    "부드러운",
    "거친",
  ],
};

// 키워드 생성
function generateKeywords() {
  const grid = document.getElementById("keywordGrid");
  if (!grid) return;

  grid.innerHTML = "";

  // 명사 3개, 형용사 3개 생성
  const selectedNouns = shuffleArray(keywordData.nouns).slice(0, 3);
  const selectedAdjectives = shuffleArray(keywordData.adjectives).slice(0, 3);

  [...selectedNouns, ...selectedAdjectives].forEach((keyword) => {
    const tag = document.createElement("div");
    tag.className = "keyword-tag";
    tag.textContent = keyword;

    tag.addEventListener("mouseenter", () => {
      tag.style.background = "rgba(0,255,136,0.3)";
      tag.style.transform = "translateY(-2px)";
    });

    tag.addEventListener("mouseleave", () => {
      tag.style.background = "rgba(0,255,136,0.2)";
      tag.style.transform = "translateY(0)";
    });

    grid.appendChild(tag);
  });
}

// 키워드 복사
function copyKeywords() {
  const tags = document.querySelectorAll(".keyword-tag");
  const keywords = Array.from(tags).map((tag) => tag.textContent);

  copyToClipboard(keywords.join(", "))
    .then(() => {
      showCopyNotification("키워드가 복사되었습니다!");
    })
    .catch(() => {
      alert("복사에 실패했습니다. 다시 시도해주세요.");
    });
}
