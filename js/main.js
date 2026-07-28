// ============================
// SCROLL REVEAL — IntersectionObserver ile .reveal elemanlarını göster
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal");
  const langBars = document.querySelectorAll(".lang-bar-fill");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Dil seviye çubukları — görünür olunca doluyor
  const langObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          langObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  langBars.forEach((el) => langObserver.observe(el));

  // ============================
  // HERO YAZI MAKİNESİ EFEKTİ
  // ============================
  const typedEl = document.getElementById("typed-role");
  if (typedEl) {
    const roles = [
      "ASP.NET Core & Web API",
      "JWT Authentication & Authorization",
      "N-Tier Mimari & Repository Pattern",
      "RESTful API Tasarımı",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const textSpan = document.createElement("span");
    const cursorSpan = document.createElement("span");
    cursorSpan.className = "cursor";
    cursorSpan.textContent = "\u00A0";
    typedEl.appendChild(textSpan);
    typedEl.appendChild(cursorSpan);

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        textSpan.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        textSpan.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  // ============================
  // 3D HERO YAPISI — fare hareketiyle sağa/sola/yukarı/aşağı dönüş
  // ============================
  const hero3d = document.getElementById("hero3d");
  const hero3dInner = document.getElementById("hero3dInner");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (hero3d && hero3dInner && !prefersReducedMotion) {
    const maxTilt = 18; // derece cinsinden maksimum dönüş

    function handlePointerMove(e) {
      const rect = hero3d.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0 → 1
      const py = (e.clientY - rect.top) / rect.height; // 0 → 1
      const rotateX = (0.5 - py) * (maxTilt * 2); // yukarı/aşağı
      const rotateY = (px - 0.5) * (maxTilt * 2); // sağ/sol
      hero3dInner.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      hero3dInner.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    }

    function resetTilt() {
      hero3dInner.style.setProperty("--rx", "8deg");
      hero3dInner.style.setProperty("--ry", "-14deg");
    }

    // Masaüstü: fare hareketiyle
    window.addEventListener("mousemove", handlePointerMove, {
      passive: true,
    });
    hero3d.addEventListener("mouseleave", resetTilt);

    // Mobil: cihaz eğimiyle hafif dönüş (destekleniyorsa)
    window.addEventListener(
      "deviceorientation",
      (e) => {
        if (e.beta === null || e.gamma === null) return;
        const rotateX = Math.max(-maxTilt, Math.min(maxTilt, e.beta - 45));
        const rotateY = Math.max(-maxTilt, Math.min(maxTilt, e.gamma));
        hero3dInner.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
        hero3dInner.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      },
      { passive: true },
    );

    resetTilt();
  } else if (hero3d) {
    hero3d.classList.add("no-js");
  }

  // ============================
  // AKTİF NAV LİNKİ — scroll pozisyonuna göre
  // ============================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("header nav a[href^='#']");

  function onScroll() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`header nav a[href="#${id}"]`);
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });

    // Header gölgesi
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }

    // Yukarı çık butonu görünürlüğü
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ============================
  // YUKARI ÇIK BUTONU
  // ============================
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
