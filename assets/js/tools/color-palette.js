// 색상 팔레트 생성기
function generateColorPalette() {
  const palette = document.getElementById("colorPalette");
  if (!palette) return;

  palette.innerHTML = "";

  const baseHue = Math.floor(Math.random() * 360);

  for (let i = 0; i < 6; i++) {
    const hue = (baseHue + i * 30) % 360;
    const saturation = 60 + Math.floor(Math.random() * 40);
    const lightness = 40 + Math.floor(Math.random() * 40);
    const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // HSL을 HEX로 변환
    const hexColor = hslToHex(hue, saturation, lightness);

    const colorContainer = document.createElement("div");
    colorContainer.className = "color-container";

    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = hslColor;
    colorBox.title = hexColor;

    const colorCode = document.createElement("div");
    colorCode.className = "color-code";
    colorCode.textContent = hexColor;

    colorBox.addEventListener("click", () => {
      copyToClipboard(hexColor)
        .then(() => {
          showCopyNotification(`${hexColor} 복사됨`);
        })
        .catch(() => {
          alert("복사에 실패했습니다.");
        });
    });

    colorContainer.appendChild(colorBox);
    colorContainer.appendChild(colorCode);
    palette.appendChild(colorContainer);
  }
}

// 전체 팔레트 복사
function copyPalette() {
  const colorBoxes = document.querySelectorAll("#colorPalette .color-box");
  const colors = Array.from(colorBoxes).map((box) => box.title);

  copyToClipboard(colors.join(", "))
    .then(() => {
      showCopyNotification("전체 색상 코드가 복사되었습니다!");
    })
    .catch(() => {
      alert("복사에 실패했습니다. 다시 시도해주세요.");
    });
}
