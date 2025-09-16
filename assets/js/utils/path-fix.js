// path-fix.js (기존 코드 + 추가)
(function() {
  if (location.hostname.includes('github.io')) {
    const basePath = '/onggeulda-skill-lab';
    
    // 기존 DOM 로드 시 정적 요소 처리
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('link[href^="/"], script[src^="/"], img[src^="/"], a[href^="/"]').forEach(el => {
        const attr = el.tagName === 'LINK' ? 'href' : (el.tagName === 'A' ? 'href' : 'src');
        const path = el.getAttribute(attr);
        
        if (path && !path.startsWith(basePath) && !path.startsWith('http')) {
          el.setAttribute(attr, basePath + path);
        }
      });
    });
    
    // ✅ 새로 추가: onclick용 전역 함수들
    window.fixPath = function(path) {
      return (path.startsWith('/') && !path.startsWith(basePath)) ? basePath + path : path;
    };
    
    window.navigateTo = function(path) {
      location.href = window.fixPath(path);
    };
    
  } else {
    // 다른 환경(Netlify 등)에서는 원본 경로 사용
    window.fixPath = function(path) { return path; };
    window.navigateTo = function(path) { location.href = path; };
  }
})();
