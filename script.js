// Timer desde uma data personalizada
const startDate = new Date("2025-07-12T00:14:25");
const timerEl = document.getElementById("timer");

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(months / 12);

  const remMonths = months % 12;
  const remDays = Math.floor(days % 30.44);
  const remHours = hours % 24;
  const remMinutes = minutes % 60;
  const remSeconds = seconds % 60;

  timerEl.textContent = `${years} anos, ${remMonths} meses, ${remDays} dias, ${remHours} horas, ${remMinutes} minutos e ${remSeconds} segundos`;
}

setInterval(updateTimer, 1000);
updateTimer();

// Emojis flutuantes
const emojiContainer = document.getElementById("emoji-container");
const emojis = ["🥰", "😍", "❤️", "💖", "💘", "✨", ""];

function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.animationDuration = 4 + Math.random() * 4 + "s";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emojiContainer.appendChild(emoji);

  setTimeout(() => emoji.remove(), 8000);
}

setInterval(createEmoji, 500);

// Carrossel de imagens
const images = document.querySelectorAll('.carousel-image');
const dotsContainer = document.getElementById('dots');
let currentIndex = 0;

// Suporte a swipe/touch e mouse drag
const carousel = document.querySelector('.carousel');
let startX = 0;
let isDragging = false;

function onTouchStart(e) {
  isDragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function onTouchMove(e) {
  if (!isDragging) return;
  // Não faz nada, só previne scroll
  e.preventDefault();
}

function onTouchEnd(e) {
  if (!isDragging) return;
  const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
  const diff = endX - startX;
  if (Math.abs(diff) > 40) {
    if (diff < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
  isDragging = false;
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showSlide(currentIndex);
}

carousel.addEventListener('touchstart', onTouchStart, {passive: true});
carousel.addEventListener('touchmove', onTouchMove, {passive: false});
carousel.addEventListener('touchend', onTouchEnd);

carousel.addEventListener('mousedown', onTouchStart);
carousel.addEventListener('mousemove', onTouchMove);
carousel.addEventListener('mouseup', onTouchEnd);
carousel.addEventListener('mouseleave', () => { isDragging = false; });

// Criar os pontinhos
images.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.dataset.index = i;
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('span');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    currentIndex = Number(dot.dataset.index);
    showSlide(currentIndex);
  });
});

function showSlide(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showSlide(currentIndex);
}
document.querySelector('.audio-player audio').volume = 0.3;

showSlide(currentIndex);
setInterval(nextSlide, 4000); // troca a cada 4 segundos
