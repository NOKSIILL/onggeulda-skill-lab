// URL 라우팅 및 상태 관리 개선 코드
// 기존 main.js에 추가하거나 별도 파일로 생성

// 페이지 상태 관리
const PageStateManager = {
  // 현재 상태를 URL에 반영
  updateURL: function (page, subPage) {
    const url = subPage ? `#${page}/${subPage}` : `#${page}`;
    const title = this.getPageTitle(page, subPage);
    window.history.pushState({ page, subPage }, title, url);
    this.updatePageMeta(page, subPage);
    this.savePageState(page, subPage);
  },

  // 페이지별 제목 설정
  getPageTitle: function (page, subPage) {
    const titles = {
      home: "Onggeulda Skill Lab — Daily Skill Practice & Tools",
      games: "게임 - Onggeulda Skill Lab",
      tools: "창작 도구 - Onggeulda Skill Lab",
      about: "소개 - Onggeulda Skill Lab",
      "fps-aim": "FPS 에임 훈련 - Onggeulda Skill Lab",
      "reaction-test": "반응속도 테스트 - Onggeulda Skill Lab",
      "memory-game": "메모리 게임 - Onggeulda Skill Lab",
      "color-match": "색깔 맞추기 - Onggeulda Skill Lab",
      "color-palette": "색상 팔레트 생성기 - Onggeulda Skill Lab",
      keywords: "키워드 생성기 - Onggeulda Skill Lab",
      "unit-converter": "단위 변환기 - Onggeulda Skill Lab",
      "text-transformer": "텍스트 변환기 - Onggeulda Skill Lab",
    };

    return titles[subPage] || titles[page] || titles["home"];
  },

  // 메타 태그 동적 업데이트
  updatePageMeta: function (page, subPage) {
    const metaData = {
      "fps-aim": {
        title: "FPS 에임 훈련 - Onggeulda Skill Lab",
        description:
          "FPS 게임 실력 향상을 위한 에임 훈련 게임. 반응속도와 정확도를 개선하세요.",
        keywords: "FPS 게임, 에임 훈련, 반응속도, 정확도, 온라인 게임",
      },
      "reaction-test": {
        title: "반응속도 테스트 - Onggeulda Skill Lab",
        description:
          "순간 반응 능력을 측정하고 개선할 수 있는 반응속도 테스트 게임.",
        keywords: "반응속도, 반응속도 테스트, 순간 반응, 반사신경",
      },
      "memory-game": {
        title: "메모리 게임 - Onggeulda Skill Lab",
        description: "기억력과 집중력 훈련을 위한 카드 매칭 메모리 게임.",
        keywords: "메모리 게임, 기억력, 집중력, 카드 매칭",
      },
      "color-match": {
        title: "색깔 맞추기 - Onggeulda Skill Lab",
        description: "색감과 관찰력 향상을 위한 색상 매칭 게임.",
        keywords: "색깔 맞추기, 색감, 관찰력, 색상 매칭",
      },
      "color-palette": {
        title: "색상 팔레트 생성기 - Onggeulda Skill Lab",
        description: "창작을 위한 아름다운 색상 조합을 생성하는 도구.",
        keywords: "색상 팔레트, 색상 생성기, 디자인 도구, 창작 도구",
      },
      keywords: {
        title: "키워드 생성기 - Onggeulda Skill Lab",
        description: "창작 영감을 위한 랜덤 키워드 생성 도구.",
        keywords: "키워드 생성기, 창작 영감, 랜덤 키워드, 아이디어",
      },
      "unit-converter": {
        title: "단위 변환기 - Onggeulda Skill Lab",
        description: "디자인 작업용 다양한 단위 변환 도구.",
        keywords: "단위 변환기, 픽셀 변환, 디자인 도구, 단위 계산",
      },
      "text-transformer": {
        title: "텍스트 변환기 - Onggeulda Skill Lab",
        description: "다양한 텍스트 변환 및 처리 기능을 제공하는 도구.",
        keywords: "텍스트 변환기, 텍스트 변환, 문자열 처리, 텍스트 도구",
      },
    };

    const data = metaData[subPage];
    if (data) {
      document.title = data.title;

      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) descMeta.content = data.description;

      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) keywordsMeta.content = data.keywords;

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.content = data.title;

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.content = data.description;
    }
  },

  // 페이지 상태 저장
  savePageState: function (page, subPage) {
    const state = { page, subPage, timestamp: Date.now() };
    localStorage.setItem("onggeulda_current_page", JSON.stringify(state));
  },

  // 페이지 상태 복원
  restorePageState: function () {
    try {
      const savedState = localStorage.getItem("onggeulda_current_page");
      if (savedState) {
        const { page, subPage, timestamp } = JSON.parse(savedState);

        // 24시간 이내의 상태만 복원
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          if (page && page !== "home") {
            showPage(page);
            if (subPage) {
              setTimeout(() => {
                if (page === "games") selectGame(subPage);
                if (page === "tools") selectTool(subPage);
              }, 200);
            }
            return true;
          }
        }
      }
    } catch (error) {
      console.warn("페이지 상태 복원 실패:", error);
    }
    return false;
  },

  // URL 해시에서 페이지 상태 파싱
  parseURLHash: function () {
    const hash = window.location.hash.slice(1); // # 제거
    if (hash) {
      const parts = hash.split("/");
      return {
        page: parts[0],
        subPage: parts[1] || null,
      };
    }
    return null;
  },

  // URL 해시로부터 페이지 로드
  loadFromURL: function () {
    const urlState = this.parseURLHash();
    if (urlState) {
      showPage(urlState.page);
      if (urlState.subPage) {
        setTimeout(() => {
          if (urlState.page === "games") selectGame(urlState.subPage);
          if (urlState.page === "tools") selectTool(urlState.subPage);
        }, 200);
      }
      return true;
    }
    return false;
  },
};

// 기존 함수들 개선
function showPageWithHistory(page) {
  showPage(page);
  PageStateManager.updateURL(page);
}

function selectGameWithHistory(gameId) {
  selectGame(gameId);
  PageStateManager.updateURL("games", gameId);
}

function selectToolWithHistory(toolId) {
  selectTool(toolId);
  PageStateManager.updateURL("tools", toolId);
}

// 브라우저 뒤로가기/앞으로가기 지원
window.addEventListener("popstate", (event) => {
  if (event.state) {
    const { page, subPage } = event.state;
    showPage(page);
    if (subPage) {
      setTimeout(() => {
        if (page === "games") selectGame(subPage);
        if (page === "tools") selectTool(subPage);
      }, 100);
    }
  } else {
    // 상태가 없으면 URL 해시에서 파싱
    if (!PageStateManager.loadFromURL()) {
      showPage("home");
    }
  }
});

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  // URL 해시 또는 저장된 상태에서 페이지 복원
  if (!PageStateManager.loadFromURL()) {
    if (!PageStateManager.restorePageState()) {
      // 기본 홈 페이지
      PageStateManager.updateURL("home");
    }
  }
});

// 기존 함수들을 히스토리 지원 버전으로 교체
document.addEventListener("click", function (event) {
  const target = event.target;

  // 네비게이션 아이템 클릭 시 히스토리 추가
  if (target.classList.contains("nav-item")) {
    event.preventDefault();
    const itemText = target.textContent.toLowerCase();
    if (itemText.includes("홈") || itemText.includes("home")) {
      showPageWithHistory("home");
    } else if (itemText.includes("게임") || itemText.includes("games")) {
      showPageWithHistory("games");
    } else if (itemText.includes("도구") || itemText.includes("tools")) {
      showPageWithHistory("tools");
    } else if (itemText.includes("소개") || itemText.includes("about")) {
      showPageWithHistory("about");
    }
  }

  // 사이트맵 아이템 클릭 시 히스토리 추가
  if (target.classList.contains("sitemap-item")) {
    event.preventDefault();
    const itemText = target.textContent.toLowerCase();
    if (itemText.includes("fps")) {
      showPageWithHistory("games");
      setTimeout(() => selectGameWithHistory("fps-aim"), 100);
    } else if (itemText.includes("반응속도")) {
      showPageWithHistory("games");
      setTimeout(() => selectGameWithHistory("reaction-test"), 100);
    } else if (itemText.includes("메모리")) {
      showPageWithHistory("games");
      setTimeout(() => selectGameWithHistory("memory-game"), 100);
    } else if (itemText.includes("색깔")) {
      showPageWithHistory("games");
      setTimeout(() => selectGameWithHistory("color-match"), 100);
    } else if (itemText.includes("색상")) {
      showPageWithHistory("tools");
      setTimeout(() => selectToolWithHistory("color-palette"), 100);
    } else if (itemText.includes("키워드")) {
      showPageWithHistory("tools");
      setTimeout(() => selectToolWithHistory("keywords"), 100);
    } else if (itemText.includes("단위")) {
      showPageWithHistory("tools");
      setTimeout(() => selectToolWithHistory("unit-converter"), 100);
    } else if (itemText.includes("텍스트")) {
      showPageWithHistory("tools");
      setTimeout(() => selectToolWithHistory("text-transformer"), 100);
    }
  }

  // 게임/도구 사이드바 클릭 시 히스토리 추가
  if (target.classList.contains("game-item")) {
    event.preventDefault();
    const itemText = target.textContent.toLowerCase();

    if (target.closest("#gamesPage")) {
      if (itemText.includes("fps")) {
        selectGameWithHistory("fps-aim");
      } else if (itemText.includes("반응속도")) {
        selectGameWithHistory("reaction-test");
      } else if (itemText.includes("메모리")) {
        selectGameWithHistory("memory-game");
      } else if (itemText.includes("색깔")) {
        selectGameWithHistory("color-match");
      }
    }

    if (target.closest("#toolsPage")) {
      if (itemText.includes("색상")) {
        selectToolWithHistory("color-palette");
      } else if (itemText.includes("키워드")) {
        selectToolWithHistory("keywords");
      } else if (itemText.includes("단위")) {
        selectToolWithHistory("unit-converter");
      } else if (itemText.includes("텍스트")) {
        selectToolWithHistory("text-transformer");
      }
    }
  }
});

// 외부에서 사용할 수 있도록 전역 함수로 노출
window.PageStateManager = PageStateManager;
window.showPageWithHistory = showPageWithHistory;
window.selectGameWithHistory = selectGameWithHistory;
window.selectToolWithHistory = selectToolWithHistory;
