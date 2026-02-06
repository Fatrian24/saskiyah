// ================================
// EDIT DI SINI YA ✅
// ================================
const coupleStartDate = new Date("2025-11-01T00:00:00"); // tanggal jadian
const yourName = "Fatrian";
const partnerName = "Saskiyah"; // ganti nama pasangan kamu
// ================================

const bgMusic = document.getElementById("bgMusic");
const toggleMusic = document.getElementById("toggleMusic");

const loveCount = document.getElementById("loveCount");
const heartClicks = document.getElementById("heartClicks");

const btnTapLove = document.getElementById("tapLove");
const btnQuote = document.getElementById("randomQuote");

const openLetter = document.getElementById("openLetter");
const letterModal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");
const copyLetter = document.getElementById("copyLetter");
const changeLetter = document.getElementById("changeLetter");
const letterText = document.getElementById("letterText");

const imgModal = document.getElementById("imgModal");
const closeImg = document.getElementById("closeImg");
const modalImg = document.getElementById("modalImg");

const toast = document.getElementById("toast");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const scrollToGallery = document.getElementById("scrollToGallery");
const scrollToTime = document.getElementById("scrollToTime");

const hero = document.getElementById("hero");
const bgLayer = document.querySelector(".bg");
const cards = document.querySelectorAll(".card, .stat, .time-card, .photo");

// Quotes & Letters
const quotes = [
  "Kalau kamu capek, sini… aku peluk, bukan aku tanya kenapa.",
  "Aku nggak butuh yang sempurna, aku butuh yang setia.",
  "Kamu itu definisi pulang yang paling aku tunggu.",
  "Aku sayang kamu bukan karena kamu mudah… tapi karena kamu kamu.",
  "Biar aku yang ribet, kamu cukup jadi bahagia.",
  "Aku pilih kamu. Hari ini. Besok. Terus."
];

const letters = [
  `Hai ${partnerName} 💗\n\nKalau suatu hari kamu capek sama dunia, ingat ya… kamu punya aku.\nAku mungkin nggak selalu benar, tapi aku selalu sayang.\n\n— ${yourName}`,
  `Untuk ${partnerName} ✨\n\nAku nggak butuh alasan buat sayang kamu.\nCukup karena kamu ada, itu udah bikin aku kuat.\n\nPeluk dari jauh,\n${yourName}`,
  `${partnerName}...\n\nKamu rumah.\nKamu tenang.\nKamu yang selalu aku pilih.\n\n— ${yourName}`
];

// Smooth counter
let loveNumber = 0;
let clickNumber = 0;

function animateCounter(el, start, end, duration = 700) {
  const startTime = performance.now();
  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (end - start) * progress);
    el.textContent = value.toLocaleString("id-ID");
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function showToast(msg = "Berhasil! 💗") {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1200);
}

// ================================
// Floating Hearts
// ================================
const heartsWrap = document.querySelector(".hearts");

function spawnHeart(x = null) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = Math.random() > 0.5 ? "💗" : "💖";

  const left = x ?? Math.random() * window.innerWidth;
  heart.style.left = left + "px";
  heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
  heart.style.fontSize = (Math.random() * 14 + 14) + "px";

  heartsWrap.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(() => spawnHeart(), 650);

// ================================
// Music Toggle
// ================================
let isMusicOn = false;

toggleMusic.addEventListener("click", async () => {
  try {
    if (!isMusicOn) {
      await bgMusic.play();
      isMusicOn = true;
      toggleMusic.textContent = "🔇 Matikan";
      showToast("Musik ON 🎵");
    } else {
      bgMusic.pause();
      isMusicOn = false;
      toggleMusic.textContent = "🎵 Musik";
      showToast("Musik OFF 🔇");
    }
  } catch (e) {
    showToast("Klik sekali lagi ya 🎵");
  }
});

// ================================
// Tap Love (spark feeling)
// ================================
btnTapLove.addEventListener("click", () => {
  clickNumber++;
  animateCounter(heartClicks, clickNumber - 1, clickNumber, 250);

  loveNumber += Math.floor(Math.random() * 9) + 1;
  animateCounter(loveCount, parseInt(loveCount.textContent.replace(/\D/g,"")) || 0, loveNumber, 300);

  spawnHeart(window.innerWidth * 0.65);
});

// Random Quote
btnQuote.addEventListener("click", () => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  showToast(q);
});

// ================================
// Scroll
// ================================
scrollToGallery.addEventListener("click", () => {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
});
scrollToTime.addEventListener("click", () => {
  document.getElementById("time").scrollIntoView({ behavior: "smooth" });
});

// ================================
// Gallery Modal
// ================================
document.querySelectorAll(".photo").forEach((item) => {
  item.addEventListener("click", () => {
    const src = item.getAttribute("data-img");
    modalImg.src = src;
    imgModal.classList.add("show");
  });
});

closeImg.addEventListener("click", () => imgModal.classList.remove("show"));
imgModal.addEventListener("click", (e) => {
  if (e.target === imgModal) imgModal.classList.remove("show");
});

// ================================
// Letter Modal
// ================================
openLetter.addEventListener("click", () => {
  letterModal.classList.add("show");
});
closeLetter.addEventListener("click", () => letterModal.classList.remove("show"));
letterModal.addEventListener("click", (e) => {
  if (e.target === letterModal) letterModal.classList.remove("show");
});

// Copy letter
copyLetter.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(letterText.textContent);
    showToast("Tersalin! 💗");
  } catch (e) {
    showToast("Gagal menyalin 😅");
  }
});

// Change letter
changeLetter.addEventListener("click", () => {
  letterText.textContent = letters[Math.floor(Math.random() * letters.length)];
  showToast("Surat diganti ✨");
});

// ================================
// Relationship Timer
// ================================
function updateTime() {
  const now = new Date();
  const diff = now - coupleStartDate;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
setInterval(updateTime, 1000);
updateTime();

// Footer date
document.getElementById("today").textContent =
  new Date().toLocaleDateString("id-ID", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

// Initial numbers
animateCounter(loveCount, 0, 128, 1200);
loveNumber = 128;

// ================================
// ✅ Cinematic Parallax (Mouse + Scroll)
// ================================
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;  // -0.5 to 0.5
  mouseY = (e.clientY / window.innerHeight) - 0.5; // -0.5 to 0.5
});

// Smooth animation loop
function parallaxLoop(){
  // BG subtle
  if (bgLayer){
    bgLayer.style.transform = `translate3d(${mouseX * -18}px, ${mouseY * -18}px, 0)`;
  }

  // Hero cinematic tilt
  if (hero){
    hero.style.transform =
      `translate3d(0, ${window.scrollY * 0.04}px, 0) rotateX(${mouseY * 4}deg) rotateY(${mouseX * 6}deg)`;
  }

  // Floating cards depth
  cards.forEach((el, i) => {
    const depth = (i % 6 + 1) * 0.55;
    el.style.transform = `translate3d(${mouseX * 10 * depth}px, ${mouseY * 10 * depth}px, 0)`;
  });

  requestAnimationFrame(parallaxLoop);
}
parallaxLoop();
