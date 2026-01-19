document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const navLinks = document.querySelectorAll(".tab-menu a");
  const homeContent = app.innerHTML; // 초기 index.html 안의 메인 콘텐츠 저장

  async function router() {
    let hash = location.hash.replace("#", "") || "home";

    // 탭 active 표시
    navLinks.forEach(link => {
      if (link.getAttribute("href") === "#" + hash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // 메인페이지는 저장된 콘텐츠로 복원
    if (hash === "home") {
      app.innerHTML = homeContent;
      return;
    }

    // 외부 파일 불러오기 (기존 로직 그대로)
    try {
      const response = await fetch(hash);
      if (!response.ok) throw new Error("파일을 불러올 수 없음");
      const text = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const basePath = hash.substring(0, hash.lastIndexOf("/") + 1);

      // CSS 로드
      doc.querySelectorAll("link[rel='stylesheet']").forEach(link => {
        let href = link.getAttribute("href");
        if (!href.startsWith("http") && !href.startsWith("/")) {
          href = basePath + href;
        }
        if (!document.querySelector(`link[href="${href}"]`)) {
          const newLink = document.createElement("link");
          newLink.rel = "stylesheet";
          newLink.href = href;
          document.head.appendChild(newLink);
        }
      });

      // JS 실행
      doc.querySelectorAll("script").forEach(script => {
        const newScript = document.createElement("script");
        if (script.src) {
          let src = script.getAttribute("src");
          if (!src.startsWith("http") && !src.startsWith("/")) {
            src = basePath + src;
          }
          if (!document.querySelector(`script[src="${src}"]`)) {
            newScript.src = src;
            document.body.appendChild(newScript);
          }
        } else {
          newScript.textContent = script.textContent;
          document.body.appendChild(newScript);
        }
      });

      // 본문 삽입
      app.innerHTML = doc.body.innerHTML;
    } catch (err) {
      app.innerHTML = `<h2>404</h2><p>페이지를 찾을 수 없습니다.</p>`;
      console.error(err);
    }
  }

  window.addEventListener("hashchange", router);
  router();
});