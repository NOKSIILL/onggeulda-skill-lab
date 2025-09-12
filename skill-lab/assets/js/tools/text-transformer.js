// 텍스트 변환기
function transformText(type) {
  const inputElement = document.getElementById("textInput");
  const resultElement = document.getElementById("textResult");

  if (!inputElement || !resultElement) return;

  const input = inputElement.value;

  if (!input.trim()) {
    resultElement.textContent = "텍스트를 입력하세요";
    return;
  }

  let transformed = "";

  switch (type) {
    case "upper":
      transformed = input.toUpperCase();
      break;
    case "lower":
      transformed = input.toLowerCase();
      break;
    case "title":
      transformed = input.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
      break;
    case "reverse":
      transformed = input.split("").reverse().join("");
      break;
    case "removeSpaces":
      transformed = input.replace(/\s+/g, "");
      break;
    case "addSpaces":
      transformed = input.replace(/\s+/g, " ").replace(/(.)/g, "$1 ").trim();
      break;
    case "capitalize":
      transformed = input.charAt(0).toUpperCase() + input.slice(1);
      break;
    case "alternating":
      transformed = input
        .split("")
        .map((char, index) =>
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join("");
      break;
    case "removeNumbers":
      transformed = input.replace(/\d/g, "");
      break;
    case "removeSpecial":
      transformed = input.replace(/[^a-zA-Z0-9가-힣\s]/g, "");
      break;
    default:
      transformed = input;
  }

  resultElement.textContent = transformed;
}

// 변환된 텍스트 복사
function copyTransformedText() {
  const resultElement = document.getElementById("textResult");
  if (!resultElement) return;

  const result = resultElement.textContent;
  if (
    result &&
    result !== "변환된 텍스트가 여기에 표시됩니다" &&
    result !== "텍스트를 입력하세요"
  ) {
    copyToClipboard(result)
      .then(() => {
        showCopyNotification("변환된 텍스트가 복사되었습니다!");
      })
      .catch(() => {
        alert("복사에 실패했습니다.");
      });
  } else {
    showCopyNotification("복사할 텍스트가 없습니다");
  }
}

// 텍스트 입력 필드 초기화
function clearTextInput() {
  const inputElement = document.getElementById("textInput");
  const resultElement = document.getElementById("textResult");

  if (inputElement) inputElement.value = "";
  if (resultElement)
    resultElement.textContent = "변환된 텍스트가 여기에 표시됩니다";
}

// 텍스트 통계 계산
function getTextStats(text) {
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length,
    paragraphs: text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length,
  };
}
