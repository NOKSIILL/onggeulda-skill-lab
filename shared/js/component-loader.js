class ComponentLoader {
  static currentLang = "ko";
  static isInitialized = false;

  // 언어 초기화
  static init(language = null) {
    if (language) {
      this.currentLang = language;
    } else {
      this.detectLanguageFromURL();
    }

    this.loadAllComponents();
    this.isInitialized = true;

    console.log(`ComponentLoader initialized with language: ${this.currentLang}`);
  }

  // URL에서 언어 감지
  static detectLanguageFromURL() {
    const path = window.location.pathname;

    if (path.startsWith("/ko/")) {
      this.currentLang = "ko";
    } else if (path.startsWith("/en/")) {
      this.currentLang = "en";
    } else {
      // 기본값 또는 저장된 언어 사용
      this.currentLang = localStorage.getItem("userLanguage") || "ko";
    }

    return this.currentLang;
  }

  // 모든 컴포넌트 로드
  static async loadAllComponents() {
    try {
      await Promise.all([this.loadHeader(), this.loadFooter()]);
      
      // 컴포넌트 로드 후 이벤트 초기화
      this.initializeEvents();

      console.log("All components loaded successfully");
    } catch (error) {
      console.error("Error loading components:", error);
    }
  }

  // 헤더 로드
  static async loadHeader() {
    const success = await this.loadComponent(
      "header",
      `/shared/components/header-${this.currentLang}.html`
    );

    if (success) {
      this.initializeLanguageSwitcher();
      this.setActiveNavigation();
    }

    return success;
  }

  // 푸터 로드
  static async loadFooter() {
    const success = await this.loadComponent(
      "footer",
      `/shared/components/footer-${this.currentLang}.html`
    );

    if (success) {
      this.initializeFooterEvents();
    }

    return success;
  }

  // 컴포넌트 로드 (기본 메서드)
  static async loadComponent(elementId, filePath) {
    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      const element = document.getElementById(elementId);

      if (element) {
        element.innerHTML = html;
        console.log(`${elementId} component loaded from ${filePath}`);
        return true;
      } else {
        console.warn(`Element with id '${elementId}' not found`);
        return false;
      }
    } catch (error) {
      console.error(`Error loading ${elementId} component:`, error);
      return false;
    }
  }

  // 언어 전환 기능 초기화
  static initializeLanguageSwitcher() {
    // 언어 버튼 이벤트 설정 (중복 방지)
    const langButtons = document.querySelectorAll(".lang-btn");
    
    langButtons.forEach((btn) => {
      // 기존 이벤트 리스너 제거
      btn.removeEventListener("click", this.handleLanguageSwitch);
      // 새 이벤트 리스너 추가
      btn.addEventListener("click", this.handleLanguageSwitch);
    });
  }

  // 언어 전환 핸들러
  static handleLanguageSwitch = (e) => {
    e.preventDefault();
    const targetLang = e.target.closest('.lang-btn').getAttribute('data-lang');
    
    if (!targetLang || !["ko", "en"].includes(targetLang)) {
      console.error("Invalid language:", targetLang);
      return;
    }

    ComponentLoader.switchLanguage(targetLang);
  }

  // 언어 전환 (URL 기반)
  static switchLanguage(targetLang) {
    if (!["ko", "en"].includes(targetLang)) {
      console.error("Invalid language:", targetLang);
      return;
    }

    // 현재 경로 분석
    const currentPath = window.location.pathname;
    let newPath;

    // 언어별 경로 변환
    if (currentPath.startsWith("/ko/")) {
      newPath = currentPath.replace("/ko/", `/${targetLang}/`);
    } else if (currentPath.startsWith("/en/")) {
      newPath = currentPath.replace("/en/", `/${targetLang}/`);
    } else {
      // 루트 경로인 경우
      newPath = `/${targetLang}/`;
    }

    // 언어 설정 저장
    localStorage.setItem("userLanguage", targetLang);

    // 페이지 이동
    window.location.href = newPath;
  }

  // 네비게이션 활성화 설정
  static setActiveNavigation() {
    const currentPath = window.location.pathname;
    
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
      const href = item.getAttribute("href");
      
      if (
        href === currentPath ||
        (currentPath.endsWith("/") && href === currentPath) ||
        (currentPath.startsWith("/ko/games") && href === "/ko/games/") ||
        (currentPath.startsWith("/en/games") && href === "/en/games/") ||
        (currentPath.startsWith("/ko/tools") && href === "/ko/tools/") ||
        (currentPath.startsWith("/en/tools") && href === "/en/tools/") ||
        (currentPath.includes("/about") && href.includes("/about/about.html"))
      ) {
        item.classList.add("active");
      }
    });
  }

  // 푸터 이벤트 초기화
  static initializeFooterEvents() {
    const footerItems = document.querySelectorAll(".footer-item");
    
    footerItems.forEach((item) => {
      item.removeEventListener("click", this.handleFooterClick);
      item.addEventListener("click", this.handleFooterClick);
    });

    // 푸터 언어 버튼 이벤트
    const footerLangButtons = document.querySelectorAll(".footer-lang-buttons .lang-btn");
    footerLangButtons.forEach((btn) => {
      btn.removeEventListener("click", this.handleLanguageSwitch);
      btn.addEventListener("click", this.handleLanguageSwitch);
    });
  }

  // 푸터 클릭 핸들러
  static handleFooterClick = (e) => {
    e.preventDefault();
    const page = e.target.getAttribute('data-page');
    
    if (page) {
      const currentLang = ComponentLoader.currentLang;
      window.location.href = `/${currentLang}/about/${page}.html`;
    }
  }

  // 이벤트 초기화
  static initializeEvents() {
    // 로고 클릭 이벤트
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = `/${this.currentLang}/`;
      });
    }

    // 네비게이션 이벤트는 이미 href로 처리되므로 추가 처리 불필요
  }

  // 현재 언어 반환
  static getCurrentLanguage() {
    return this.currentLang;
  }

  // 언어 설정
  static setLanguage(lang) {
    if (["ko", "en"].includes(lang)) {
      this.currentLang = lang;
      localStorage.setItem("userLanguage", lang);
    }
  }
}

// 전역에서 사용 가능하도록 설정
window.ComponentLoader = ComponentLoader;