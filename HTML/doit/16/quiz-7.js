let output = ""; // 처음에는 빈 문자열로 시작
  for (let i = 1; i < 10; i++) {        // 행 반복 (1~9)
    for (let j = 1; j <= i; j++) {      // 열 반복 (행 번호만큼 별 추가)
      output += "⁕";                    // 별 하나 추가
    }
    output += "\n";                     // 줄바꿈
  }
  console.log(output);  