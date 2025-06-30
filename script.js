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

// The scrollProjects function is removed from here as it's no longer needed for 'Recent Projects'.
// If you implement a carousel for 'All Projects' page, you might reintroduce it there.

// Existing auto-scroll function (applied to UI/UX projects)
function setupAutoScroll(wrapperId, carouselId, scrollSpeed = 1.5) {
  const wrapper = document.getElementById(wrapperId);
  const carousel = document.getElementById(carouselId);

  // Clone content to create an infinite loop effect for auto-scroll
  const originalItems = carousel.innerHTML;
  carousel.innerHTML += originalItems;

  let animationFrameId;

  function autoScroll() {
    wrapper.scrollLeft += scrollSpeed;

    // Reset scroll position if it reaches the end of the original content
    if (wrapper.scrollLeft >= carousel.scrollWidth / 2) {
      wrapper.scrollLeft = 0;
    }
    animationFrameId = requestAnimationFrame(autoScroll);
  }

  // Start auto-scroll
  autoScroll();

  // Pause on hover
  wrapper.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animationFrameId);
  });

  // Resume on mouse leave
  wrapper.addEventListener('mouseleave', () => {
    animationFrameId = requestAnimationFrame(autoScroll);
  });
}

// Apply auto-scroll only to the UI/UX projects section now
setupAutoScroll('uiuxWrapper', 'uiuxCarousel');