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

    console.log(
      `ComponentLoader initialized with language: ${this.currentLang}`
    );
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
    }

    return success;
  }

  // 푸터 로드
  static async loadFooter() {
    return await this.loadComponent(
      "footer",
      `/shared/components/footer-${this.currentLang}.html`
    );
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
    const langButtons = document.querySelectorAll(".lang-btn");

    langButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetLang = btn.getAttribute("href").includes("/ko/")
          ? "ko"
          : "en";
        this.switchLanguage(targetLang);
      });
    });
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

    if (currentPath.startsWith("/ko/")) {
      newPath = currentPath.replace("/ko/", `/${targetLang}/`);
    } else if (currentPath.startsWith("/en/")) {
      newPath = currentPath.replace("/en/", `/${targetLang}/`);
    } else {
      newPath = `/${targetLang}/`;
    }

    // 언어 설정 저장
    localStorage.setItem("userLanguage", targetLang);

    // 페이지 이동
    window.location.href = newPath;
  }

  // 현재 언어 반환
  static getCurrentLanguage() {
    return this.currentLang;
  }
}

// 전역에서 사용 가능하도록 설정
window.ComponentLoader = ComponentLoader;
