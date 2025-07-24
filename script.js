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
// setupAutoScroll('uiuxWrapper', 'uiuxCarousel');


document.addEventListener('DOMContentLoaded', () => {
  // Get modal elements
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".modal .close"); // More specific selector

  // Check if elements exist before proceeding
  if (!modal || !modalImg || !closeBtn) {
      console.error("Modal elements not found. Please ensure 'imgModal', 'modalImg', and a close button within 'imgModal' exist in your HTML.");
      return; // Exit if elements are missing
  }

  // Function to open the modal
  function openModal(imageSrc) {
      // Instead of directly setting display, rely on aria-hidden for transition
      modal.style.display = "flex"; // Make sure it's flex for centering
      modalImg.src = imageSrc;
      modal.setAttribute('aria-hidden', 'false'); // Triggers CSS transition
      document.body.classList.add('modal-open');
  }

  // Function to close the modal
  function closeModal() {
      modal.setAttribute('aria-hidden', 'true'); // Triggers CSS transition
      // Wait for the transition to complete before hiding display
      modal.addEventListener('transitionend', function handler() {
          if (modal.getAttribute('aria-hidden') === 'true') {
              modal.style.display = "none";
              modalImg.src = ""; // Clear image source
          }
          modal.removeEventListener('transitionend', handler); // Remove listener to prevent multiple calls
      });
      document.body.classList.remove('modal-open');
  }

  // Apply click event to all project images
  document.querySelectorAll('.project-entry-img').forEach(img => {
      img.addEventListener('click', function() {
          openModal(this.src);
      });
      // Add keyboard accessibility for images
      img.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') { // Allow Enter or Space key
              event.preventDefault(); // Prevent default scroll if space is pressed
              openModal(this.src);
          }
      });
  });

  // Close modal on click of the close button
  closeBtn.addEventListener('click', closeModal);

  // Also close if clicked outside the image
  window.addEventListener('click', event => {
      if (event.target === modal) {
          closeModal();
      }
  });

  // Close modal with the Escape key
  document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
          closeModal();
      }
  });
});