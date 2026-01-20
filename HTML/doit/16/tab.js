// 모든 탭 래퍼를 선택
const tabWrappers = document.querySelectorAll('.tab-wrapper');

tabWrappers.forEach(wrapper => {
  // 현재 래퍼 안의 탭 메뉴 링크와 콘텐츠 선택
  const targetLinks = wrapper.querySelectorAll('.tab-menu a');
  const tabContents = wrapper.querySelectorAll('.tab-content > div');

  for (let i = 0; i < targetLinks.length; i++) {
    //console.log(targetLinks[i].getAttribute("href"));
    //console.log(wrapper.querySelector(targetLinks[i].getAttribute("href")));
    targetLinks[i].addEventListener('click', function (e) {
      console.log(e);
      
      const a = targetLinks[i].getAttribute("href");
      for (let k = 0; k < targetLinks.length; k++) {
      targetLinks[k].classList.remove('active');
      tabContents[k].classList.remove('active');}
        targetLinks[i].classList.add('active');

document.querySelector(a).classList.add('active');});
  }



  // 각 링크에 클릭 이벤트 등록
  targetLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      // 모든 링크와 콘텐츠에서 active 제거
      targetLinks.forEach(l => l.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // 현재 클릭한 링크 활성화
      link.classList.add('active');

      // href 속성값(#tabs-1 같은 id)을 가져와서 wrapper 내부에서 콘텐츠 찾기
      const currentId = link.getAttribute('href');
      const currentContent = wrapper.querySelector(currentId);

      // 해당 콘텐츠 활성화
      if (currentContent) {
        currentContent.classList.add('active');
      }
    });
  });

  // 초기 상태: 첫 번째 탭과 콘텐츠 활성화
  if (targetLinks.length > 0 && tabContents.length > 0) {
    targetLinks[0].classList.add('active');
    tabContents[0].classList.add('active');
  }
});

