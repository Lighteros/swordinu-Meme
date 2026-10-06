const canvas = document.getElementById("embers");
const ctx = canvas.getContext("2d");
const sparks = Array.from({ length: 70 }, () => spawn());

function spawn() {
  return {
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.8 + 0.4,
    s: Math.random() * 0.35 + 0.08,
    a: Math.random() * 0.7 + 0.2,
    w: Math.random() * 0.6 + 0.2
  };
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of sparks) {
    p.y -= p.s / 900;
    p.x += Math.sin(p.y * 30) * 0.00035;
    if (p.y < -0.02) {
      p.y = 1.02;
      p.x = Math.random();
    }
    ctx.beginPath();
    ctx.fillStyle = `rgba(240, 212, 138, ${p.a})`;
    ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

resize();
window.addEventListener("resize", resize);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw();

const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
links.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => links.classList.remove("open"));
});

const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...links.querySelectorAll("a[href^='#']")];
const spy = () => {
  const y = window.scrollY + 140;
  let current = sections[0].id;
  for (const section of sections) {
    if (section.offsetTop <= y) current = section.id;
  }
  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
};
window.addEventListener("scroll", spy, { passive: true });
spy();
