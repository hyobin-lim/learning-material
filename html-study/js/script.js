/* eslint-env browser */

let lastScrollTop = 0;
let lastOpenedCard = null;
let isScrolling = false;

/* -------------------------------
   카드 클릭: 열고 닫기 + 헤더 상단 맞춤
-------------------------------- */
document.querySelectorAll('.card-header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.card');
    card.classList.toggle('open');

    if (card.classList.contains('open')) {
      lastOpenedCard = card;
      isScrolling = true;
      header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { isScrolling = false; }, 800);
    }
  });
});

/* -------------------------------
   검색: 매칭된 줄을 결과 박스에 복사해서 표시
-------------------------------- */
const form = document.getElementById('searchForm');
const input = document.getElementById('search');
const cards = document.querySelectorAll('.card');

// ✅ 결과 없음 메시지 박스
const resultMessageBox = document.createElement('div');
resultMessageBox.id = 'resultMessageBox';
resultMessageBox.style.cssText = `
  text-align:center;
  margin:10px 0;
  color:red;
  font-weight:bold;
  display:none;
`;
form.parentNode.insertBefore(resultMessageBox, form.nextSibling);

// ✅ 결과 표시 박스
const resultsBox = document.getElementById('searchResultsBox');
const resultsContainer = document.getElementById('searchResults');

/* -------------------------------
   전체 초기화
-------------------------------- */
function resetAll() {
  cards.forEach(card => {
    card.classList.remove('open');
    card.querySelectorAll('.card-row').forEach(row => {
      row.style.display = 'grid';
      row.classList.remove('highlight');
    });
  });

  resultMessageBox.style.display = 'none';
  updateSearchResult(0, false); // ✅ active 제거

  if (resultsContainer) {
    resultsContainer.innerHTML = '';
    resultsBox.style.display = 'none';
  }
}

/* -------------------------------
   검색 결과 개수 뱃지 + 문장 업데이트
-------------------------------- */
function updateSearchResult(count, show = true) {
  const container = document.querySelector('.search-result');
  const badgeIcon = document.querySelector('.badge i');
  const text = document.querySelector('.search-result .result-text');
  if (!container || !badgeIcon || !text) return;

  if (!show) {
    // ✅ active 클래스 제거 → 숨김
    container.classList.remove('active');
    badgeIcon.setAttribute('data-count', 0);
    return;
  }

  // ✅ active 클래스 추가 → 표시
  container.classList.add('active');
  badgeIcon.setAttribute('data-count', count);

  if (count === 0) {
    text.textContent = '';
  } else {
    text.innerHTML = `검색 결과가 <span class="badge"><i class="fa-regular fa-bell fa-2x" data-count="${count}"></i></span> 개 있습니다`;
  }
}

/* -------------------------------
   검색 실행
-------------------------------- */
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const keyword = input.value.trim().toLowerCase();
  let matchCount = 0;

  resultsContainer.innerHTML = '';
  resultsBox.style.display = 'none';

  if (keyword === '') {
    resetAll();
    input.value = '';
    return;
  }

  cards.forEach(card => card.classList.remove('open'));

  cards.forEach(card => {
    const rows = card.querySelectorAll('.card-row');

    rows.forEach(row => {
      if (row.querySelector('.card-h2')) return;

      const elements = row.querySelectorAll('.card-section a, .card-section p');
      let matched = false;

      for (let el of elements) {
        const text = (el.innerText || '').toLowerCase();
        const id = el.id ? el.id.toLowerCase() : '';
        if (text.includes(keyword) || id.includes(keyword)) {
          matched = true;
          break;
        }
      }

      if (matched) {
        matchCount++;
        const clone = row.cloneNode(true);
        resultsContainer.appendChild(clone);
      }
    });
  });

  if (matchCount === 0) {
    resultMessageBox.innerText = "검색 결과가 없습니다.";
    resultMessageBox.style.display = 'block';
    updateSearchResult(0, false);

    setTimeout(() => {
      resultMessageBox.style.display = 'none';
    }, 3000);

  } else {
    resultMessageBox.style.display = 'none';
    updateSearchResult(matchCount, true); // ✅ active 붙여서 표시
    resultsBox.style.display = 'block';
  }

  // ✅ 일정 시간 후 검색 결과 닫기
  setTimeout(() => {
    if (resultsBox.style.display === 'block') {
      resultsBox.style.display = 'none';
      resultsContainer.innerHTML = '';
      updateSearchResult(0, false); // ✅ active 제거
    }
  }, 60000);

  input.value = '';
});

/* -------------------------------
   입력 비워질 때 즉시 전체 복구
-------------------------------- */
input.addEventListener('input', () => {
  if (input.value.trim() === '') {
    resetAll(); // ✅ resetAll에서 active 제거까지 처리
  }
  // ✅ 메시지 박스 숨김
  resultMessageBox.style.display = 'none';

  // ✅ 검색 결과 카운트/문구 영역도 active 제거
  const resultBox = document.querySelector('.search-result');
  if (resultBox) {
    resultBox.classList.remove('active');
  }
});

/* -------------------------------
   스크롤 맨 위로 이동 버튼 (#scrollTopBox)
-------------------------------- */
const scrollTopBox = document.getElementById('scrollTopBox');
if (scrollTopBox) {
  scrollTopBox.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // ✅ 검색 결과 박스 닫기 추가
    if (resultsBox) {
      resultsBox.style.display = 'none';
      resultsContainer.innerHTML = '';
      updateSearchResult(0, false);
}
  });
}

/* -------------------------------
   스크롤 시 카드 닫기 로직 (마지막 카드 유지)
-------------------------------- */
let closeTimer = null; // ✅ 닫기 예약 타이머 변수

window.addEventListener('scroll', () => {
  if (isScrolling) return;

  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

 // ✅ 검색 결과 박스가 화면에서 벗어났을 때 닫기 예약
  if (resultsBox && resultsBox.style.display === 'block') {
    const rect = resultsBox.getBoundingClientRect();

    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      // 이미 예약된 타이머가 없을 때만 새로 예약
      if (!closeTimer) {
        closeTimer = setTimeout(() => {
          if (resultsBox.style.display === 'block') {
            resultsBox.style.display = 'none';
            resultsContainer.innerHTML = '';
            updateSearchResult(0, false); // active 제거
          }
          closeTimer = null; // ✅ 타이머 초기화
        }, 15000); // 15초
      }
    } else {
      // 화면 안에 다시 들어오면 예약 취소
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    }
  }

  // 맨 위로 올라왔을 때
  if (currentScroll === 0) {
    const card02 = document.getElementById('card02');
    if (card02 && card02.classList.contains('open')) {
      card02.classList.remove('open');
    }

    setTimeout(() => {
      if (window.pageYOffset === 0) {
        document.querySelectorAll('.card.open').forEach(card => {
          if (card.id !== 'card02') {
            card.classList.remove('open');
          }
        });
        lastScrollTop = 0;
        lastOpenedCard = null;
      }
    }, 2000);
    return;
  }

  // 열린 카드들 가져오기
  const openCards = Array.from(document.querySelectorAll('.card.open'));

  // 열린 카드 중 가장 아래에 있는 카드 찾기
  let lastOpenCard = null;
  if (openCards.length > 0) {
    lastOpenCard = openCards.reduce((prev, curr) => {
      return prev.offsetTop > curr.offsetTop ? prev : curr;
    });
  }

  // 스크롤 끝에 도달했을 때 열린 카드 닫기 (단, 가장 아래 카드 제외)
  if (currentScroll >= maxScroll) {
    openCards.forEach(card => {
      if (card === lastOpenCard) return; // 마지막 열린 카드는 유지
      card.classList.remove('open');
    });
  }

  // 카드 전체 기준으로 화면 벗어나면 닫기
  openCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const onlyOneOpen = openCards.length === 1;

    if ((onlyOneOpen || card !== lastOpenCard) &&
        (rect.bottom < -100 || rect.top > window.innerHeight + 100)) {
      card.classList.remove('open');
    }
  });

  // 스크롤을 위로 올릴 때 추가 체크
  if (currentScroll < lastScrollTop) {
    let closed = false;
    for (let card of openCards) {
      const header = card.querySelector('.card-header');
      if (!header) continue;
      const rect = header.getBoundingClientRect();
      if (rect.bottom >= window.innerHeight) {
        card.classList.remove('open');
        closed = true;
        break;
      }
    }
    if (!closed && lastOpenedCard && lastOpenedCard.classList.contains('open')) {
      const header = lastOpenedCard.querySelector('.card-header');
      if (header) {
        const rect = header.getBoundingClientRect();
        if (rect.top > 600) {
          lastOpenedCard.classList.remove('open');
          lastOpenedCard = null;
        }
      }
    }
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});