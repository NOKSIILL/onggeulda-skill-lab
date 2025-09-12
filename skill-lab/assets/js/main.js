// 전역 변수
let currentLanguage = "ko";

// 페이지 전환 함수
function showPage(page) {
  // 모든 페이지 숨기기
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("active");
  });

  // 네비게이션 활성화 상태 변경
  document
    .querySelectorAll(".nav-item")
    .forEach((item) => item.classList.remove("active"));

  // 선택된 페이지만 보이기
  document.getElementById(page + "Page").classList.add("active");
  document
    .getElementById("nav" + page.charAt(0).toUpperCase() + page.slice(1))
    .classList.add("active");

  // 페이지별 초기화
  if (page === "tools") {
    generateColorPalette();
    generateKeywords();
  }
}

// 배너 슬라이드
let currentSlide = 0;
const slides = document.querySelectorAll(".banner-slide");

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(nextSlide, 4000);

// 게임 선택
function selectGame(gameId) {
  // 사이드바 활성화 상태 변경
  document
    .querySelectorAll("#gamesPage .game-item")
    .forEach((item) => item.classList.remove("active"));

  // 클릭된 게임 항목 찾기
  const gameItems = document.querySelectorAll("#gamesPage .game-item");
  gameItems.forEach((item) => {
    if (item.onclick && item.onclick.toString().includes(gameId)) {
      item.classList.add("active");
    }
  });

  // 모든 게임 숨기기
  document
    .querySelectorAll(
      "#fpsAimGame, #reactionTestGame, #memoryGame, #colorMatchGame"
    )
    .forEach((game) => {
      game.style.display = "none";
    });

  // 선택된 게임 보이기
  if (gameId === "fps-aim") {
    document.getElementById("fpsAimGame").style.display = "block";
  } else if (gameId === "reaction-test") {
    document.getElementById("reactionTestGame").style.display = "block";
    resetReactionTest();
  } else if (gameId === "memory-game") {
    document.getElementById("memoryGame").style.display = "block";
    startMemoryGame();
  } else if (gameId === "color-match") {
    document.getElementById("colorMatchGame").style.display = "block";
    startColorGame();
  }
}

// 도구 선택
function selectTool(toolId) {
  // 사이드바 활성화 상태 변경
  document
    .querySelectorAll("#toolsPage .game-item")
    .forEach((item) => item.classList.remove("active"));

  // 클릭된 도구 항목 찾기
  const toolItems = document.querySelectorAll("#toolsPage .game-item");
  toolItems.forEach((item) => {
    if (item.onclick && item.onclick.toString().includes(toolId)) {
      item.classList.add("active");
    }
  });

  // 모든 도구 숨기기
  document
    .querySelectorAll(
      "#colorPaletteTool, #keywordsTool, #unitConverterTool, #textTransformerTool"
    )
    .forEach((tool) => {
      tool.style.display = "none";
    });

  // 선택된 도구 보이기
  if (toolId === "color-palette") {
    document.getElementById("colorPaletteTool").style.display = "block";
    generateColorPalette();
  } else if (toolId === "keywords") {
    document.getElementById("keywordsTool").style.display = "block";
    generateKeywords();
  } else if (toolId === "unit-converter") {
    document.getElementById("unitConverterTool").style.display = "block";
  } else if (toolId === "text-transformer") {
    document.getElementById("textTransformerTool").style.display = "block";
  }
}

// 언어 설정 함수
function setLanguage(lang) {
  currentLanguage = lang;

  // 언어 버튼 활성화 상태 변경
  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // HTML lang 속성 변경
  document.documentElement.lang = lang;

  // 모든 텍스트 업데이트
  const texts = translations[lang];
  Object.keys(texts).forEach((key) => {
    const element = document.getElementById(key);
    if (element) {
      if (key.includes("Subtitle")) {
        element.innerHTML = texts[key];
      } else {
        element.textContent = texts[key];
      }
    }
  });

  // SEO 메타 태그 업데이트
  document.title = texts.pageTitle;
  document.getElementById("pageDescription").content = texts.pageDescription;
  document.getElementById("pageKeywords").content = texts.pageKeywords;
  document.getElementById("ogTitle").content = texts.pageTitle;
  document.getElementById("ogDescription").content = texts.pageDescription;
}

// DOM 로드 완료 후 초기 설정
document.addEventListener("DOMContentLoaded", function () {
  // 초기 통계 업데이트
  updateStats();

  // 도구 초기화
  generateColorPalette();
  generateKeywords();

  // 단위 변환기 이벤트 리스너
  const inputValue = document.getElementById("inputValue");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  if (inputValue) inputValue.addEventListener("input", convertUnits);
  if (fromUnit) fromUnit.addEventListener("change", convertUnits);
  if (toUnit) toUnit.addEventListener("change", convertUnits);
});
