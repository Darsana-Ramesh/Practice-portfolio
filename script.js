function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-slide-in');
    }
  });
}, { threshold: 0.1 });


document.querySelectorAll('section').forEach(el => {
  observer.observe(el);
});


function setupAutoScroll(wrapperId, carouselId, scrollSpeed = 1.5) {
  const wrapper = document.getElementById(wrapperId);
  const carousel = document.getElementById(carouselId);

  const originalItems = carousel.innerHTML;
  carousel.innerHTML += originalItems;

  function autoScroll() {
    wrapper.scrollLeft += scrollSpeed;

    if (wrapper.scrollLeft >= carousel.scrollWidth / 2) {
      wrapper.scrollLeft = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();
}

setupAutoScroll('webWrapper', 'webCarousel');
setupAutoScroll('uiuxWrapper', 'uiuxCarousel');