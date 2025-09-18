// 공통 유틸리티 함수들 + 강화된 다국어 지원

// HSL을 HEX로 변환
function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// 복사 알림 표시
function showCopyNotification(message = "복사되었습니다!") {
  const notification = document.getElementById("copyNotification");
  if (notification) {
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 2000);
  }
}

// 랜덤 숫자 생성
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 배열 셔플
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// 요소에 클래스 토글
function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

// 클립보드에 텍스트 복사
function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

// 시간 지연 함수
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 요소가 화면에 보이는지 확인
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// 숫자를 천 단위 구분 기호로 포맷
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 퍼센트 계산
function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// 평균 계산
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b, 0);
  return Math.round(sum / numbers.length);
}

// 현재 언어 전역 변수
let currentLanguage = localStorage.getItem("userLanguage") || "ko";

// 현재 언어 가져오기
function getCurrentLanguage() {
  return currentLanguage;
}
/*
// 번역 텍스트 가져오기
function getTranslation(key, fallback = key) {
  if (
    window.translations &&
    window.translations[currentLanguage] &&
    window.translations[currentLanguage][key]
  ) {
    return window.translations[currentLanguage][key];
  }
  return fallback;
}
*/
// 언어별 알림 메시지 표시
function showLocalizedNotification(messageKey, fallbackMessage = null) {
  const message = getTranslation(messageKey, fallbackMessage || messageKey);
  showCopyNotification(message);
}

// 현재 언어로 번역된 복사 알림
function showLocalizedCopyNotification() {
  const message = getTranslation("copyNotification", "복사되었습니다!");
  showCopyNotification(message);
}

/*
// 브라우저 언어 감지
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith("ko")) {
    return "ko";
  } else if (browserLang.startsWith("en")) {
    return "en";
  }
  return "ko"; // 기본값
}

// 메타 태그 업데이트
function updateMetaTags(texts) {
  if (texts.pageTitle) {
    document.title = texts.pageTitle;
  }

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta && texts.pageDescription) {
    descMeta.content = texts.pageDescription;
  }

  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta && texts.pageKeywords) {
    keywordsMeta.content = texts.pageKeywords;
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && texts.pageTitle) {
    ogTitle.content = texts.pageTitle;
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && texts.pageDescription) {
    ogDesc.content = texts.pageDescription;
  }
}

// 플레이스홀더 업데이트
function updatePlaceholders(texts) {
  // 텍스트 입력 필드
  const textInput = document.getElementById("textInput");
  if (textInput && texts.textPlaceholder) {
    textInput.placeholder = texts.textPlaceholder;
  }

  // 숫자 입력 필드
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
*/
// 언어 버튼 상태 업데이트
function updateLanguageButtonStates(lang) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.lang === lang) {
      btn.classList.add("active");
    }
  });
}

// 언어 변경 콜백 함수들 관리
const languageChangeCallbacks = [];

function addLanguageChangeCallback(callback) {
  if (typeof callback === "function") {
    languageChangeCallbacks.push(callback);
  }
}

function triggerLanguageChangeCallbacks(newLanguage) {
  languageChangeCallbacks.forEach((callback) => {
    try {
      callback(newLanguage);
    } catch (error) {
      console.error("Error in language change callback:", error);
    }
  });
}

/*
// 메인 언어 변경 함수
function setLanguage(lang) {
  console.log("Setting language to:", lang);

  if (!window.translations || !window.translations[lang]) {
    console.warn(`Language ${lang} not supported`);
    return;
  }

  // 현재 언어 업데이트
  currentLanguage = lang;
  window.currentLanguage = lang;
  localStorage.setItem("userLanguage", lang);

  // HTML lang 속성 설정
  document.documentElement.lang = lang;

  // 버튼 상태 업데이트
  updateLanguageButtonStates(lang);

  // 번역 적용
  updateAllTranslations(lang);

  // 콜백 함수들 실행
  triggerLanguageChangeCallbacks(lang);

  console.log("Language successfully changed to:", lang);
}

// 언어 시스템 초기화
function initializeLanguage() {
  console.log("Initializing language system...");

  // 저장된 언어 또는 브라우저 언어 감지
  const savedLang = localStorage.getItem("userLanguage");
  const detectedLang = detectBrowserLanguage();
  const initialLang = savedLang || detectedLang;

  console.log("Initial language determined as:", initialLang);

  // 현재 언어 설정
  currentLanguage = initialLang;
  window.currentLanguage = initialLang;

  // 즉시 번역 적용
  setTimeout(() => {
    updateLanguageButtonStates(initialLang);
    updateAllTranslations(initialLang);
  }, 100);

  console.log("Language system initialized with:", initialLang);
}

// 특정 요소에 번역 적용
function applyTranslationToElement(element, translationKey) {
  const translation = getTranslation(translationKey);
  if (translation !== translationKey) {
    if (
      translationKey.includes("Subtitle") ||
      translationKey.includes("Instructions")
    ) {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  }
}

// 동적으로 생성된 요소에 번역 적용
function applyTranslationToNewElement(element, key) {
  const translation = getTranslation(key);
  if (translation && translation !== key) {
    
    applyTranslationToElement(element, key);
  }
}

// 페이지별 특별 번역 처리
function applyPageSpecificTranslations() {
  const currentPath = window.location.pathname;

  // 게임 설명 텍스트 업데이트
  if (currentPath.includes("/games/")) {
    updateGameDescriptions();
  }

  // 도구 설명 텍스트 업데이트
  if (currentPath.includes("/tools/")) {
    updateToolDescriptions();
  }

  // 인덱스 페이지 설명 업데이트
  if (
    currentPath.includes("/games/index.html") ||
    currentPath.includes("/tools/index.html")
  ) {
    updateIndexDescriptions();
  }
}

// 게임 설명 업데이트
function updateGameDescriptions() {
  const descriptions = {
    "fps-aim": "fpsAimDesc",
    "reaction-test": "reactionTestDesc",
    "memory-game": "memoryGameDesc",
    "color-match": "colorMatchDesc",
  };

  Object.entries(descriptions).forEach(([game, key]) => {
    if (window.location.pathname.includes(game)) {
      // 특정 게임 페이지의 설명 요소가 있다면 업데이트
      const descElement = document.querySelector(".game-description");
      if (descElement) {
        descElement.textContent = getTranslation(key);
      }
    }
  });
}

// 도구 설명 업데이트
function updateToolDescriptions() {
  const descriptions = {
    "color-palette": "colorPaletteDesc",
    keywords: "keywordsDesc",
    "unit-converter": "unitConverterDesc",
    "text-transformer": "textTransformerDesc",
  };

  Object.entries(descriptions).forEach(([tool, key]) => {
    if (window.location.pathname.includes(tool)) {
      // 특정 도구 페이지의 설명 요소가 있다면 업데이트
      const descElement = document.querySelector(".tool-description");
      if (descElement) {
        descElement.textContent = getTranslation(key);
      }
    }
  });
}

// DOM 로드 시 다국어 시스템 초기화
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initializeLanguage, 200);
  });
} else {
  setTimeout(initializeLanguage, 200);
}

// 언어 변경 시 페이지별 특별 처리 콜백 등록
addLanguageChangeCallback(applyPageSpecificTranslations);
*/

// 전역 함수로 노출
window.getCurrentLanguage = getCurrentLanguage;
window.getTranslation = getTranslation;
window.showLocalizedNotification = showLocalizedNotification;
window.showLocalizedCopyNotification = showLocalizedCopyNotification;
/*
window.setLanguage = setLanguage;
window.initializeLanguage = initializeLanguage;
*/
window.addLanguageChangeCallback = addLanguageChangeCallback;
/*
window.updateAllTranslations = updateAllTranslations;
window.applyTranslationToNewElement = applyTranslationToNewElement;
*/
window.currentLanguage = currentLanguage;
