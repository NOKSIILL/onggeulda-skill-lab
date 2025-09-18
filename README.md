# Onggeulda Skills Lab

FPS 에임 훈련, 반응속도 테스트, 메모리 게임, 색깔 맞추기 게임과 다양한 창작 도구를 제공하는 올인원 웹 애플리케이션입니다.

## ✨ 주요 기능

### 🎯 게임

- **FPS 에임 훈련**: 반응속도와 정확도 향상을 위한 타겟 클릭 게임
- **반응속도 테스트**: 순간 반응 능력 측정 게임
- **메모리 게임**: 기억력과 집중력 훈련을 위한 카드 매칭 게임
- **색깔 맞추기**: 색감과 관찰력 향상을 위한 색상 매칭 게임

### 🛠️ 창작 도구

- **색상 팔레트 생성기**: 창작을 위한 아름다운 색상 조합 생성
- **오늘의 키워드**: 창작 영감을 위한 랜덤 키워드 생성
- **단위 변환기**: 디자인 작업용 다양한 단위 변환 도구
- **텍스트 변환기**: 다양한 텍스트 변환 및 처리 기능

### 🌐 다국어 지원

- 한국어/영어 지원
- 실시간 언어 전환

## 📁 프로젝트 구조

onggeulda-skills-lab/
├── index.html # ✅ 새로운 홈페이지
├── about.html # ✅ 소개 페이지  
├── contact.html # ✅ 문의하기 페이지
├── privacy.html # ✅ 개인정보처리방침
├── terms.html # ✅ 이용약관
├── sitemap.xml # ✅ SEO 사이트맵
├── robots.txt # ✅ 검색엔진 로봇 설정
├── games/
│ ├── index.html # ✅ 게임 목록 페이지
│ ├── fps-aim.html # ✅ FPS 에임 훈련
│ ├── reaction-test.html # ✅ 반응속도 테스트
│ ├── memory-game.html # ✅ 메모리 게임
│ └── color-match.html # ✅ 색깔 맞추기
├── tools/
│ ├── index.html # ✅ 도구 목록 페이지
│ ├── color-palette.html # ✅ 색상 팔레트 생성기
│ ├── keywords.html # ✅ 키워드 생성기
│ ├── unit-converter.html # ✅ 단위 변환기
│ └── text-transformer.html # ✅ 텍스트 변환기
├── shared/ # ✅ 공통 컴포넌트
│ ├── components.js # ✅ 컴포넌트 로더
│ ├── header.html # ✅ 공통 헤더
│ ├── footer.html # ✅ 공통 푸터
│ ├── game-sidebar.html # ✅ 게임 사이드바
│ └── tool-sidebar.html # ✅ 도구 사이드바
└── assets/ # 기존 리소스 유지
├── css/ (기존 파일들)
└── js/ (기존 파일들)

## 📁 (변경 예정) 전체 디렉토리 구조

onggeulda-skills-lab/
│
├── 📄 index.html # 언어 감지 + 리다이렉트 # 기존 리소스 (변경 없음) #index-lang.html 로 임의 추가해 둠
├── 📄 .htaccess # 서버 설정 (Apache)
├── 📄 README.md # 프로젝트 설명서
├── 📄 robots.txt # 검색엔진 크롤링 규칙 # 기존 리소스 (변경 없음) #robots-lang.txt 로 임의 추가해 둠
├── 📄 sitemap.xml # 통합 사이트맵 #sitemap-lang.xml 로 임의 추가해 둠
├── 📄 sitemap-ko.xml # 한국어 사이트맵
├── 📄 sitemap-en.xml # 영어 사이트맵
│
├── 📂 ko/ # 🇰🇷 한국어 버전
│ ├── 📄 index.html # 한국어 홈페이지
│ ├── 📂 games/
│ │ ├── 📄 index.html # 게임 목록 페이지 # 기존 리소스 (변경 없음)
│ │ ├── 📄 fps-aim.html # FPS 에임 훈련 # 기존 리소스 (변경 없음)
│ │ ├── 📄 reaction-test.html # 반응속도 테스트 # 기존 리소스 (변경 없음)
│ │ ├── 📄 memory-game.html # 메모리 게임 # 기존 리소스 (변경 없음)
│ │ └── 📄 color-match.html # 색깔 맞추기 # 기존 리소스 (변경 없음)
│ ├── 📂 tools/
│ │ ├── 📄 index.html # 도구 목록 페이지 # 기존 리소스 (변경 없음)
│ │ ├── 📄 color-palette.html # 색상 팔레트 생성기 # 기존 리소스 (변경 없음)
│ │ ├── 📄 keywords.html # 키워드 생성기 # 기존 리소스 (변경 없음)
│ │ ├── 📄 unit-converter.html # 단위 변환기 # 기존 리소스 (변경 없음)
│ │ └── 📄 text-transformer.html # 텍스트 변환기 # 기존 리소스 (변경 없음)
│ └── 📂 about/
│ ├── 📄 about.html # 소개 페이지 # 기존 리소스 (변경 없음)
│ ├── 📄 contact.html # 문의하기 페이지 # 기존 리소스 (변경 없음)
│ ├── 📄 privacy.html # 개인정보처리방침 # 기존 리소스 (변경 없음)
│ └── 📄 terms.html # 이용약관 # 기존 리소스 (변경 없음)
│
├── 📂 en/ # 🇺🇸 영어 버전
│ ├── 📄 index.html # English Homepage
│ ├── 📂 games/
│ │ ├── 📄 index.html # Games List (English)
│ │ ├── 📄 fps-aim.html # FPS Aim Trainer
│ │ ├── 📄 reaction-test.html # Reaction Speed Test
│ │ ├── 📄 memory-game.html # Memory Game
│ │ └── 📄 color-match.html # Color Matching Game
│ ├── 📂 tools/
│ │ ├── 📄 index.html # Tools List (English)
│ │ ├── 📄 color-palette.html # Color Palette Generator
│ │ ├── 📄 keywords.html # Keyword Tool
│ │ ├── 📄 unit-converter.html # Unit Converter
│ │ └── 📄 text-transformer.html # Text Transformer
│ └── 📂 about/
│ ├── 📄 about.html # About Page
│ ├── 📄 contact.html # Contact
│ ├── 📄 privacy.html # Privacy Policy
│ └── 📄 terms.html # Terms of Service
│
├── 📂 shared/ # 🔧 공통 리소스
│ ├── 📂 components/
│ │ ├── 📄 header-ko.html # 한국어 헤더
│ │ ├── 📄 header-en.html # 영어 헤더
│ │ ├── 📄 footer-ko.html # 한국어 푸터
│ │ └── 📄 footer-en.html # 영어 푸터
│ └── 📂 js/
│ │ ├── 📄 lang-detector.js # 언어 감지
│ │ ├── 📄 component-loader.js # 컴포넌트 로더 (수정된 버전)
│ │ └── 📄 url-manager.js # URL 라우팅 및 상태 관리 개선
│ ├── 📄components.js # 현재 사이트 컴포넌트 로더 # 기존 리소스 (변경 없음)
│ ├── 📄header.html # 현재 사이트 헤더 # 기존 리소스 (변경 없음)
│ ├── 📄game-sidebar.html # 현재 사이트 게임 사이드바 # 기존 리소스 (변경 없음)
│ ├── 📄tool-sidebar.html # 현재 사이트 사이드바 # 기존 리소스 (변경 없음)
│ └── 📄footer.html # 현재 사이트 푸터 # 기존 리소스 (변경 없음)
│
├── 📂 config/  
│ └── seo.json # SEO 메타데이터 설정 # 기존 리소스 (변경 없음)
│
└── 📂 assets/ # 🎨 기존 공통 리소스 # 기존 리소스 (변경 없음)
│ ├── 📂 css/
│ │ ├── 📄main.css # 메인 애플리케이션 스타일 # 기존 리소스 (변경 없음)
│ │ ├── 📄responsive.css # 반응형 (미디어 사이즈 : 기본,PC,태블릿,모바일(기본),모바일(소형)) 스타일 # 기존 리소스 (변경 없음)
│ │ ├── 📄games.css # 게임 관련 스타일 # 기존 리소스 (변경 없음)
│ │ └── 📄tools.css # 도구 관련 스타일 # 기존 리소스 (변경 없음)
│ └── 📂 js/
│ ├── 📂games/
│ │ ├── 📄fps-aim.js # FPS 에임 훈련 게임 # 기존 리소스 (변경 없음)
│ │ ├── 📄reaction-test.js # 반응속도 테스트 게임 # 기존 리소스 (변경 없음)
│ │ ├── 📄memory-game.js # 메모리 게임 # 기존 리소스 (변경 없음)
│ │ └── 📄color-match.js # 색깔 맞추기 게임 # 기존 리소스 (변경 없음)
│ ├── 📂i8n/ # 삭제 예정
│ │ └── 📄translations.js # 다국어 번역 데이터 # 삭제 예정
│ ├── 📂tools/
│ │ ├── 📄color-palette.js # 색상 팔레트 생성기 # 기존 리소스 (변경 없음)
│ │ ├── 📄keywords.js # 키워드 생성기 # 기존 리소스 (변경 없음)
│ │ ├── 📄unit-converter.js # 단위 변환기 # 기존 리소스 (변경 없음)
│ │ └── 📄text-transformer.js # 텍스트 변환기 # 기존 리소스 (변경 없음)
│ ├── 📂utils/
│ │ └── 📄helpers.js # 공통 유틸리티 함수 # 기존 리소스 (변경 없음)
│ ├── 📄main.js # 메인 애플리케이션 로직 # 기존 리소스 (변경 없음)
│ └── 📄url-routing.js # URL 라우팅 및 상태 관리 개선 # 기존 리소스 (변경 없음)
├── 📂 games/
│ ├── 📄 index.html # 게임 목록 페이지 # 기존 리소스 (변경 없음)
│ ├── 📄 fps-aim.html # FPS 에임 훈련 # 기존 리소스 (변경 없음)
│ ├── 📄 reaction-test.html # 반응속도 테스트 # 기존 리소스 (변경 없음)
│ ├── 📄 memory-game.html # 메모리 게임 # 기존 리소스 (변경 없음)
│ └── 📄 color-match.html # 색상 맞추기 # 기존 리소스 (변경 없음)
├── 📂 tools/
│ ├── 📄 index.html # 도구 목록 페이지 # 기존 리소스 (변경 없음)
│ ├── 📄 color-palette.html # 색상 팔레트 생성기 # 기존 리소스 (변경 없음)
│ ├── 📄 keywords.html # 키워드 생성기 # 기존 리소스 (변경 없음)
│ ├── 📄 unit-converter.html # 단위 변환기 # 기존 리소스 (변경 없음)
│ └── 📄 text-transformer.html # 텍스트 변환기 # 기존 리소스 (변경 없음)
└── 📂 about/
│ ├── 📄 about.html # 소개 페이지 # 기존 리소스 (변경 없음)
│ ├── 📄 contact.html # 문의하기 페이지 # 기존 리소스 (변경 없음)
│ ├── 📄 privacy.html # 개인정보처리방침 # 기존 리소스 (변경 없음)
│ └── 📄 terms.html # 이용약관 # 기존 리소스 (변경 없음)
└── 📂 images/ # 이미지 리소스 # 비어있음

## 🚀 설치 및 실행

### 1. 프로젝트 다운로드

git clone https://github.com/your-username/*.git
cd game-hu

text

### 2. 웹 서버 실행

정적 파일 서버를 사용하여 실행:

Python 사용 (Python 3)
python -m http.server 8000

Node.js serve 패키지 사용
npx serve .

VS Code Live Server 확장 사용 (권장)

text

### 3. 브라우저에서 접속

http://localhost:8000

text

## 🔧 커스터마이징

### 색상 테마 변경

`assets/css/main.css`의 CSS 변수를 수정:

:root {
--primary-color: #00ff88; /
--secondary-color: #00cc6a 보조 색상 /
--background-dark: #1a1a2e 어두운 배경 /
--background-mid: #16213e; 중간 배경 /
--background-light: #0f346 밝은 배경 \*/

text

### 게임 설정 변경

각 게임의 설정을 `assets/js/games/` 디렉토리의 해당 파일에서 수정:

// FPS 에임 게임 설정 (fps-aim.js)
const GAME_DURATION = 30; // 게임 시간 (초)
const TARGET_SIZE = 60; // 타겟 크기 (픽셀)
// 메모리 게임 설정 (memory-game.js)
const CARD_SYMBOLS = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎵', '⭐', '🔥'];

text

### 키워드 데이터 추가

`assets/js/tools/keywords.js`에서 키워드 데이터 수정:

const keywordData = {
noun
: [ '바다', '산', '별'
'꿈', '여행',

// 새로운 명
추가 ], adjecti
es: [
'

text

## 🎨 스타일 가이드

### CSS 클래스 명명 규칙

- **BEM 방법론** 사용
- **component-name\_\_element--modifier** 형식

### JavaScript 코딩 스타일

- **camelCase** 변수명 사용
- **함수형 프로그래밍** 원칙 적용
- **모듈화된 구조**로 관리

## 📱 반응형 디자인

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 767px 이하

각 breakpoint에서 최적화된 레이아웃 제공

## 🌍 브라우저 호환성

- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

## 📈 성능 최적화

### 이미지 최적화

- **WebP** 형식 사용 권장
- **lazy loading** 구현
- **적절한 이미지 크기** 사용

### JavaScript 최적화

- **코드 분할** (파일별 모듈화)
- **이벤트 델리게이션** 사용
- **불필요한 DOM 조작** 최소화

### CSS 최적화

- **Critical CSS** 인라인 처리
- **미사용 CSS** 제거
- **CSS Grid/Flexbox** 활용

## 🔍 SEO 최적화

### 메타 태그 설정

`config/seo.json`에서 SEO 데이터 관리:

{
"title": "게임 허브 - FPS 에임 훈련 및 온라인
임", "description": "무료 FPS 에임 훈련 게임과 다양한 온라인 게임을
즐기세요.", "keywords": "FPS 게임, 에임 훈
, 반응속도 게임", "ogImage": "assets/imag

text

### 구조화된 데이터

- **JSON-LD** 스키마 마크업 추가
- **Open Graph** 메타 태그 설정
- **Twitter Card** 메타 태그 설정

## 🚀 배포

### GitHub Pages

gh-pages 브랜치에 배포
npm install -g gh-pages

text

### Netlify

1. GitHub 리포지토리 연결
2. 빌드 설정: `publish directory: .`
3. 자동 배포 활성화

### Vercel

npm install -g vercel
verc

text

## 🤝 기여하기

1. **Fork** 프로젝트
2. **Feature branch** 생성 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항 (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Pull Request** 생성

## 📝 라이선스

이 프로젝트는 **MIT License** 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

- **이메일**: your-email@example.com
- **GitHub**: https://github.com/your-username
- **웹사이트**: https://your-website.com

## 🙏 감사의 글

이 프로젝트를 만드는데 도움을 주신 모든 분들께 감사드립니다.

---

**⭐ 이 프로젝트가 유용하다면 스타를 눌러주세요!**
