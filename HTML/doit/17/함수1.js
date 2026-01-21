// 함수
function 믹서기(a, b, c) {
  // let 과일1 = "바나나";
  // let 과일2 = "딸기";
  let 주스 = a + b + c;
  return 주스;
  return 과일1 + 과일2;
}
console.log(믹서기("딸기", "바나나", "코코넛"));
console.log(믹서기("돼지고기", "쉰김치"));
console.log("==========================");

function multiple(a, b, c = 0) {
  return a * b + c;
}
console.log(`5*10+20=${multiple(5, 10, 20)}`);
console.log(`5*10=${multiple(5, 10)}`);
console.log(`5*10=${multiple(5, 10)}`);
