document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const floatingOrder = document.querySelector(".floating-order");
  const animatedItems = document.querySelectorAll(
    ".info-card, .gallery-item, .review-card, .event-box, .bottom-cta-box, .hero-image"
  );

  const trackedButtons = document.querySelectorAll("[data-track]");
  const copyButtons = document.querySelectorAll("[data-copy]");
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  /* -----------------------------
   * 1) 스크롤 등장 애니메이션
   * ----------------------------- */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    animatedItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    animatedItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* -----------------------------
   * 2) 하단 주문 버튼 강조
   * ----------------------------- */
  const updateFloatingState = () => {
    if (!floatingOrder) return;

    if (window.scrollY > 260) {
      floatingOrder.classList.add("active");
    } else {
      floatingOrder.classList.remove("active");
    }
  };

  updateFloatingState();
  window.addEventListener("scroll", updateFloatingState, { passive: true });

  /* -----------------------------
   * 3) CTA 클릭 추적
   * - 지금은 console/localStorage 용
   * - 나중에 GA4, Meta Pixel, Dable로 교체 가능
   * ----------------------------- */
  const saveClickLog = (name) => {
    try {
      const key = "hoebriday_cta_logs";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push({
        name,
        time: new Date().toISOString(),
        path: location.pathname,
      });
      localStorage.setItem(key, JSON.stringify(prev.slice(-100)));
    } catch (error) {
      console.warn("CTA log save error:", error);
    }
  };

  trackedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const trackName = button.dataset.track || "unknown-click";
      console.log("[CTA CLICK]", trackName);
      saveClickLog(trackName);

      if (navigator.vibrate) {
        navigator.vibrate(12);
      }
    });
  });

  /* -----------------------------
   * 4) 메모 문구 복사
   * ----------------------------- */
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.dataset.copy || "당근";
      const originalText = button.textContent;

      try {
        await navigator.clipboard.writeText(text);
        button.classList.add("copied");
        button.textContent = `복사 완료: ${text}`;

        if (navigator.vibrate) {
          navigator.vibrate(18);
        }

        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove("copied");
        }, 1600);
      } catch (error) {
        console.warn("Clipboard copy failed:", error);
        button.textContent = "복사 실패";
        setTimeout(() => {
          button.textContent = originalText;
        }, 1400);
      }
    });
  });

  /* -----------------------------
   * 5) 내부 앵커 부드럽게 이동
   * ----------------------------- */
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* -----------------------------
   * 6) 페이지 진입 시 히어로 자연스럽게 표시
   * ----------------------------- */
  body.classList.add("page-ready");
});