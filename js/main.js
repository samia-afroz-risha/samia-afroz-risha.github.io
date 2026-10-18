// ===== Theme toggle (remembers choice) =====
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
function setTheme(t) {
  root.setAttribute("data-theme", t);
  themeBtn.innerHTML = t === "dark" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () =>
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark")
);

// ===== Mobile menu =====
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// ===== Typing effect =====
const roles = ["Full Stack Developer", "Blockchain & DApp Developer", "AI / ML Researcher", "Robotics & IoT Builder", "Laravel · MERN · Solidity"];
const typed = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
(function type() {
  const word = roles[r];
  if (!deleting) {
    c++;
    typed.textContent = word.slice(0, c);
    if (c === word.length) { deleting = true; return setTimeout(type, 1800); } // hold full word
    return setTimeout(type, 90);
  }
  c--;
  typed.textContent = word.slice(0, c);
  if (c === 0) { deleting = false; r = (r + 1) % roles.length; return setTimeout(type, 400); }
  setTimeout(type, 45);
})();

// ===== Navbar shadow, active link, back-to-top =====
const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 500);
  sections.forEach(s => {
    const link = navLinks.querySelector(`a[href="#${s.id}"]`);
    if (link) link.classList.toggle("active", y >= s.offsetTop - 120 && y < s.offsetTop + s.offsetHeight - 120);
  });
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

// ===== Reveal on scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".section, .project-card, .t-item").forEach(el => { el.classList.add("reveal"); io.observe(el); });

// ===== Project filter =====
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card =>
      card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f)
    );
  });
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Hero: animated blockchain node network =====
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");
let nodes = [];
function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
  }));
}
function draw() {
  const accent = getComputedStyle(root).getPropertyValue("--accent").trim() || "#2f80ed";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
  });
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        ctx.globalAlpha = (1 - d / 130) * 0.35;
        ctx.strokeStyle = accent;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = accent;
  nodes.forEach(n => ctx.fillRect(n.x - 2.5, n.y - 2.5, 5, 5)); // square "blocks"
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}
window.addEventListener("resize", resize);
resize();
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw();

// ===== Project gallery slider =====
(function () {
  const g = document.getElementById("gallery");
  if (!g) return;
  const track = g.querySelector(".g-track");
  const slides = [...g.querySelectorAll(".slide")];
  const dotsBox = g.querySelector(".g-dots");
  let i = 0, timer;

  // load image: try .jpg, then .png; keep icon if neither exists
  slides.forEach(s => {
    const box = s.querySelector(".slide-media");
    const base = box.dataset.img;
    const img = new Image();
    img.alt = s.querySelector("h4").textContent + " screenshot";
    img.onload = () => { box.innerHTML = ""; box.appendChild(img); };
    img.onerror = () => { if (!img.dataset.png) { img.dataset.png = 1; img.src = base + ".png"; } };
    img.src = base + ".jpg";
  });

  slides.forEach((_, k) => {
    const d = document.createElement("button");
    d.setAttribute("aria-label", "Go to slide " + (k + 1));
    d.onclick = () => { go(k); restart(); };
    dotsBox.appendChild(d);
  });
  const dots = [...dotsBox.children];

  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(i + 1), 4500); }

  g.querySelector(".prev").onclick = () => { go(i - 1); restart(); };
  g.querySelector(".next").onclick = () => { go(i + 1); restart(); };
  g.addEventListener("mouseenter", () => clearInterval(timer));
  g.addEventListener("mouseleave", restart);

  // swipe on phones
  let x0 = null;
  track.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); restart(); }
    x0 = null;
  });

  go(0);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) restart();
})();
