// 공통 컴포넌트 로더 시스템 + 강화된 다국어 지원
class ComponentLoader {
  static async loadComponent(selector, componentPath) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const element = document.querySelector(selector);
      if (element) {
        element.innerHTML = html;
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Component loading failed for ${componentPath}:`, error);
      return false;
    }
  }

  static async loadHeader() {
    const success = await this.loadComponent("header", "/shared/header.html");
    if (success) {
      this.initHeaderEvents();
      this.setActiveNavigation();
    }
    return success;
  }

  static async loadFooter() {
    const success = await this.loadComponent("footer", "/shared/footer.html");
    if (success) {
      this.initFooterEvents();
    }
    return success;
  }

  static async loadGameSidebar() {
    const success = await this.loadComponent(
      "#game-sidebar",
      "/shared/game-sidebar.html"
    );
    if (success) {
      this.initGameSidebarEvents();
    }
    return success;
  }

  static async loadToolSidebar() {
    const success = await this.loadComponent(
      "#tool-sidebar",
      "/shared/tool-sidebar.html"
    );
    if (success) {
      this.initToolSidebarEvents();
    }
    return success;
  }

  static initHeaderEvents() {
    // 로고 클릭 이벤트
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/";
      });
    }

    // 네비게이션 아이템 클릭 이벤트
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const href = item.getAttribute("href");
        if (href && !href.startsWith("#")) {
          return;
        }
        e.preventDefault();
      });
    });
  }

  static initFooterEvents() {
    // 푸터 메뉴 이벤트
    document.querySelectorAll(".footer-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        if (page) {
          window.location.href = `/footer/${page}.html`;
        }
      });
    });

    // 강화된 언어 버튼 이벤트
    this.initLanguageButtons();
  }

  // 강화된 언어 버튼 초기화
  static initLanguageButtons() {
    console.log("Initializing language buttons...");

    // 여러 번 시도하여 확실히 바인딩
    const attempts = [0, 100, 300, 500, 1000];

    attempts.forEach((delay) => {
      setTimeout(() => {
        const langButtons = document.querySelectorAll(".lang-btn");
        console.log(
          `Attempt after ${delay}ms: Found ${langButtons.length} language buttons`
        );

        langButtons.forEach((btn) => {
          // 기존 이벤트 리스너 제거 (중복 방지)
          const newBtn = btn.cloneNode(true);
          btn.parentNode.replaceChild(newBtn, btn);

          // 새 이벤트 리스너 추가
          newBtn.addEventListener("click", this.handleLanguageChange);

          console.log(`Language button setup: ${newBtn.dataset.lang}`);
        });
      }, delay);
    });
  }

  // 강화된 언어 변경 핸들러
  static handleLanguageChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const lang = e.target.dataset.lang;
    console.log("Language button clicked:", lang);

    if (!lang) {
      console.error("No language data found on button");
      return;
    }

    // setLanguage 함수 호출
    if (typeof window.setLanguage === "function") {
      console.log("Calling window.setLanguage with:", lang);
      window.setLanguage(lang);
    } else if (typeof setLanguage === "function") {
      console.log("Calling global setLanguage with:", lang);
      setLanguage(lang);
    } else {
      console.error("setLanguage function not found");
      // 직접 구현 호출
      ComponentLoader.directLanguageChange(lang);
    }
  };

  // 직접 언어 변경 구현
  static directLanguageChange(lang) {
    console.log("Using direct language change for:", lang);

    // 현재 언어 변수 설정
    window.currentLanguage = lang;
    localStorage.setItem("userLanguage", lang);

    // 모든 언어 버튼 상태 업데이트
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.lang === lang) {
        btn.classList.add("active");
      }
    });

    // HTML lang 속성 설정
    document.documentElement.lang = lang;

    // 번역 적용
    if (window.translations && window.translations[lang]) {
      this.applyTranslations(lang, window.translations[lang]);
    }

    console.log(`Direct language change completed: ${lang}`);
  }

  // 번역 적용
  static applyTranslations(lang, texts) {
    // data-i18n 속성을 가진 요소들에 번역 적용
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (texts[key]) {
        if (key.includes("Subtitle") || key.includes("Instructions")) {
          element.innerHTML = texts[key];
        } else {
          element.textContent = texts[key];
        }
      }
    });

    // 메타 태그 업데이트
    if (texts.pageTitle) {
      document.title = texts.pageTitle;
    }

    // 플레이스홀더 업데이트
    const textInput = document.getElementById("textInput");
    if (textInput && texts.textPlaceholder) {
      textInput.placeholder = texts.textPlaceholder;
    }
  }

  static initGameSidebarEvents() {
    document.querySelectorAll("#game-sidebar .game-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const game = item.dataset.game;
        console.log("Game sidebar item clicked:", game);
        if (game) {
          window.location.href = `/games/${game}.html`;
        }
      });
    });
  }

  static initToolSidebarEvents() {
    // 도구 사이드바 이벤트 - tool-item 클래스 사용
    document.querySelectorAll("#tool-sidebar .tool-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const tool = item.dataset.tool;
        console.log("Tool sidebar item clicked:", tool);
        if (tool) {
          window.location.href = `/tools/${tool}.html`;
        }
      });
    });
  }

  static setActiveNavigation() {
    const currentPath = window.location.pathname;
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
      const href = item.getAttribute("href");

      if (
        href === currentPath ||
        (currentPath === "/" && href === "/") ||
        (currentPath.startsWith("/games") && href === "/games/") ||
        (currentPath.startsWith("/tools") && href === "/tools/") ||
        (currentPath.includes("/about") && href === "/footer/about.html")
      ) {
        item.classList.add("active");
      }
    });
  }

  static setActiveGameSidebar(gameId) {
    setTimeout(() => {
      document.querySelectorAll("#game-sidebar .game-item").forEach((item) => {
        item.classList.remove("active");
        if (item.dataset.game === gameId) {
          item.classList.add("active");
        }
      });
    }, 100);
  }

  static setActiveToolSidebar(toolId) {
    console.log("Setting active tool sidebar for:", toolId);

    setTimeout(() => {
      document.querySelectorAll("#tool-sidebar .tool-item").forEach((item) => {
        item.classList.remove("active");
        console.log(
          "Checking tool item:",
          item.dataset.tool,
          "against",
          toolId
        );

        if (item.dataset.tool === toolId) {
          item.classList.add("active");
          console.log("Activated tool item:", toolId);
        }
      });
    }, 100);
  }

  // 반응형 레이아웃 적용
  static applyResponsiveLayout() {
    const gameContainers = document.querySelectorAll(
      ".games-container, .tools-container"
    );
    const homeLayouts = document.querySelectorAll(".home-layout");
    const aboutContainers = document.querySelectorAll(".about-container");
    const width = window.innerWidth;

    // 게임/도구 컨테이너 처리
    gameContainers.forEach((container) => {
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

    // 홈 레이아웃 처리 (인덱스 페이지들)
    homeLayouts.forEach((layout) => {
      if (width >= 1200) {
        // PC에서는 flex로 광고바 포함
        layout.style.display = "flex";
        layout.style.gap = "20px";
      } else {
        // 모바일/태블릿에서는 block
        layout.style.display = "block";
      }
    });

    // About 컨테이너 처리 (푸터 페이지들) - 다른 페이지와 동일한 전체 레이아웃
    aboutContainers.forEach((container) => {
      if (width >= 1200) {
        // PC에서 다른 페이지와 동일하게 flex 레이아웃
        container.style.display = "flex";
        container.style.gap = "20px";
        container.style.maxWidth = "1200px";
        container.style.margin = "0 auto";
      } else if (width >= 768) {
        container.style.display = "flex";
        container.style.gap = "20px";
      } else {
        container.style.display = "block";
        container.style.maxWidth = "100%";
        container.style.margin = "0";
      }
    });

    // 요소 순서 및 크기 설정
    const sidebars = document.querySelectorAll(".sidebar");
    const contents = document.querySelectorAll(
      ".game-content, .tool-content, .about-content, .home-content"
    );
    const adSidebars = document.querySelectorAll(".ad-sidebar");

    sidebars.forEach((sidebar) => {
      sidebar.style.order = "1";
      if (width >= 1200) {
        sidebar.style.width = "250px";
        sidebar.style.flexShrink = "0";
      }
    });

    contents.forEach((content) => {
      content.style.order = "2";
      if (width >= 1200) {
        content.style.flex = "1";
        content.style.minWidth = "0";
      }
    });

    adSidebars.forEach((adSidebar) => {
      adSidebar.style.order = "3";
      if (width >= 1200) {
        adSidebar.style.display = "flex";
        adSidebar.style.flexDirection = "column";
        adSidebar.style.width = "200px";
        adSidebar.style.flexShrink = "0";
      }
    });
  }

  // 초기화 함수
  static async init(pageType, pageId = null) {
    try {
      console.log("ComponentLoader initializing...", { pageType, pageId });

      // 기본 컴포넌트 로드
      await this.loadHeader();
      await this.loadFooter();

      // 페이지 타입별 사이드바 로드
      if (pageType === "games") {
        await this.loadGameSidebar();
        if (pageId) {
          this.setActiveGameSidebar(pageId);
        }
      } else if (pageType === "tools") {
        await this.loadToolSidebar();
        if (pageId) {
          this.setActiveToolSidebar(pageId);
        }
      }

      // 반응형 레이아웃 적용
      this.applyResponsiveLayout();

      // 리사이즈 이벤트 리스너
      let resizeTimeout;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.applyResponsiveLayout();
        }, 100);
      });

      // 언어 시스템 초기화 (강화됨)
      setTimeout(() => {
        this.initializeLanguageSystem();
      }, 300);

      console.log("Component initialization complete");
      return true;
    } catch (error) {
      console.error("Component initialization failed:", error);
      return false;
    }
  }

  // 강화된 언어 시스템 초기화
  static initializeLanguageSystem() {
    console.log("Initializing language system...");

    // 언어 초기화 함수 호출
    if (typeof window.initializeLanguage === "function") {
      console.log("Using window.initializeLanguage");
      window.initializeLanguage();
    } else if (typeof initializeLanguage === "function") {
      console.log("Using global initializeLanguage");
      initializeLanguage();
    } else {
      console.log("Using fallback language initialization");
      this.fallbackLanguageInit();
    }

    // 언어 버튼 재초기화
    this.initLanguageButtons();

    // 번역 재적용 보장
    setTimeout(() => {
      if (typeof window.updateAllTranslations === "function") {
        const currentLang =
          window.currentLanguage ||
          localStorage.getItem("userLanguage") ||
          "ko";
        window.updateAllTranslations(currentLang);
      }
    }, 500);
  }

  // 대체 언어 초기화
  static fallbackLanguageInit() {
    const savedLang = localStorage.getItem("userLanguage");
    const browserLang = navigator.language?.startsWith("ko") ? "ko" : "en";
    const defaultLang = savedLang || browserLang;

    console.log("Fallback language init with:", defaultLang);

    // 현재 언어 설정
    window.currentLanguage = defaultLang;

    // 언어 버튼 상태 업데이트
    this.updateLanguageButtonStates(defaultLang);

    // 번역 적용
    if (window.translations && window.translations[defaultLang]) {
      this.applyTranslations(defaultLang, window.translations[defaultLang]);
    }
  }

  // 언어 버튼 상태 업데이트
  static updateLanguageButtonStates(lang) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.lang === lang) {
        btn.classList.add("active");
      }
    });
  }
}

// 전역으로 노출
window.ComponentLoader = ComponentLoader;
