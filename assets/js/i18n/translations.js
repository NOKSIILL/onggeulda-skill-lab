// 완전한 다국어 번역 객체 - 모든 페이지 지원
const translations = {
  ko: {
    // ===== 기본 네비게이션 =====
    siteLogo: "Onggeulda Skills Lab",
    navHome: "홈",
    navGames: "게임",
    navTools: "도구",
    navAbout: "소개",

    // ===== 사이드바 =====
    sidebarTitle: "🎯 게임 목록",
    toolSidebarTitle: "🛠️ 도구 목록",

    // ===== 게임 목록 =====
    game1: "🎯 FPS 에임 훈련",
    game2: "🎲 반응속도 테스트",
    game3: "🎪 메모리 게임",
    game4: "🎨 색깔 맞추기",

    // ===== 도구 목록 =====
    tool1: "🎨 색상 팔레트 생성기",
    tool2: "💡 오늘의 키워드",
    tool3: "📏 단위 변환기",
    tool4: "🔤 텍스트 변환기",

    // ===== FPS 게임 =====
    gameTitle: "🎯 FPS 에임 훈련",
    scoreLabel: "점수",
    accuracyLabel: "정확도",
    reactionLabel: "평균 반응속도",
    timerLabel: "시간",
    startTitle: "🎯 FPS 에임 훈련 게임",
    startSubtitle:
      "빨간 타겟이 나타나면 빠르게 클릭하세요!<br>30초 동안 최대한 많은 타겟을 맞춰 반응속도와 정확도를 향상시키세요.",
    startButton: "게임 시작",
    gameOverTitle: "🏆 게임 완료!",
    finalScoreLabel: "최종 점수",
    finalAccuracyLabel: "정확도",
    finalReactionLabel: "평균 반응속도",
    finalHitsLabel: "명중 횟수",
    restartButton: "다시 시작",

    // ===== 반응속도 게임 =====
    reactionGameTitle: "🎲 반응속도 테스트",
    bestReactionLabel: "최고 기록",
    avgReactionLabel: "평균 기록",
    attemptsLabel: "시도 횟수",
    reactionStartText: "클릭해서 시작하세요!",
    reactionWaitText: "초록색이 되면 클릭하세요!",
    reactionClickText: "지금 클릭!",
    reactionTooFastText: "너무 빨라요! 클릭해서 다시 시도",

    // ===== 메모리 게임 =====
    memoryGameTitle: "🎪 메모리 게임",
    memoryInstructions: "🎪 메모리 게임 방법",
    memorySubInstructions:
      "카드를 클릭해서 뒤집고, 같은 그림의 카드 두 개를 찾아 매치하세요.<br>모든 카드를 매치하면 게임이 완료됩니다. 최소한의 시도로 완성해보세요!",
    matchesLabel: "매치",
    movesLabel: "시도",
    newGameButton: "새 게임",

    // ===== 색깔 맞추기 =====
    colorGameTitle: "🎨 색깔 맞추기",
    colorInstruction: "이 색과 같은 색을 선택하세요:",
    levelLabel: "레벨",

    // ===== 색상 팔레트 도구 =====
    colorPaletteTitle: "🎨 색상 팔레트 생성기",
    colorPaletteDesc: "창작에 영감을 주는 색상 조합",
    colorPaletteInstructions:
      "아름다운 색상 팔레트를 생성하고 창작 프로젝트에 활용하세요. 각 색상을 클릭하면 색상 코드가 복사됩니다.",
    generatePaletteButton: "새 팔레트 생성",
    copyPaletteButton: "전체 색상 코드 복사",

    // ===== 키워드 도구 =====
    keywordsTitle: "💡 오늘의 키워드",
    keywordsDesc: "창작 영감을 위한 키워드",
    keywordsInstructions:
      "랜덤하게 생성되는 키워드로 새로운 아이디어를 얻어보세요. 글쓰기, 그림, 음악 등 모든 창작 활동에 활용할 수 있습니다.",
    generateKeywordsButton: "새 키워드 생성",
    copyKeywordsButton: "키워드 복사",

    // ===== 단위 변환기 =====
    unitConverterTitle: "📏 단위 변환기",
    unitConverterDesc: "디자인 단위 변환기",
    unitConverterInstructions:
      "픽셀, 포인트, 인치, 센티미터 등 다양한 단위를 쉽게 변환하세요. 웹 디자인과 인쇄물 작업에 필수적인 도구입니다.",
    inputValueLabel: "변환할 값",
    resultLabel: "결과",
    fromUnitLabel: "변환 전 단위",
    toUnitLabel: "변환 후 단위",
    convertButton: "변환하기",
    copyResultButton: "결과 복사",
    resultPlaceholder: "결과가 여기에 표시됩니다",

    // ===== 텍스트 변환기 =====
    textTransformerTitle: "🔤 텍스트 변환기",
    textTransformerDesc: "다양한 텍스트 변환",
    textTransformerInstructions:
      "텍스트를 대문자, 소문자, 제목 형식 등으로 변환하고 다양한 텍스트 처리 기능을 활용하세요.",
    inputTextLabel: "변환할 텍스트 입력",
    textResultLabel: "변환 결과",
    textPlaceholder: "변환할 텍스트를 입력하세요...",
    textResultPlaceholder: "변환된 텍스트가 여기에 표시됩니다",
    upperCaseButton: "대문자 변환",
    lowerCaseButton: "소문자 변환",
    titleCaseButton: "제목 형식",
    reverseTextButton: "텍스트 뒤집기",
    removeSpacesButton: "공백 제거",
    addSpacesButton: "단어 간격",
    copyTextResultButton: "결과 복사하기",

    // ===== 홈페이지 배너 =====
    bannerTitle1: "🎯 게임과 도구의 허브",
    bannerSubtitle1: "FPS 에임 훈련부터 창작 도구까지, 모든 것이 한 곳에",
    bannerTitle2: "🚀 반응속도 향상",
    bannerSubtitle2: "다양한 게임으로 집중력과 반응속도를 키워보세요",
    bannerTitle3: "🎨 창작자 도구",
    bannerSubtitle3: "색상 팔레트, 키워드 생성기 등 창작에 필요한 모든 도구",

    // ===== 사이트맵 섹션 =====
    sitemapGames: "🎮 게임",
    sitemapTools: "🛠️ 창작 도구",
    sitemapGameInfo: "📊 게임 정보",
    sitemapToolInfo: "📋 도구 정보",

    // ===== 푸터 =====
    footerAbout: "사이트 소개",
    footerContact: "문의하기",
    footerPrivacy: "개인정보처리방침",
    footerTerms: "이용약관",
    footerLangTitle: "언어 / Language",

    // ===== 메타 정보 =====
    pageTitle: "Onggeulda Skills Lab — Daily Skill Practice & Tools",
    pageDescription:
      "Onggeulda Skills Lab: 일상적으로 연습하는 스킬 트레이닝과 간단한 창작 도구. Static Click, Flick, Tracking 등 실전형 연습 제공.",
    pageKeywords:
      "FPS 게임, 에임 훈련, 반응속도 게임, 온라인 게임, 무료 게임, 클릭 게임, 창작 도구, 색상 팔레트",

    // ===== 알림 메시지 =====
    copyNotification: "복사되었습니다!",
    gameCompleteNotification: "축하합니다! 게임 완료!",

    // ===== 소개 페이지 =====
    aboutTitle: "Onggeulda Skills Lab 소개",
    aboutDescription:
      "Onggeulda Skills Lab은 일상적으로 연습하는 게임 스킬 트레이닝과 간단한 창작 도구를 한 곳에서 제공하는 웹사이트입니다.",
    gamesSection: "🎮 게임 페이지:",
    toolsSection: "🛠️ 도구 페이지:",
    featuresTitle: "🎯 주요 특징",
    freeFeature: "✅ 무료 이용 - 모든 게임과 도구를 무료로 제공",
    noSignupFeature: "✅ 회원가입 불필요 - 즉시 사용 가능",
    responsiveFeature: "✅ 반응형 디자인 - 모든 디바이스에서 최적화",
    multiLangFeature: "✅ 다국어 지원 - 한국어/영어 지원",
    startGamesButton: "🎮 게임 시작하기",
    useToolsButton: "🛠️ 도구 사용하기",

    // ===== 게임/도구 설명 =====
    fpsAimDesc: "반응속도와 정확도를 향상시키는 타겟 클릭 게임입니다.",
    reactionTestDesc: "순간 반응 능력을 측정하고 개선할 수 있는 게임입니다.",
    memoryGameDesc: "기억력과 집중력 훈련을 위한 카드 매칭 게임입니다.",
    colorMatchDesc: "색감과 관찰력 향상을 위한 색상 매칭 게임입니다.",
    colorPaletteDesc: "창작을 위한 아름다운 색상 조합을 생성하는 도구입니다.",
    keywordsDesc: "창작 영감을 위한 랜덤 키워드를 생성하는 도구입니다.",
    unitConverterDesc: "디자인 작업용 다양한 단위를 변환하는 도구입니다.",
    textTransformerDesc:
      "다양한 텍스트 변환 및 처리 기능을 제공하는 도구입니다.",
  },
  en: {
    // ===== 기본 네비게이션 =====
    siteLogo: "Onggeulda Skills Lab",
    navHome: "Home",
    navGames: "Games",
    navTools: "Tools",
    navAbout: "About",

    // ===== 사이드바 =====
    sidebarTitle: "🎯 Game List",
    toolSidebarTitle: "🛠️ Tool List",

    // ===== 게임 목록 =====
    game1: "🎯 FPS Aim Training",
    game2: "🎲 Reaction Speed Test",
    game3: "🎪 Memory Game",
    game4: "🎨 Color Match",

    // ===== 도구 목록 =====
    tool1: "🎨 Color Palette Generator",
    tool2: "💡 Daily Keywords",
    tool3: "📏 Unit Converter",
    tool4: "🔤 Text Transformer",

    // ===== FPS 게임 =====
    gameTitle: "🎯 FPS Aim Training",
    scoreLabel: "Score",
    accuracyLabel: "Accuracy",
    reactionLabel: "Avg Reaction",
    timerLabel: "Time",
    startTitle: "🎯 FPS Aim Training Game",
    startSubtitle:
      "Click the red targets as fast as you can!<br>Hit as many targets as possible in 30 seconds to improve your reaction speed and accuracy.",
    startButton: "Start Game",
    gameOverTitle: "🏆 Game Complete!",
    finalScoreLabel: "Final Score",
    finalAccuracyLabel: "Accuracy",
    finalReactionLabel: "Avg Reaction",
    finalHitsLabel: "Total Hits",
    restartButton: "Play Again",

    // ===== 반응속도 게임 =====
    reactionGameTitle: "🎲 Reaction Speed Test",
    bestReactionLabel: "Best Time",
    avgReactionLabel: "Avg Time",
    attemptsLabel: "Attempts",
    reactionStartText: "Click to start!",
    reactionWaitText: "Wait for green!",
    reactionClickText: "Click now!",
    reactionTooFastText: "Too fast! Click to try again",

    // ===== 메모리 게임 =====
    memoryGameTitle: "🎪 Memory Game",
    memoryInstructions: "🎪 How to Play Memory Game",
    memorySubInstructions:
      "Click cards to flip them and find matching pairs.<br>Match all cards to complete the game. Try to finish with the fewest moves!",
    matchesLabel: "Matches",
    movesLabel: "Moves",
    newGameButton: "New Game",

    // ===== 색깔 맞추기 =====
    colorGameTitle: "🎨 Color Match",
    colorInstruction: "Select the color that matches this one:",
    levelLabel: "Level",

    // ===== 색상 팔레트 도구 =====
    colorPaletteTitle: "🎨 Color Palette Generator",
    colorPaletteDesc: "Inspiring color combinations for creativity",
    colorPaletteInstructions:
      "Generate beautiful color palettes for your creative projects. Click each color to copy its color code.",
    generatePaletteButton: "Generate New Palette",
    copyPaletteButton: "Copy All Color Codes",

    // ===== 키워드 도구 =====
    keywordsTitle: "💡 Daily Keywords",
    keywordsDesc: "Keywords for creative inspiration",
    keywordsInstructions:
      "Get new ideas with randomly generated keywords. Use them for writing, drawing, music, and all creative activities.",
    generateKeywordsButton: "Generate New Keywords",
    copyKeywordsButton: "Copy Keywords",

    // ===== 단위 변환기 =====
    unitConverterTitle: "📏 Unit Converter",
    unitConverterDesc: "Design unit converter",
    unitConverterInstructions:
      "Easily convert between pixels, points, inches, centimeters and other units. Essential tool for web design and print work.",
    inputValueLabel: "Input Value",
    resultLabel: "Result",
    fromUnitLabel: "From Unit",
    toUnitLabel: "To Unit",
    convertButton: "Convert",
    copyResultButton: "Copy Result",
    resultPlaceholder: "Result will be displayed here",

    // ===== 텍스트 변환기 =====
    textTransformerTitle: "🔤 Text Transformer",
    textTransformerDesc: "Various text transformations",
    textTransformerInstructions:
      "Transform text to uppercase, lowercase, title case and use various text processing features.",
    inputTextLabel: "Input Text",
    textResultLabel: "Transform Result",
    textPlaceholder: "Enter text to transform...",
    textResultPlaceholder: "Transformed text will be displayed here",
    upperCaseButton: "UPPERCASE",
    lowerCaseButton: "lowercase",
    titleCaseButton: "Title Case",
    reverseTextButton: "Reverse Text",
    removeSpacesButton: "Remove Spaces",
    addSpacesButton: "Add Spaces",
    copyTextResultButton: "Copy Result",

    // ===== 홈페이지 배너 =====
    bannerTitle1: "🎯 Hub for Games & Tools",
    bannerSubtitle1:
      "From FPS aim training to creative tools, everything in one place",
    bannerTitle2: "🚀 Improve Reaction Speed",
    bannerSubtitle2: "Enhance your focus and reaction time with various games",
    bannerTitle3: "🎨 Creator Tools",
    bannerSubtitle3:
      "Color palettes, keyword generators and all tools for creativity",

    // ===== 사이트맵 섹션 =====
    sitemapGames: "🎮 Games",
    sitemapTools: "🛠️ Creative Tools",
    sitemapGameInfo: "📊 Game Information",
    sitemapToolInfo: "📋 Tool Information",

    // ===== 푸터 =====
    footerAbout: "About Site",
    footerContact: "Contact",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerLangTitle: "Language / 언어",

    // ===== 메타 정보 =====
    pageTitle: "Onggeulda Skills Lab — Daily Skill Practice & Tools",
    pageDescription:
      "Onggeulda Skills Lab: Daily skill training and simple creative tools. Providing practical training like Static Click, Flick, Tracking and more.",
    pageKeywords:
      "FPS games, aim training, reaction speed games, online games, free games, click games, creative tools, color palette",

    // ===== 알림 메시지 =====
    copyNotification: "Copied!",
    gameCompleteNotification: "Congratulations! Game Complete!",

    // ===== 소개 페이지 =====
    aboutTitle: "About Onggeulda Skills Lab",
    aboutDescription:
      "Onggeulda Skills Lab is a website that provides daily skill training and simple creative tools in one place.",
    gamesSection: "🎮 Games:",
    toolsSection: "🛠️ Tools:",
    featuresTitle: "🎯 Key Features",
    freeFeature: "✅ Free to Use - All games and tools provided for free",
    noSignupFeature: "✅ No Registration Required - Ready to use immediately",
    responsiveFeature: "✅ Responsive Design - Optimized for all devices",
    multiLangFeature: "✅ Multi-language Support - Korean/English support",
    startGamesButton: "🎮 Start Games",
    useToolsButton: "🛠️ Use Tools",

    // ===== 게임/도구 설명 =====
    fpsAimDesc: "Target clicking game to improve reaction speed and accuracy.",
    reactionTestDesc: "Game to measure and improve instant reaction ability.",
    memoryGameDesc: "Card matching game for memory and concentration training.",
    colorMatchDesc:
      "Color matching game to improve color perception and observation.",
    colorPaletteDesc:
      "Tool to generate beautiful color combinations for creativity.",
    keywordsDesc: "Tool to generate random keywords for creative inspiration.",
    unitConverterDesc: "Tool to convert various units for design work.",
    textTransformerDesc:
      "Tool providing various text transformation and processing features.",
  },
};

// 전역으로 노출
window.translations = translations;
