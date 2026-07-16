//footer copy year
document.getElementById('year').textContent = new Date().getFullYear();

// header scroll
const headerElement = document.querySelector('.header-container');
window.addEventListener("scroll", () => {
  // Get current vertical scroll position
  let scrollPosition = window.scrollY;
  
  if (scrollPosition > 100) {
    // Add the class
    headerElement.classList.add('scrolled-header');
  } else {
    headerElement.classList.remove("scrolled-header");
  }
});

// slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  listAnimation(slides[index]);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// list items animation
function listAnimation(currentSlide) {
  const listItems = currentSlide.querySelectorAll('li');
    
  const staggerTime = 0.15; // Time between each item appearance (in seconds)
  const resetAfterCount = listItems.length; // Reset the delay loop after this many items

  listItems.forEach((item, index) => {
    // The modulo (%) operator resets the multiplier back to 0 once it hits the limit
    const loopIndex = index % resetAfterCount; 
    
    const calculatedDelay = loopIndex * staggerTime;
    item.style.animationDelay = `${calculatedDelay}s`;
  });
}

// gallery show more
const showMoreBtn = document.getElementById("showMoreBtn");
const hiddenItems = document.querySelectorAll(".gallery-items .item");

showMoreBtn.addEventListener("click", () => {
  hiddenItems.forEach(item => {
    item.style.display = "block";
  });

  showMoreBtn.parentElement.style.display = "none";
});

// gallery pop up
const galleryImages = document.querySelectorAll(".gallery-items .item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

galleryImages.forEach(image => {
  image.addEventListener("click", () => {
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxImg.title = image.title;

    lightbox.classList.add("show");
  });
});

function closeLightbox() {
  lightbox.classList.remove("show");
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

//loading
const loadingScreen = document.getElementById("loading-screen");

// Initial page load
window.addEventListener("load", () => {
    loadingScreen.classList.add("show");

    setTimeout(() => {
    loadingScreen.classList.remove("show");
    }, 1000); // Show for 1 second
});

// Anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    loadingScreen.classList.add("show");
    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth"
      });
      setTimeout(() => {
        gScreen.classList.remove("show");
      }, 700);
    }, 300);
  });
});

const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");
const mobileNav = document.getElementById("mobile-nav-container");
const overlay = document.getElementById("menu-overlay");

function toggleMenu() {
  openMenu.classList.toggle("active");
  mobileNav.classList.toggle("active");
  overlay.classList.toggle("active");

  document.body.style.overflow =
  mobileNav.classList.contains("active") ? "hidden" : "";
}

openMenu.addEventListener("click", toggleMenu);
closeMenu.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", toggleMenu);
});