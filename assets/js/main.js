// 전역 변수
let currentLanguage = "ko";

// 레이아웃 강제 재설정 함수 (이벤트 보존)
function forceLayoutReset() {
  const containers = document.querySelectorAll(
    ".games-container, .tools-container, .about-container"
  );

  containers.forEach((container) => {
    const width = window.innerWidth;

    if (width >= 1200) {
      container.style.display = "flex";
      container.style.flexDirection = "row";
      container.style.gap = "30px";
    } else if (width >= 768) {
      container.style.display = "flex";
      container.style.flexDirection = "row";
      container.style.gap = "20px";
    } else {
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "0";
    }
  });

  const sidebars = document.querySelectorAll(".sidebar");
  const gameContents = document.querySelectorAll(
    ".game-content, .about-content"
  );
  const adSidebars = document.querySelectorAll(".ad-sidebar");

  sidebars.forEach((sidebar) => {
    sidebar.style.order = "1";
  });

  gameContents.forEach((content) => {
    content.style.order = "2";
  });

  adSidebars.forEach((adSidebar) => {
    adSidebar.style.order = "3";
  });
}

// 페이지 전환 함수 (모든 페이지 지원)
function showPage(page) {
  console.log("Showing page:", page);

  // 모든 페이지 숨기기
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("active");
  });

  // 네비게이션 활성화 상태 변경
  document
    .querySelectorAll(".nav-item")
    .forEach((item) => item.classList.remove("active"));

  // 선택된 페이지만 보이기
  const targetPage = document.getElementById(page + "Page");
  if (targetPage) {
    targetPage.classList.add("active");
    console.log("Page activated:", targetPage);
  }

  // 해당하는 네비게이션 아이템 활성화
  const navItem = document.getElementById(
    "nav" + page.charAt(0).toUpperCase() + page.slice(1)
  );
  if (navItem) {
    navItem.classList.add("active");
  }

  // 레이아웃 재설정
  requestAnimationFrame(() => {
    forceLayoutReset();
  });

  // 페이지별 초기화
  if (page === "tools") {
    setTimeout(() => {
      if (typeof generateColorPalette === "function") generateColorPalette();
      if (typeof generateKeywords === "function") generateKeywords();
    }, 100);
  }
}

// 배너 슬라이드
let currentSlide = 0;

function initializeBannerSlides() {
  const slides = document.querySelectorAll(".banner-slide");
  if (slides.length > 0) {
    slides[0].classList.add("active");
  }
  return slides;
}

function nextSlide() {
  const slides = document.querySelectorAll(".banner-slide");
  if (slides.length > 0) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }
}

// 게임 선택
function selectGame(gameId) {
  console.log("Selecting game:", gameId);

  document.querySelectorAll("#gamesPage .game-item").forEach((item) => {
    item.classList.remove("active");
  });

  const gameItems = document.querySelectorAll("#gamesPage .game-item");
  gameItems.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    if (
      (gameId === "fps-aim" && itemText.includes("fps")) ||
      (gameId === "reaction-test" && itemText.includes("반응속도")) ||
      (gameId === "memory-game" && itemText.includes("메모리")) ||
      (gameId === "color-match" && itemText.includes("색깔"))
    ) {
      item.classList.add("active");
    }
  });

  document
    .querySelectorAll(
      "#fpsAimGame, #reactionTestGame, #memoryGame, #colorMatchGame"
    )
    .forEach((game) => {
      game.style.display = "none";
    });

  let targetGame = null;
  if (gameId === "fps-aim") {
    targetGame = document.getElementById("fpsAimGame");
  } else if (gameId === "reaction-test") {
    targetGame = document.getElementById("reactionTestGame");
  } else if (gameId === "memory-game") {
    targetGame = document.getElementById("memoryGame");
  } else if (gameId === "color-match") {
    targetGame = document.getElementById("colorMatchGame");
  }

  if (targetGame) {
    targetGame.style.display = "block";

    if (gameId === "reaction-test" && typeof resetReactionTest === "function") {
      resetReactionTest();
    } else if (
      gameId === "memory-game" &&
      typeof startMemoryGame === "function"
    ) {
      startMemoryGame();
    } else if (
      gameId === "color-match" &&
      typeof startColorGame === "function"
    ) {
      startColorGame();
    }
  }

  requestAnimationFrame(() => {
    forceLayoutReset();
  });
}

// 도구 선택
function selectTool(toolId) {
  console.log("Selecting tool:", toolId);

  document.querySelectorAll("#toolsPage .game-item").forEach((item) => {
    item.classList.remove("active");
  });

  const toolItems = document.querySelectorAll("#toolsPage .game-item");
  toolItems.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    if (
      (toolId === "color-palette" && itemText.includes("색상")) ||
      (toolId === "keywords" && itemText.includes("키워드")) ||
      (toolId === "unit-converter" && itemText.includes("단위")) ||
      (toolId === "text-transformer" && itemText.includes("텍스트"))
    ) {
      item.classList.add("active");
    }
  });

  document
    .querySelectorAll(
      "#colorPaletteTool, #keywordsTool, #unitConverterTool, #textTransformerTool"
    )
    .forEach((tool) => {
      tool.style.display = "none";
    });

  let targetTool = null;
  if (toolId === "color-palette") {
    targetTool = document.getElementById("colorPaletteTool");
  } else if (toolId === "keywords") {
    targetTool = document.getElementById("keywordsTool");
  } else if (toolId === "unit-converter") {
    targetTool = document.getElementById("unitConverterTool");
  } else if (toolId === "text-transformer") {
    targetTool = document.getElementById("textTransformerTool");
  }

  if (targetTool) {
    targetTool.style.display = "block";

    if (
      toolId === "color-palette" &&
      typeof generateColorPalette === "function"
    ) {
      generateColorPalette();
    } else if (
      toolId === "keywords" &&
      typeof generateKeywords === "function"
    ) {
      generateKeywords();
    }
  }

  requestAnimationFrame(() => {
    forceLayoutReset();
  });
}

// 통합 이벤트 위임 시스템
function setupEventDelegation() {
  document.addEventListener("click", function (event) {
    const target = event.target;

    // 메인 네비게이션 클릭 처리
    if (target.classList.contains("nav-item")) {
      event.preventDefault();
      const itemText = target.textContent.toLowerCase();
      if (itemText.includes("홈") || itemText.includes("home")) {
        showPage("home");
      } else if (itemText.includes("게임") || itemText.includes("games")) {
        showPage("games");
      } else if (itemText.includes("도구") || itemText.includes("tools")) {
        showPage("tools");
      } else if (itemText.includes("소개") || itemText.includes("about")) {
        showPage("about");
      }
    }

    // 푸터 아이템 클릭 처리
    if (target.classList.contains("footer-item")) {
      event.preventDefault();
      const itemText = target.textContent.toLowerCase();
      console.log("Footer item clicked:", itemText);

      if (itemText.includes("소개") || itemText.includes("about")) {
        showPage("about");
      } else if (itemText.includes("문의") || itemText.includes("contact")) {
        showPage("contact");
      } else if (
        itemText.includes("개인정보") ||
        itemText.includes("privacy")
      ) {
        showPage("privacy");
      } else if (itemText.includes("이용약관") || itemText.includes("terms")) {
        showPage("terms");
      }
    }

    // 사이트맵 아이템 클릭 처리
    if (target.classList.contains("sitemap-item")) {
      event.preventDefault();
      const itemText = target.textContent.toLowerCase();
      if (itemText.includes("fps")) {
        showPage("games");
        setTimeout(() => selectGame("fps-aim"), 100);
      } else if (itemText.includes("반응속도")) {
        showPage("games");
        setTimeout(() => selectGame("reaction-test"), 100);
      } else if (itemText.includes("메모리")) {
        showPage("games");
        setTimeout(() => selectGame("memory-game"), 100);
      } else if (itemText.includes("색깔")) {
        showPage("games");
        setTimeout(() => selectGame("color-match"), 100);
      } else if (itemText.includes("색상")) {
        showPage("tools");
        setTimeout(() => selectTool("color-palette"), 100);
      } else if (itemText.includes("키워드")) {
        showPage("tools");
        setTimeout(() => selectTool("keywords"), 100);
      } else if (itemText.includes("단위")) {
        showPage("tools");
        setTimeout(() => selectTool("unit-converter"), 100);
      } else if (itemText.includes("텍스트")) {
        showPage("tools");
        setTimeout(() => selectTool("text-transformer"), 100);
      }
    }

    // 게임 사이드바 클릭 처리
    if (
      target.classList.contains("game-item") &&
      target.closest("#gamesPage")
    ) {
      event.preventDefault();
      const itemText = target.textContent.toLowerCase();
      if (itemText.includes("fps")) {
        selectGame("fps-aim");
      } else if (itemText.includes("반응속도")) {
        selectGame("reaction-test");
      } else if (itemText.includes("메모리")) {
        selectGame("memory-game");
      } else if (itemText.includes("색깔")) {
        selectGame("color-match");
      }
    }

    // 도구 사이드바 클릭 처리
    if (
      target.classList.contains("game-item") &&
      target.closest("#toolsPage")
    ) {
      event.preventDefault();
      const itemText = target.textContent.toLowerCase();
      if (itemText.includes("색상")) {
        selectTool("color-palette");
      } else if (itemText.includes("키워드")) {
        selectTool("keywords");
      } else if (itemText.includes("단위")) {
        selectTool("unit-converter");
      } else if (itemText.includes("텍스트")) {
        selectTool("text-transformer");
      }
    }

    // 로고 클릭 처리
    if (target.classList.contains("logo")) {
      event.preventDefault();
      showPage("home");
    }

    // 언어 버튼 클릭 처리
    if (target.classList.contains("lang-btn")) {
      event.preventDefault();
      const lang =
        target.dataset.lang ||
        target.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
      if (lang) {
        setLanguage(lang);
      }
    }
  });
}

// DOM 로드 완료 후 초기 설정
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing...");

  // 배너 슬라이드 초기화
  const slides = initializeBannerSlides();
  if (slides.length > 0) {
    setInterval(nextSlide, 4000);
  }

  // 이벤트 위임 설정
  setupEventDelegation();

  // 초기 통계 업데이트
  if (typeof updateStats === "function") {
    updateStats();
  }

  // 도구 초기화
  if (typeof generateColorPalette === "function") {
    generateColorPalette();
  }
  if (typeof generateKeywords === "function") {
    generateKeywords();
  }

  // 초기 레이아웃 설정
  setTimeout(() => {
    forceLayoutReset();
  }, 100);

  // 단위 변환기 이벤트 리스너
  const inputValue = document.getElementById("inputValue");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  if (inputValue && typeof convertUnits === "function") {
    inputValue.addEventListener("input", convertUnits);
  }
  if (fromUnit && typeof convertUnits === "function") {
    fromUnit.addEventListener("change", convertUnits);
  }
  if (toUnit && typeof convertUnits === "function") {
    toUnit.addEventListener("change", convertUnits);
  }

  // 윈도우 리사이즈 시 레이아웃 재설정
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      forceLayoutReset();
    }, 100);
  });

  // 언어 초기화
  initializeLanguage();

  console.log("Initialization complete");
});

// 반응형 기능들
const DeviceUtils = {
  isMobile: () => window.innerWidth <= 767,
  isTablet: () => window.innerWidth >= 768 && window.innerWidth <= 1199,
  isDesktop: () => window.innerWidth >= 1200,
  isTouchDevice: () => "ontouchstart" in window || navigator.maxTouchPoints > 0,

  getCurrentBreakpoint: () => {
    const width = window.innerWidth;
    if (width >= 1200) return "desktop";
    if (width >= 768) return "tablet";
    if (width >= 480) return "mobile";
    return "mobile-small";
  },

  setVH: () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
};

// 향상된 알림 시스템
function showCopyNotification(message = null, duration = 2000) {
  if (!message) {
    message =
      translations[currentLanguage]?.copyNotification || "복사되었습니다!";
  }

  const existingNotification = document.querySelector(".copy-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = "copy-notification";
  notification.textContent = message;

  if (DeviceUtils.isMobile()) {
    notification.style.top = "auto";
    notification.style.bottom = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
  }

  document.body.appendChild(notification);
  notification.style.display = "block";

  setTimeout(() => {
    notification.remove();
  }, duration);
}

// 다국어 지원 함수들
function setLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`Language ${lang} not supported`);
    return;
  }

  currentLanguage = lang;
  localStorage.setItem("userLanguage", lang);

  // 모든 언어 버튼에서 active 클래스 제거
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // 선택된 언어 버튼에 active 클래스 추가
  document.querySelectorAll(`.lang-btn[data-lang="${lang}"]`).forEach((btn) => {
    btn.classList.add("active");
  });

  // HTML lang 속성 설정
  document.documentElement.lang = lang;

  // 번역 적용
  applyTranslations(lang);

  console.log(`Language changed to: ${lang}`);
}

function applyTranslations(lang) {
  const texts = translations[lang];
  if (!texts) return;

  // 기본 요소들에 번역 적용
  Object.keys(texts).forEach((key) => {
    const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
    elements.forEach((element) => {
      if (key.includes("Subtitle") || key.includes("Instructions")) {
        element.innerHTML = texts[key];
      } else {
        element.textContent = texts[key];
      }
    });

    // ID 기반 번역도 유지 (기존 호환성)
    const element = document.getElementById(key);
    if (element) {
      if (key.includes("Subtitle") || key.includes("Instructions")) {
        element.innerHTML = texts[key];
      } else {
        element.textContent = texts[key];
      }
    }
  });

  // 메타 태그 업데이트
  updateMetaTags(texts);

  // 플레이스홀더 텍스트 업데이트
  updatePlaceholders(texts);
}

function updateMetaTags(texts) {
  document.title = texts.pageTitle;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.content = texts.pageDescription;

  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta) keywordsMeta.content = texts.pageKeywords;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = texts.pageTitle;

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = texts.pageDescription;
}

function updatePlaceholders(texts) {
  // 플레이스홀더 업데이트
  const textInput = document.getElementById("textInput");
  if (textInput && texts.textPlaceholder) {
    textInput.placeholder = texts.textPlaceholder;
  }

  const inputValue = document.getElementById("inputValue");
  if (inputValue && texts.inputValueLabel) {
    inputValue.placeholder = texts.inputValueLabel;
  }

  // 결과 영역 기본 텍스트 업데이트
  const textResult = document.getElementById("textResult");
  if (
    textResult &&
    textResult.textContent.includes("변환된 텍스트가") &&
    texts.textResultPlaceholder
  ) {
    textResult.textContent = texts.textResultPlaceholder;
  }

  const conversionResult = document.getElementById("conversionResult");
  if (
    conversionResult &&
    conversionResult.textContent.includes("결과가") &&
    texts.resultPlaceholder
  ) {
    conversionResult.textContent = texts.resultPlaceholder;
  }
}

function loadSavedLanguage() {
  const savedLang = localStorage.getItem("userLanguage");
  if (savedLang && translations[savedLang]) {
    setLanguage(savedLang);
    return true;
  }
  return false;
}

function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;

  if (browserLang.startsWith("ko")) {
    return "ko";
  } else if (browserLang.startsWith("en")) {
    return "en";
  } else {
    return "ko"; // 기본값
  }
}

function initializeLanguage() {
  // 저장된 언어가 있으면 사용
  if (loadSavedLanguage()) {
    return;
  }

  // 브라우저 언어 감지
  const detectedLang = detectBrowserLanguage();
  setLanguage(detectedLang);
}

// 전역 함수로 노출
window.showPage = showPage;
window.selectGame = selectGame;
window.selectTool = selectTool;
window.showCopyNotification = showCopyNotification;
window.setLanguage = setLanguage;
window.initializeLanguage = initializeLanguage;
window.currentLanguage = currentLanguage;
