// assets/js/utils/path-resolver.js
// 스마트 경로 처리 시스템 - GitHub Pages와 로컬 환경 모두 지원

class PathResolver {
  constructor() {
    this.basePath = this.detectBasePath();
    this.isGitHubPages = this.detectGitHubPages();
    this.isLocalDev = this.detectLocalDev();

    console.log("PathResolver initialized:", {
      basePath: this.basePath,
      isGitHubPages: this.isGitHubPages,
      isLocalDev: this.isLocalDev,
    });
  }

  // 환경 감지
  detectGitHubPages() {
    return window.location.hostname.includes("github.io");
  }

  detectLocalDev() {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.protocol === "file:"
    );
  }

  detectBasePath() {
    const pathname = window.location.pathname;

    // GitHub Pages 환경 감지
    if (this.detectGitHubPages()) {
      const parts = pathname.split("/").filter((p) => p);
      if (parts.length > 0 && parts[0] !== "index.html") {
        return "/" + parts[0];
      }
    }

    // 로컬 개발 환경
    if (this.detectLocalDev()) {
      // file:// 프로토콜인 경우
      if (window.location.protocol === "file:") {
        return "";
      }
      // localhost인 경우 경로에서 프로젝트 폴더 감지
      const parts = pathname.split("/").filter((p) => p);
      if (parts.length > 0 && parts[0] === "onggeulda-skill-lab") {
        return "/onggeulda-skill-lab";
      }
    }

    return "";
  }

  // 절대 경로를 환경에 맞게 변환
  resolve(path) {
    // 이미 완전한 URL인 경우 그대로 반환
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    // 상대 경로는 그대로 반환
    if (!path.startsWith("/")) {
      return path;
    }

    // 절대 경로 처리
    return this.basePath + path;
  }

  // 네비게이션용 URL 생성
  getNavUrl(path) {
    return this.resolve(path);
  }

  // 리소스 URL 생성 (CSS, JS, 이미지 등)
  getAssetUrl(path) {
    return this.resolve(path);
  }

  // 페이지 URL 생성
  getPageUrl(path) {
    return this.resolve(path);
  }

  // 현재 페이지 타입 감지
  getCurrentPageType() {
    const pathname = window.location.pathname;

    if (pathname.includes("/games/")) return "games";
    if (pathname.includes("/tools/")) return "tools";
    if (pathname.includes("/footer/")) return "info";
    if (pathname === "/" || pathname.includes("index.html")) return "home";

    return "unknown";
  }
}

// 전역 인스턴스 생성
window.pathResolver = new PathResolver();

// 기존 코드와의 호환성을 위한 헬퍼 함수들
window.resolvePath = (path) => window.pathResolver.resolve(path);
window.getAssetPath = (path) => window.pathResolver.getAssetUrl(path);
window.getPagePath = (path) => window.pathResolver.getPageUrl(path);
