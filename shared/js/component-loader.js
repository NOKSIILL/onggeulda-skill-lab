// 한국어 최적화 공통 컴포넌트 로더 시스템 + 토글 사이드바 + 다국어 지원
class ComponentLoader {
  static currentLanguage = "ko"; // 기본 한국어
  static isInitialized = false;

  // 컴포넌트 로드 기본 메서드
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

  // 헤더 로드 (한국어 기본, 다국어 지원 준비)
  static async loadHeader() {
    // 현재 언어 감지
    const currentLang = this.detectLanguage();
    let headerPath = "/shared/header.html"; // 기본 한국어 헤더

    // 향후 영어 버전 추가 시 사용
    if (
      currentLang === "en" &&
      this.fileExists("/shared/components/header-en.html")
    ) {
      headerPath = "/shared/components/header-en.html";
    }

    const success = await this.loadComponent("header", headerPath);
    if (success) {
      this.initHeaderEvents();
      this.setActiveNavigation();
      this.initLanguageSystem();
    }
    return success;
  }

  // 푸터 로드
  static async loadFooter() {
    const currentLang = this.detectLanguage();
    let footerPath = "/shared/footer.html"; // 기본 한국어 푸터

    // 향후 영어 버전 추가 시 사용
    if (
      currentLang === "en" &&
      this.fileExists("/shared/components/footer-en.html")
    ) {
      footerPath = "/shared/components/footer-en.html";
    }

    const success = await this.loadComponent("footer", footerPath);
    if (success) {
      this.initFooterEvents();
    }
    return success;
  }

  // 게임 사이드바 로드 (PC용)
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

  // 도구 사이드바 로드 (PC용)
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

  // 언어 감지 (현재는 한국어 기본, 향후 확장 가능)
  static detectLanguage() {
    // URL 경로에서 언어 감지
    const path = window.location.pathname;
    if (path.startsWith("/en/")) {
      return "en";
    } else if (path.startsWith("/ko/")) {
      return "ko";
    }

    // 저장된 언어 확인
    const saved = localStorage.getItem("userLanguage");
    if (saved === "en" || saved === "ko") {
      return saved;
    }

    // 브라우저 언어 확인
    const browser = navigator.language || navigator.userLanguage;
    if (browser.startsWith("en")) {
      return "en";
    }

    return "ko"; // 기본값
  }

  // 파일 존재 확인 (간단한 체크)
  static async fileExists(path) {
    try {
      const response = await fetch(path, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  }

  // 토글 사이드바 초기화 (모바일/태블릿용)
  static initToggleSidebar(pageType, pageId = null) {
    console.log(
      "Initializing toggle sidebar for:",
      pageType,
      "pageId:",
      pageId
    );

    // 인덱스 페이지에서는 토글 사이드바를 생성하지 않음
    if (!pageId) {
      console.log("Index page detected, skipping toggle sidebar");
      return;
    }

    // 토글 버튼 생성
    this.createToggleButton();

    // 모바일 사이드바 생성
    this.createMobileSidebar(pageType, pageId);

    // 오버레이 생성
    this.createOverlay();

    // 이벤트 리스너 설정
    this.setupToggleEvents();
  }

  // 토글 버튼 생성
  static createToggleButton() {
    const existingToggle = document.querySelector(".sidebar-toggle");
    if (existingToggle) {
      existingToggle.remove();
    }

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "sidebar-toggle";
    toggleBtn.innerHTML = "☰";
    toggleBtn.setAttribute("aria-label", "사이드바 열기/닫기");
    document.body.appendChild(toggleBtn);
  }

  // 모바일 사이드바 생성
  static async createMobileSidebar(pageType, pageId = null) {
    const existingSidebar = document.querySelector(".sidebar-mobile");
    if (existingSidebar) {
      existingSidebar.remove();
    }

    const mobileSidebar = document.createElement("div");
    mobileSidebar.className = "sidebar-mobile";

    let sidebarContent = "";

    if (pageType === "games") {
      sidebarContent = `
        <h3>🎯 게임 목록</h3>
        <ul class="game-list">
          <li class="game-item" data-game="fps-aim">🎯 FPS 에임 훈련</li>
          <li class="game-item" data-game="reaction-test">🎲 반응속도 테스트</li>
          <li class="game-item" data-game="memory-game">🎪 메모리 게임</li>
          <li class="game-item" data-game="color-match">🎨 색깔 맞추기</li>
        </ul>
      `;
    } else if (pageType === "tools") {
      sidebarContent = `
        <h3>🛠️ 도구 목록</h3>
        <ul class="tool-list">
          <li class="tool-item" data-tool="color-palette">🎨 색상 팔레트 생성기</li>
          <li class="tool-item" data-tool="keywords">💡 오늘의 키워드</li>
          <li class="tool-item" data-tool="unit-converter">📏 단위 변환기</li>
          <li class="tool-item" data-tool="text-transformer">🔤 텍스트 변환기</li>
        </ul>
      `;
    }

    mobileSidebar.innerHTML = sidebarContent;
    document.body.appendChild(mobileSidebar);

    // 사이드바 이벤트 설정
    if (pageType === "games") {
      this.initMobileGameSidebarEvents();
    } else if (pageType === "tools") {
      this.initMobileToolSidebarEvents();
    }

    // 활성 아이템 설정
    if (pageId) {
      setTimeout(() => {
        if (pageType === "games") {
          this.setActiveMobileGameSidebar(pageId);
        } else if (pageType === "tools") {
          this.setActiveMobileToolSidebar(pageId);
        }
      }, 200);
    }
  }

  // 오버레이 생성
  static createOverlay() {
    const existingOverlay = document.querySelector(".sidebar-overlay");
    if (existingOverlay) {
      existingOverlay.remove();
    }

    const overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);
  }

  // 토글 이벤트 설정
  static setupToggleEvents() {
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const mobileSidebar = document.querySelector(".sidebar-mobile");
    const overlay = document.querySelector(".sidebar-overlay");

    if (!toggleBtn || !mobileSidebar || !overlay) {
      console.error("Toggle elements not found");
      return;
    }

    // 토글 버튼 클릭
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleSidebar();
    });

    // 오버레이 클릭으로 닫기
    overlay.addEventListener("click", () => {
      this.closeSidebar();
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeSidebar();
      }
    });

    // 모바일에서 스와이프로 닫기 (기본 구현)
    let startX = 0;
    mobileSidebar.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    mobileSidebar.addEventListener("touchmove", (e) => {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;

      if (diffX > 50) {
        // 왼쪽으로 50px 이상 스와이프
        this.closeSidebar();
      }
    });
  }

  // 사이드바 토글
  static toggleSidebar() {
    const mobileSidebar = document.querySelector(".sidebar-mobile");
    const isOpen = mobileSidebar && mobileSidebar.classList.contains("open");

    if (isOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  // 사이드바 열기
  static openSidebar() {
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const mobileSidebar = document.querySelector(".sidebar-mobile");
    const overlay = document.querySelector(".sidebar-overlay");

    if (!toggleBtn || !mobileSidebar || !overlay) return;

    toggleBtn.classList.add("active");
    mobileSidebar.classList.add("open");
    overlay.classList.add("open");
    overlay.style.display = "block";

    // 스크롤 방지
    document.body.style.overflow = "hidden";
  }

  // 사이드바 닫기
  static closeSidebar() {
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const mobileSidebar = document.querySelector(".sidebar-mobile");
    const overlay = document.querySelector(".sidebar-overlay");

    if (!toggleBtn || !mobileSidebar || !overlay) return;

    toggleBtn.classList.remove("active");
    mobileSidebar.classList.remove("open");
    overlay.classList.remove("open");

    // 애니메이션 후 오버레이 숨기기
    setTimeout(() => {
      if (!overlay.classList.contains("open")) {
        overlay.style.display = "none";
      }
    }, 300);

    // 스크롤 복원
    document.body.style.overflow = "";
  }

  // 모바일 게임 사이드바 이벤트
  static initMobileGameSidebarEvents() {
    document.querySelectorAll(".sidebar-mobile .game-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const game = item.dataset.game;
        console.log("Mobile game sidebar item clicked:", game);
        if (game) {
          this.closeSidebar();
          // 현재 경로에 따라 적절한 URL 생성
          const currentLang = this.detectLanguage();
          const basePath = currentLang === "ko" ? "/ko" : "";
          window.location.href = `${basePath}/games/${game}.html`;
        }
      });
    });
  }

  // 모바일 도구 사이드바 이벤트
  static initMobileToolSidebarEvents() {
    document.querySelectorAll(".sidebar-mobile .tool-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const tool = item.dataset.tool;
        console.log("Mobile tool sidebar item clicked:", tool);
        if (tool) {
          this.closeSidebar();
          const currentLang = this.detectLanguage();
          const basePath = currentLang === "ko" ? "/ko" : "";
          window.location.href = `${basePath}/tools/${tool}.html`;
        }
      });
    });
  }

  // 활성 모바일 게임 사이드바 설정
  static setActiveMobileGameSidebar(gameId) {
    setTimeout(() => {
      document
        .querySelectorAll(".sidebar-mobile .game-item")
        .forEach((item) => {
          item.classList.remove("active");
          if (item.dataset.game === gameId) {
            item.classList.add("active");
          }
        });
    }, 100);
  }

  // 활성 모바일 도구 사이드바 설정
  static setActiveMobileToolSidebar(toolId) {
    setTimeout(() => {
      document
        .querySelectorAll(".sidebar-mobile .tool-item")
        .forEach((item) => {
          item.classList.remove("active");
          if (item.dataset.tool === toolId) {
            item.classList.add("active");
          }
        });
    }, 100);
  }

  // 헤더 이벤트 초기화
  static initHeaderEvents() {
    // 로고 클릭 이벤트
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        const currentLang = this.detectLanguage();
        const homePath = currentLang === "ko" ? "/ko/" : "/";
        window.location.href = homePath;
      });
    }

    // 네비게이션 아이템 클릭 이벤트
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const href = item.getAttribute("href");
        if (href && !href.startsWith("#")) {
          // 일반적인 링크 동작 허용
          return;
        }
        e.preventDefault();
        console.log("Navigation item clicked:", item.textContent);
      });
    });
  }

  // 푸터 이벤트 초기화
  static initFooterEvents() {
    // 푸터 메뉴 이벤트
    document.querySelectorAll(".footer-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        if (page) {
          const currentLang = this.detectLanguage();
          const basePath = currentLang === "ko" ? "/ko" : "";
          window.location.href = `${basePath}/about/${page}.html`;
        }
      });
    });

    // 언어 버튼 이벤트 (향후 영어 버전 추가 시 활성화)
    this.initLanguageButtons();
  }

  // 언어 시스템 초기화
  static initLanguageSystem() {
    // 현재 언어 설정
    this.currentLanguage = this.detectLanguage();
    window.currentLanguage = this.currentLanguage;

    // localStorage에 현재 언어 저장
    localStorage.setItem("userLanguage", this.currentLanguage);

    // HTML lang 속성 설정
    document.documentElement.lang = this.currentLanguage;

    console.log("Language system initialized:", this.currentLanguage);
  }

  // 언어 버튼 초기화
  static initLanguageButtons() {
    console.log("Initializing language buttons...");

    setTimeout(() => {
      const langButtons = document.querySelectorAll(".lang-btn");
      console.log(`Found ${langButtons.length} language buttons`);

      langButtons.forEach((btn) => {
        // 기존 이벤트 리스너 제거 (중복 방지)
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        // 새 이벤트 리스너 추가
        newBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const lang = newBtn.dataset.lang;
          console.log("Language button clicked:", lang);

          if (lang && (lang === "ko" || lang === "en")) {
            this.changeLanguage(lang);
          }
        });

        console.log(`Language button setup: ${newBtn.dataset.lang}`);
      });

      // 현재 언어 버튼 활성화
      this.updateLanguageButtonStates(this.currentLanguage);
    }, 100);
  }

  // 언어 변경
  static changeLanguage(targetLang) {
    console.log("Changing language to:", targetLang);

    // 현재 경로 분석
    const currentPath = window.location.pathname;
    let newPath;

    if (targetLang === "ko") {
      if (currentPath.startsWith("/en/")) {
        newPath = currentPath.replace("/en/", "/ko/");
      } else if (currentPath === "/") {
        newPath = "/ko/";
      } else if (!currentPath.startsWith("/ko/")) {
        newPath = "/ko" + currentPath;
      } else {
        newPath = currentPath; // 이미 한국어 경로
      }
    } else if (targetLang === "en") {
      // 향후 영어 버전 추가 시 구현
      alert("영어 버전은 준비 중입니다.");
      return;
    }

    // 언어 설정 저장
    localStorage.setItem("userLanguage", targetLang);

    // 페이지 이동
    if (newPath && newPath !== currentPath) {
      window.location.href = newPath;
    } else {
      // 같은 페이지일 경우 새로고침
      window.location.reload();
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

  // PC 게임 사이드바 이벤트
  static initGameSidebarEvents() {
    document.querySelectorAll("#game-sidebar .game-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const game = item.dataset.game;
        console.log("Game sidebar item clicked:", game);
        if (game) {
          const currentLang = this.detectLanguage();
          const basePath = currentLang === "ko" ? "/ko" : "";
          window.location.href = `${basePath}/games/${game}.html`;
        }
      });
    });
  }

  // PC 도구 사이드바 이벤트
  static initToolSidebarEvents() {
    document.querySelectorAll("#tool-sidebar .tool-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const tool = item.dataset.tool;
        console.log("Tool sidebar item clicked:", tool);
        if (tool) {
          const currentLang = this.detectLanguage();
          const basePath = currentLang === "ko" ? "/ko" : "";
          window.location.href = `${basePath}/tools/${tool}.html`;
        }
      });
    });
  }

  // 네비게이션 활성 상태 설정
  static setActiveNavigation() {
    const currentPath = window.location.pathname;
    console.log("Setting active navigation for path:", currentPath);

    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
      const href = item.getAttribute("href");

      // 경로 매칭 로직
      const isActive =
        href === currentPath ||
        (currentPath === "/" && href === "/") ||
        (currentPath === "/ko/" && href === "/ko/") ||
        (currentPath.startsWith("/ko/games") &&
          href &&
          href.includes("/games")) ||
        (currentPath.startsWith("/games") && href && href.includes("/games")) ||
        (currentPath.startsWith("/ko/tools") &&
          href &&
          href.includes("/tools")) ||
        (currentPath.startsWith("/tools") && href && href.includes("/tools")) ||
        (currentPath.includes("/about") && href && href.includes("/about"));

      if (isActive) {
        item.classList.add("active");
        console.log("Activated nav item:", href);
      }
    });
  }

  // 게임 사이드바 활성 상태 설정
  static setActiveGameSidebar(gameId) {
    setTimeout(() => {
      document.querySelectorAll("#game-sidebar .game-item").forEach((item) => {
        item.classList.remove("active");
        if (item.dataset.game === gameId) {
          item.classList.add("active");
          console.log("Activated game sidebar item:", gameId);
        }
      });
    }, 100);
  }

  // 도구 사이드바 활성 상태 설정
  static setActiveToolSidebar(toolId) {
    setTimeout(() => {
      document.querySelectorAll("#tool-sidebar .tool-item").forEach((item) => {
        item.classList.remove("active");
        if (item.dataset.tool === toolId) {
          item.classList.add("active");
          console.log("Activated tool sidebar item:", toolId);
        }
      });
    }, 100);
  }

  // 반응형 레이아웃 적용
  static applyResponsiveLayout(pageType = null, pageId = null) {
    const width = window.innerWidth;
    console.log(
      "Applying responsive layout for width:",
      width,
      "pageType:",
      pageType,
      "pageId:",
      pageId
    );

    // 토글 사이드바 관리
    this.manageToggleSidebar(width, pageType, pageId);

    const gameContainers = document.querySelectorAll(
      ".games-container, .tools-container"
    );
    const homeLayouts = document.querySelectorAll(".home-layout");
    const aboutContainers = document.querySelectorAll(".about-container");

    // 게임/도구 컨테이너 처리
    gameContainers.forEach((container) => {
      if (width >= 1200) {
        container.style.display = "flex";
        container.style.flexDirection = "row";
        container.style.gap = "30px";
      } else {
        container.style.display = "block";
        container.style.width = "100%";
      }
    });

    // 홈 레이아웃 처리
    homeLayouts.forEach((layout) => {
      if (width >= 1200) {
        layout.style.display = "flex";
        layout.style.gap = "20px";
      } else {
        layout.style.display = "block";
      }
    });

    // About 컨테이너 처리
    aboutContainers.forEach((container) => {
      if (width >= 1200) {
        container.style.display = "flex";
        container.style.gap = "20px";
        container.style.maxWidth = "1200px";
        container.style.margin = "0 auto";
      } else {
        container.style.display = "block";
        container.style.maxWidth = "100%";
        container.style.margin = "0";
      }
    });

    // 요소 순서 및 크기 설정
    this.setElementOrdering(width);
  }

  // 요소 순서 설정
  static setElementOrdering(width) {
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
        sidebar.style.display = "block";
      } else {
        sidebar.style.display = "none";
      }
    });

    contents.forEach((content) => {
      if (width >= 1200) {
        content.style.order = "2";
        content.style.flex = "1";
        content.style.minWidth = "0";
      } else {
        content.style.order = "1";
        content.style.width = "100%";
      }
    });

    adSidebars.forEach((adSidebar) => {
      adSidebar.style.order = "3";
      if (width >= 1200) {
        adSidebar.style.display = "flex";
        adSidebar.style.flexDirection = "column";
        adSidebar.style.width = "200px";
        adSidebar.style.flexShrink = "0";
      } else {
        adSidebar.style.display = "none";
      }
    });
  }

  // 토글 사이드바 관리
  static manageToggleSidebar(width, pageType = null, pageId = null) {
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const mobileSidebar = document.querySelector(".sidebar-mobile");
    const overlay = document.querySelector(".sidebar-overlay");

    // 인덱스 페이지에서는 토글 사이드바 완전 제거
    if (!pageId) {
      if (toggleBtn) toggleBtn.remove();
      if (mobileSidebar) mobileSidebar.remove();
      if (overlay) overlay.remove();
      return;
    }

    if (width >= 1200) {
      // PC에서는 토글 사이드바 숨김
      if (toggleBtn) toggleBtn.style.display = "none";
      if (mobileSidebar) mobileSidebar.style.display = "none";
      if (overlay) {
        overlay.style.display = "none";
        overlay.classList.remove("open");
      }
      this.closeSidebar();
      document.body.style.overflow = "";
    } else {
      // 모바일/태블릿에서는 토글 사이드바 표시
      if (toggleBtn) toggleBtn.style.display = "block";
      if (mobileSidebar) mobileSidebar.style.display = "block";
    }
  }

  // 메인 초기화 함수
  static async init(pageType, pageId = null) {
    try {
      console.log("ComponentLoader initializing...", { pageType, pageId });

      // 언어 감지 및 설정
      this.currentLanguage = this.detectLanguage();
      window.currentLanguage = this.currentLanguage;

      // 기본 컴포넌트 로드
      await this.loadHeader();
      await this.loadFooter();

      // 헤더 로드 후 네비게이션 활성화
      setTimeout(() => {
        this.setActiveNavigation();
      }, 100);

      // 페이지 타입별 사이드바 로드 (PC용)
      if (pageId && pageType === "games") {
        await this.loadGameSidebar();
        this.setActiveGameSidebar(pageId);
      } else if (pageId && pageType === "tools") {
        await this.loadToolSidebar();
        this.setActiveToolSidebar(pageId);
      }

      // 토글 사이드바 초기화 (모바일/태블릿용)
      if (pageId && (pageType === "games" || pageType === "tools")) {
        setTimeout(() => {
          this.initToggleSidebar(pageType, pageId);
        }, 100);
      }

      // 반응형 레이아웃 적용
      this.applyResponsiveLayout(pageType, pageId);

      // 리사이즈 이벤트 리스너
      let resizeTimeout;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          console.log("Window resized, applying responsive layout");
          this.applyResponsiveLayout(pageType, pageId);
        }, 100);
      });

      // 언어 시스템 초기화
      setTimeout(() => {
        this.initLanguageSystem();
      }, 300);

      this.isInitialized = true;
      console.log("Component initialization complete");
      return true;
    } catch (error) {
      console.error("Component initialization failed:", error);
      return false;
    }
  }
}

// 전역으로 노출
window.ComponentLoader = ComponentLoader;
