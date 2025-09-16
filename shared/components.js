// 공통 컴포넌트 로더 시스템
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
          window.location.href = `/${page}.html`;
        }
      });
    });

    // 푸터 언어 버튼 이벤트 - 즉시 실행 함수로 이벤트 바인딩
    setTimeout(() => {
      const langButtons = document.querySelectorAll(
        ".footer-lang-buttons .lang-btn"
      );
      console.log("Found language buttons:", langButtons.length);

      langButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const lang = btn.dataset.lang;
          console.log("Language button clicked:", lang);

          if (lang) {
            // 전역 함수 체크
            if (typeof window.setLanguage === "function") {
              window.setLanguage(lang);
            } else if (typeof setLanguage === "function") {
              setLanguage(lang);
            } else {
              console.error("setLanguage function not found");
            }
          }
        });
      });
    }, 500); // 0.5초 후 실행
  }

  static initGameSidebarEvents() {
    document.querySelectorAll(".game-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const game = item.dataset.game;
        if (game) {
          window.location.href = `/games/${game}.html`;
        }
      });
    });
  }

  static initToolSidebarEvents() {
    // 도구 사이드바는 tool-item 클래스 사용
    document.querySelectorAll("#tool-sidebar .tool-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const tool = item.dataset.tool;
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
        (currentPath.includes("/about") && href === "/about.html")
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
    setTimeout(() => {
      document.querySelectorAll("#tool-sidebar .tool-item").forEach((item) => {
        item.classList.remove("active");
        if (item.dataset.tool === toolId) {
          item.classList.add("active");
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
      ".game-content, .about-content, .home-content"
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

      // 언어 초기화
      setTimeout(() => {
        if (typeof initializeLanguage === "function") {
          initializeLanguage();
        } else if (window.initializeLanguage) {
          window.initializeLanguage();
        }
      }, 200);

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
