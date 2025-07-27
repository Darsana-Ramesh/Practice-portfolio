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


const typingNameElement = document.getElementById('typing-name');
const nameToType = "Your Name";
let charIndex = 0;
let typingInterval;

function typeWriter() {
  if (typingNameElement && charIndex < nameToType.length) {
    typingNameElement.textContent += nameToType.charAt(charIndex);
    charIndex++;
    typingInterval = setTimeout(typeWriter, 100); // Typing speed (milliseconds per character)
  } else {
    // Optional: If you want to loop the typing or do something else after typing
    // clearTimeout(typingInterval);
  }
}

// Start the typing animation when the window loads
window.addEventListener('load', () => {
  if (typingNameElement) {
    typeWriter();
  }
});


// The scrollProjects function is removed from here as it's no longer needed for 'Recent Projects'.
// If you implement a carousel for 'All Projects' page, you might reintroduce it there.

// Existing auto-scroll function (applied to UI/UX projects)
// This function is for auto-scrolling, which might not be desired for a static grid.
// If you want a carousel, this function can be adapted. For now, it's kept but not actively used
// by the current projects.html structure which uses a grid.
function setupAutoScroll(wrapperId, carouselId, scrollSpeed = 1.5) {
  const wrapper = document.getElementById(wrapperId);
  const carousel = document.getElementById(carouselId);

  // Check if elements exist before proceeding
  if (!wrapper || !carousel) {
    console.warn(`Auto-scroll setup failed: Wrapper (${wrapperId}) or Carousel (${carouselId}) not found.`);
    return;
  }

  // Clone content to create an infinite loop effect for auto-scroll
  // Only clone if the content is not already doubled
  if (carousel.children.length > 0 && carousel.children.length < 10) { // Arbitrary check to prevent excessive cloning
    const originalItems = carousel.innerHTML;
    carousel.innerHTML += originalItems;
  }


  let animationFrameId;

  function autoScroll() {
    wrapper.scrollLeft += scrollSpeed;

    // Reset scroll position if it reaches the end of the original content
    if (wrapper.scrollLeft >= carousel.scrollWidth / 2) {
      wrapper.scrollLeft = 0;
    }
    animationFrameId = requestAnimationFrame(autoScroll);
  }

  // Start auto-scroll on load
  // autoScroll(); // Commented out as auto-scroll might not be desired for static grids

  // Optional: Pause on hover
  // wrapper.addEventListener('mouseenter', () => cancelAnimationFrame(animationFrameId));
  // wrapper.addEventListener('mouseleave', () => animationFrameId = requestAnimationFrame(autoScroll));
}

// Image Modal Functionality
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementsByClassName("close")[0];
const modalDescription = document.getElementById("modalDescription"); // For accessibility

// Function to open the modal
function openModal(imageSrc, description = "") {
    modal.style.display = "flex"; // Use flex to center
    modal.setAttribute('aria-hidden', 'false');
    modalImg.src = imageSrc;
    modalDescription.textContent = description; // Set description for screen readers
    // Add a slight delay for the transition to apply correctly
    setTimeout(() => {
        modal.style.opacity = "1";
        modal.style.pointerEvents = "auto";
    }, 10);
    document.body.classList.add('modal-open'); // Prevent body scroll
}

// Function to close the modal
function closeModal() {
    modal.style.opacity = "0";
    modal.setAttribute('aria-hidden', 'true');
    modal.style.pointerEvents = "none";
    // Wait for transition to complete before hiding display
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
document.querySelectorAll('.project-entry-img, .project-img').forEach(img => { // Target both classes
    img.addEventListener('click', function() {
        openModal(this.src, this.alt); // Pass alt text as description
    });
    // Add keyboard accessibility for images
    img.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') { // Allow Enter or Space key
            event.preventDefault(); // Prevent default scroll if space is pressed
            openModal(this.src, this.alt); // Pass alt text as description
        }
    });
});

// Close modal on click of the close button
if (closeBtn) { // Check if closeBtn exists
  closeBtn.addEventListener('click', closeModal);
}


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