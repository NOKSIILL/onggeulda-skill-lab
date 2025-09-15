// 전역 변수
let currentLanguage = "ko";

// 레이아웃 강제 재설정 함수
function forceLayoutReset() {
  // 모든 컨테이너의 레이아웃 강제 재설정
  const containers = document.querySelectorAll(
    ".games-container, .tools-container, .about-container"
  );

  containers.forEach((container) => {
    // 기존 스타일 속성 제거
    container.removeAttribute("style");

    // 화면 크기에 따른 강제 레이아웃 설정
    const width = window.innerWidth;

    if (width >= 1200) {
      // PC: 가로 배치
      container.style.cssText =
        "display: flex !important; flex-direction: row !important; gap: 30px !important;";
    } else if (width >= 768) {
      // 태블릿: 가로 배치
      container.style.cssText =
        "display: flex !important; flex-direction: row !important; gap: 20px !important;";
    } else {
      // 모바일: 세로 배치
      container.style.cssText =
        "display: flex !important; flex-direction: column !important; gap: 0 !important;";
    }
  });

  // 사이드바와 콘텐츠 순서 강제 재설정
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

// 페이지 전환 함수 (개선된 버전)
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
  const targetPage = document.getElementById(page + "Page");
  if (targetPage) {
    targetPage.classList.add("active");
  }

  const navItem = document.getElementById(
    "nav" + page.charAt(0).toUpperCase() + page.slice(1)
  );
  if (navItem) {
    navItem.classList.add("active");
  }

  // 레이아웃 강제 재설정
  setTimeout(() => {
    forceLayoutReset();
  }, 50);

  // 페이지별 초기화
  if (page === "tools") {
    setTimeout(() => {
      generateColorPalette();
      generateKeywords();
    }, 100);
  }
}

// 배너 슬라이드
let currentSlide = 0;
const slides = document.querySelectorAll(".banner-slide");

function nextSlide() {
  if (slides.length > 0) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }
}

setInterval(nextSlide, 4000);

// 게임 선택 (개선된 버전)
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

  // 레이아웃 강제 재설정
  setTimeout(() => {
    forceLayoutReset();
  }, 50);
}

// 도구 선택 (개선된 버전)
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

  // 레이아웃 강제 재설정
  setTimeout(() => {
    forceLayoutReset();
  }, 50);
}

// DOM 로드 완료 후 초기 설정
document.addEventListener("DOMContentLoaded", function () {
  // 초기 통계 업데이트
  updateStats();

  // 도구 초기화
  generateColorPalette();
  generateKeywords();

  // 초기 레이아웃 설정
  forceLayoutReset();

  // 단위 변환기 이벤트 리스너
  const inputValue = document.getElementById("inputValue");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  if (inputValue) inputValue.addEventListener("input", convertUnits);
  if (fromUnit) fromUnit.addEventListener("change", convertUnits);
  if (toUnit) toUnit.addEventListener("change", convertUnits);

  // 윈도우 리사이즈 시 레이아웃 재설정
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      forceLayoutReset();
    }, 100);
  });
});

// main.js에 추가할 반응형 기능들

// ===== 디바이스 감지 및 반응형 유틸리티 =====
const DeviceUtils = {
  // 디바이스 타입 감지
  isMobile: () => window.innerWidth <= 767,
  isTablet: () => window.innerWidth >= 768 && window.innerWidth <= 1199,
  isDesktop: () => window.innerWidth >= 1200,
  isTouchDevice: () => "ontouchstart" in window || navigator.maxTouchPoints > 0,

  // 현재 브레이크포인트 반환
  getCurrentBreakpoint: () => {
    const width = window.innerWidth;
    if (width >= 1200) return "desktop";
    if (width >= 768) return "tablet";
    if (width >= 480) return "mobile";
    return "mobile-small";
  },

  // 뷰포트 높이 단위 수정 (모바일 브라우저 주소창 문제 해결)
  setVH: () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
};

// ===== 터치 이벤트 개선 =====
class TouchManager {
  constructor() {
    this.init();
  }

  init() {
    // 터치 시작/끝 이벤트로 활성 상태 관리
    document.addEventListener("touchstart", this.handleTouchStart.bind(this), {
      passive: true,
    });
    document.addEventListener("touchend", this.handleTouchEnd.bind(this), {
      passive: true,
    });

    // iOS Safari 바운스 스크롤 방지
    document.addEventListener("touchmove", this.preventBounce.bind(this), {
      passive: false,
    });
  }

  handleTouchStart(e) {
    const target = e.target.closest(
      "button, .nav-item, .game-item, .tool-button, .sitemap-item"
    );
    if (target) {
      target.classList.add("touching");
    }
  }

  handleTouchEnd(e) {
    const target = e.target.closest(
      "button, .nav-item, .game-item, .tool-button, .sitemap-item"
    );
    if (target) {
      setTimeout(() => target.classList.remove("touching"), 150);
    }
  }

  preventBounce(e) {
    const target = e.target;
    // 스크롤 가능한 요소가 아닌 경우 바운스 방지
    if (!target.closest(".ad-sidebar, textarea, .scrollable")) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }
  }
}

// ===== 반응형 네비게이션 관리 =====
class ResponsiveNavigation {
  constructor() {
    this.currentBreakpoint = DeviceUtils.getCurrentBreakpoint();
    this.init();
  }

  init() {
    window.addEventListener("resize", this.handleResize.bind(this));
    this.updateNavigation();
  }

  handleResize() {
    const newBreakpoint = DeviceUtils.getCurrentBreakpoint();

    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint;
      this.updateNavigation();

      // 뷰포트 높이 재계산
      DeviceUtils.setVH();

      // 레이아웃 강제 재설정
      forceLayoutReset();

      // 현재 활성화된 게임/도구가 있다면 레이아웃 재조정
      this.adjustActiveContent();
    }
  }

  updateNavigation() {
    const navMenu = document.querySelector(".nav-menu");
    const sidebar = document.querySelector(".sidebar");

    if (DeviceUtils.isMobile()) {
      // 모바일에서는 네비게이션을 더 컴팩트하게
      navMenu?.classList.add("mobile-nav");
      sidebar?.classList.add("mobile-sidebar");
    } else {
      navMenu?.classList.remove("mobile-nav");
      sidebar?.classList.remove("mobile-sidebar");
    }
  }

  adjustActiveContent() {
    // 게임 영역이 활성화된 경우 크기 재조정
    const gameArea = document.querySelector(
      '.game-area:not([style*="display: none"])'
    );
    if (gameArea) {
      this.adjustGameArea(gameArea);
    }

    // 도구 영역이 활성화된 경우 크기 재조정
    const toolArea = document.querySelector(
      '.tool-area:not([style*="display: none"])'
    );
    if (toolArea) {
      this.adjustToolArea(toolArea);
    }
  }

  adjustGameArea(gameArea) {
    // 타겟 크기 조정
    const targets = gameArea.querySelectorAll(".target");
    targets.forEach((target) => {
      if (DeviceUtils.isMobile()) {
        target.style.width = "70px";
        target.style.height = "70px";
      } else if (DeviceUtils.isTablet()) {
        target.style.width = "55px";
        target.style.height = "55px";
      } else {
        target.style.width = "60px";
        target.style.height = "60px";
      }
    });
  }

  adjustToolArea(toolArea) {
    // 색상 팔레트 레이아웃 조정
    const colorPalette = toolArea.querySelector(".color-palette");
    if (colorPalette) {
      if (DeviceUtils.isMobile()) {
        colorPalette.style.gridTemplateColumns = "repeat(3, 1fr)";
      } else if (DeviceUtils.isTablet()) {
        colorPalette.style.gridTemplateColumns = "repeat(4, 1fr)";
      } else {
        colorPalette.style.gridTemplateColumns = "repeat(5, 1fr)";
      }
    }
  }
}

// ===== 향상된 알림 시스템 =====
function showCopyNotification(message = "복사되었습니다!", duration = 2000) {
  // 기존 알림 제거
  const existingNotification = document.querySelector(".copy-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // 새 알림 생성
  const notification = document.createElement("div");
  notification.className = "copy-notification";
  notification.textContent = message;

  // 모바일에서는 하단에 표시
  if (DeviceUtils.isMobile()) {
    notification.style.top = "auto";
    notification.style.bottom = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
  }

  document.body.appendChild(notification);

  // 표시 애니메이션
  notification.style.display = "block";

  // 자동 제거
  setTimeout(() => {
    notification.remove();
  }, duration);
}

// ===== 게임 성능 최적화 =====
class GameOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // 저성능 디바이스 감지
    this.isLowPerformance = this.detectLowPerformance();

    if (this.isLowPerformance) {
      this.optimizeForLowPerformance();
    }
  }

  detectLowPerformance() {
    // 간단한 성능 감지 (실제로는 더 정교한 방법 사용 가능)
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) return true;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      // 저성능 GPU 감지 로직
      if (renderer.includes("Adreno") || renderer.includes("Mali-400")) {
        return true;
      }
    }

    // 메모리 기반 감지
    return navigator.deviceMemory && navigator.deviceMemory <= 2;
  }

  optimizeForLowPerformance() {
    // 애니메이션 감소
    document.documentElement.style.setProperty("--animation-duration", "0.1s");

    // 파티클 효과 비활성화
    this.disableParticleEffects();
  }

  disableParticleEffects() {
    const style = document.createElement("style");
    style.textContent = `
      .hit-effect,
      .miss-effect {
        animation: none !important;
        display: none !important;
      }
      
      .target {
        animation-duration: 0.2s !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== 배너 스와이프 기능 =====
class BannerSwipe {
  constructor() {
    this.banner = document.querySelector(".hero-banner");
    this.slides = document.querySelectorAll(".banner-slide");
    this.currentSlide = 0;
    this.isAutoPlaying = true;

    if (this.banner && DeviceUtils.isTouchDevice()) {
      this.init();
    }
  }

  init() {
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    this.banner.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        this.isAutoPlaying = false;
      },
      { passive: true }
    );

    this.banner.addEventListener("touchmove", (e) => {
      if (!isDragging) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      // 수평 스와이프가 수직 스와이프보다 큰 경우에만 처리
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault();
      }
    });

    this.banner.addEventListener(
      "touchend",
      (e) => {
        if (!isDragging) return;

        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
          // 50px 이상 스와이프
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }

        isDragging = false;

        // 3초 후 자동 재생 재개
        setTimeout(() => {
          this.isAutoPlaying = true;
        }, 3000);
      },
      { passive: true }
    );
  }

  nextSlide() {
    this.slides[this.currentSlide].classList.remove("active");
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.slides[this.currentSlide].classList.add("active");
  }

  prevSlide() {
    this.slides[this.currentSlide].classList.remove("active");
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.slides[this.currentSlide].classList.add("active");
  }
}

// ===== 초기화 함수들 =====
function initResponsiveFeatures() {
  // 뷰포트 높이 설정
  DeviceUtils.setVH();

  // 터치 관리자 초기화
  if (DeviceUtils.isTouchDevice()) {
    new TouchManager();
  }

  // 반응형 네비게이션 초기화
  new ResponsiveNavigation();

  // 게임 최적화 초기화
  new GameOptimizer();

  // 배너 스와이프 기능 초기화
  new BannerSwipe();

  // 리사이즈 이벤트에 뷰포트 높이 재계산 추가
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      DeviceUtils.setVH();
      forceLayoutReset();
    }, 100);
  });

  // iOS Safari에서 주소창 숨김/표시 시 레이아웃 재계산
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      DeviceUtils.setVH();
      forceLayoutReset();
    }, 500);
  });
}

// ===== 기존 함수들 개선 =====

// 기존 showCopyNotification 함수 교체
window.showCopyNotification = showCopyNotification;

// 기존 selectGame 함수에 반응형 최적화 추가
const originalSelectGame = window.selectGame;
window.selectGame = function (gameId) {
  selectGame.call(this, gameId);

  // 모바일에서 게임 선택 후 사이드바를 하단으로 이동
  if (DeviceUtils.isMobile()) {
    const sidebar = document.querySelector(".sidebar");
    const gameContent = document.querySelector(".game-content");

    if (sidebar && gameContent) {
      sidebar.style.order = "1";
      gameContent.style.order = "2";
    }
  }
};

// 기존 selectTool 함수에 반응형 최적화 추가
const originalSelectTool = window.selectTool;
window.selectTool = function (toolId) {
  selectTool.call(this, toolId);

  // 도구 선택 후 레이아웃 조정
  setTimeout(() => {
    const responsiveNav = new ResponsiveNavigation();
    responsiveNav.adjustActiveContent();
  }, 100);
};

// DOM 로드 완료 후 반응형 기능 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 기존 초기화 코드 실행
  updateStats();
  generateColorPalette();
  generateKeywords();

  // 반응형 기능 초기화
  initResponsiveFeatures();

  // 초기 레이아웃 강제 설정
  setTimeout(() => {
    forceLayoutReset();
  }, 100);

  // 단위 변환기 이벤트 리스너 (기존 코드)
  const inputValue = document.getElementById("inputValue");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  if (inputValue) inputValue.addEventListener("input", convertUnits);
  if (fromUnit) fromUnit.addEventListener("change", convertUnits);
  if (toUnit) toUnit.addEventListener("change", convertUnits);
});

// main.js에 추가할 언어 감지 및 개선된 언어 설정 함수

// 기존 setLanguage 함수를 개선된 버전으로 교체
function setLanguage(lang) {
  currentLanguage = lang;

  // 언어 설정을 로컬 스토리지에 저장
  localStorage.setItem("userLanguage", lang);

  // 모든 언어 버튼의 활성화 상태 변경 (헤더 + 푸터)
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // 클릭된 버튼이 있다면 활성화, 없다면 해당 언어 버튼들 모두 활성화
  if (event && event.target) {
    event.target.classList.add("active");
    // 같은 언어의 다른 버튼도 활성화
    const langButtons = document.querySelectorAll(`[onclick*="'${lang}'"]`);
    langButtons.forEach((btn) => btn.classList.add("active"));
  } else {
    // 자동 감지시에는 해당 언어 버튼들 모두 활성화
    const langButtons = document.querySelectorAll(`[onclick*="'${lang}'"]`);
    langButtons.forEach((btn) => btn.classList.add("active"));
  }

  // HTML lang 속성 변경
  document.documentElement.lang = lang;

  // 모든 텍스트 업데이트
  const texts = translations[lang];
  if (texts) {
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
    const descMeta = document.getElementById("pageDescription");
    const keywordsMeta = document.getElementById("pageKeywords");
    const ogTitle = document.getElementById("ogTitle");
    const ogDesc = document.getElementById("ogDescription");

    if (descMeta) descMeta.content = texts.pageDescription;
    if (keywordsMeta) keywordsMeta.content = texts.pageKeywords;
    if (ogTitle) ogTitle.content = texts.pageTitle;
    if (ogDesc) ogDesc.content = texts.pageDescription;
  }
}

// 저장된 언어 설정 불러오기
function loadSavedLanguage() {
  const savedLang = localStorage.getItem("userLanguage");
  if (savedLang && translations[savedLang]) {
    setLanguage(savedLang);
    return true;
  }
  return false;
}

// 브라우저 언어 자동 감지
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;

  // 한국어 감지 (ko, ko-KR 등)
  if (browserLang.startsWith("ko")) {
    return "ko";
  }
  // 영어 감지 (en, en-US 등)
  else if (browserLang.startsWith("en")) {
    return "en";
  }
  // 기본값은 한국어
  else {
    return "ko";
  }
}

// 언어 초기화 함수
function initializeLanguage() {
  // 1. 저장된 언어 설정이 있으면 그것을 사용
  if (loadSavedLanguage()) {
    return;
  }

  // 2. 저장된 설정이 없으면 브라우저 언어 감지
  const detectedLang = detectBrowserLanguage();
  setLanguage(detectedLang);
}

// 기존 DOM 로드 완료 이벤트에 언어 초기화 추가
document.addEventListener("DOMContentLoaded", function () {
  // 언어 초기화 (가장 먼저 실행)
  initializeLanguage();

  // 기존 초기화 코드들
  updateStats();
  generateColorPalette();
  generateKeywords();

  // 반응형 기능 초기화
  if (typeof initResponsiveFeatures === "function") {
    initResponsiveFeatures();
  }

  // 초기 레이아웃 강제 설정
  setTimeout(() => {
    forceLayoutReset();
  }, 100);

  // 단위 변환기 이벤트 리스너
  const inputValue = document.getElementById("inputValue");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  if (inputValue) inputValue.addEventListener("input", convertUnits);
  if (fromUnit) fromUnit.addEventListener("change", convertUnits);
  if (toUnit) toUnit.addEventListener("change", convertUnits);
});

// 언어 변경 시 푸터 버튼 동기화를 위한 개선된 함수
function syncLanguageButtons(selectedLang) {
  // 모든 언어 버튼 비활성화
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // 선택된 언어의 모든 버튼 활성화
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    if (btn.onclick && btn.onclick.toString().includes(`'${selectedLang}'`)) {
      btn.classList.add("active");
    }
  });
}
