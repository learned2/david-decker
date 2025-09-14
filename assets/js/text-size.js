document.addEventListener('DOMContentLoaded', function() {
  const textSizeToggle = document.getElementById('text-size-toggle');
  const body = document.body;
  
  if (!textSizeToggle) return;
  
  // Check for saved preference
  const savedTextSize = localStorage.getItem('davidDecker_textSize') || 'normal';
  body.classList.add(`text-size-${savedTextSize}`);
  
  // Update button text based on current state
  function updateButtonText() {
    if (body.classList.contains('text-size-large')) {
      textSizeToggle.textContent = 'A-';
      textSizeToggle.setAttribute('aria-label', 'Decrease text size');
    } else {
      textSizeToggle.textContent = 'A+';
      textSizeToggle.setAttribute('aria-label', 'Increase text size');
    }
  }
  
  // Initialize button text
  updateButtonText();
  
  // Toggle text size
  textSizeToggle.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent navigation
    
    if (body.classList.contains('text-size-large')) {
      // Switch to normal
      body.classList.remove('text-size-large');
      body.classList.add('text-size-normal');
      localStorage.setItem('davidDecker_textSize', 'normal');
    } else {
      // Switch to large
      body.classList.remove('text-size-normal');
      body.classList.add('text-size-large');
      localStorage.setItem('davidDecker_textSize', 'large');
    }
    
    updateButtonText();
  });
});