const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let startX = 0; // Position de départ pour l'événement tactile

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

function updateSlider() {
  document.querySelector('.slider-container').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto slide every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}, 5000);

// Gestion des événements tactiles pour le swipe sur mobile
const slider = document.querySelector('#slider');

slider.addEventListener('touchstart', handleTouchStart, false);
slider.addEventListener('touchmove', handleTouchMove, false);

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  if (!startX) return;

  const currentX = e.touches[0].clientX;
  const diffX = startX - currentX;

  if (diffX > 50) {
    // Swipe vers la gauche (image suivante)
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  } else if (diffX < -50) {
    // Swipe vers la droite (image précédente)
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  // Réinitialise la position de départ après le swipe
  startX = 0;
}
