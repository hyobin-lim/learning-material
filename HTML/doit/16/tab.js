const tabs = document.querySelectorAll(".tab-menu a");
const panels = document.querySelectorAll(".tab-content>div");

// 반복문
for (let i = 0; i < 3; i++) {
  //console.log(tabs[i].getAttribute("href"));
  //console.log(document.querySelector(tabs[i].getAttribute("href")));
  tabs[i].addEventListener("click", function (k) {
    k.preventDefault();
    const a = tabs[i].getAttribute("href");
    for (let k = 0; k < 3; k++) {
      tabs[k].classList.remove("active");
      panels[k].classList.remove("active");
    }
    tabs[i].classList.add("active");
    document.querySelector(a).classList.add("active");
  });
}

//배열자료형의 특정 데이터만 취득하고싶을땐 배열[index]
//const arr = [1, 2, 3];
//console.log(arr[0]);
