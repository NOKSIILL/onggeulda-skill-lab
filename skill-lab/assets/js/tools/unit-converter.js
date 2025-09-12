// 단위 변환기
function convertUnits() {
  const valueInput = document.getElementById("inputValue");
  const fromUnitSelect = document.getElementById("fromUnit");
  const toUnitSelect = document.getElementById("toUnit");
  const resultElement = document.getElementById("conversionResult");

  if (!valueInput || !fromUnitSelect || !toUnitSelect || !resultElement) return;

  const value = parseFloat(valueInput.value);
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;

  if (isNaN(value)) {
    resultElement.textContent = "올바른 숫자를 입력하세요";
    return;
  }

  // 모든 단위를 픽셀로 변환하는 비율 (96 DPI 기준)
  const toPx = {
    px: 1,
    pt: 4 / 3, // 1pt = 1/72 inch = 96/72 px = 4/3 px
    pc: 16, // 1pc = 12pt = 16px
    em: 16, // 기본 16px 기준
    rem: 16, // 기본 16px 기준
    vw: window.innerWidth / 100,
    vh: window.innerHeight / 100,
    in: 96, // 1inch = 96px (96 DPI)
    cm: 96 / 2.54, // 1cm = 1inch/2.54 = 96/2.54 px ≈ 37.795px
    mm: 96 / 25.4, // 1mm = 1cm/10 = 96/25.4 px ≈ 3.7795px
    q: 96 / 101.6, // 1q = 1mm/4 = 96/101.6 px ≈ 0.945px
  };

  // 픽셀로 변환 후 목표 단위로 변환
  const pxValue = value * toPx[fromUnit];
  const result = pxValue / toPx[toUnit];

  // 결과를 적절한 소수점으로 표시
  let displayResult;
  if (result >= 100) {
    displayResult = result.toFixed(1);
  } else if (result >= 1) {
    displayResult = result.toFixed(2);
  } else {
    displayResult = result.toFixed(4);
  }

  resultElement.textContent = `${displayResult} ${toUnit}`;

  // 추가 정보 표시 (픽셀 기준값도 함께 표시)
  if (fromUnit !== "px" && toUnit !== "px") {
    const pxInfo = ` (${pxValue.toFixed(2)}px 기준)`;
    resultElement.textContent += pxInfo;
  }
}

// 변환 결과 복사
function copyConversionResult() {
  const resultElement = document.getElementById("conversionResult");
  if (!resultElement) return;

  const result = resultElement.textContent;
  if (
    result &&
    result !== "결과가 여기에 표시됩니다" &&
    result !== "올바른 숫자를 입력하세요"
  ) {
    copyToClipboard(result)
      .then(() => {
        showCopyNotification("변환 결과가 복사되었습니다!");
      })
      .catch(() => {
        alert("복사에 실패했습니다.");
      });
  } else {
    showCopyNotification("복사할 결과가 없습니다");
  }
}
