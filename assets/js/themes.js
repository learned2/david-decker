document.addEventListener('DOMContentLoaded', function() {
  const themesContainer = document.getElementById('themes-container');
  const prevButton = document.getElementById('prev-theme');
  const nextButton = document.getElementById('next-theme');
  const indicators = document.querySelectorAll('.theme-indicator');
  const themeItems = document.querySelectorAll('.theme-item');
  
  if (!themesContainer) return; // Exit if elements don't exist
  
  let currentTheme = 0;
  const totalThemes = themeItems.length;
  
  function updateTheme(newIndex) {
    // Remove active states from all items
    themeItems.forEach(item => {
      item.classList.remove('active', 'prev');
    });
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // Only add 'prev' class if we're not initializing
    if (currentTheme !== newIndex && themeItems[currentTheme]) {
      themeItems[currentTheme].classList.add('prev');
    }
    
    // Add active state to new theme
    themeItems[newIndex].classList.add('active');
    indicators[newIndex].classList.add('active');
    
    // Update current index
    currentTheme = newIndex;
    
    // Update button states
    prevButton.disabled = currentTheme === 0;
    nextButton.disabled = currentTheme === totalThemes - 1;
  }
  
  // Next button
  nextButton.addEventListener('click', () => {
    if (currentTheme < totalThemes - 1) {
      updateTheme(currentTheme + 1);
    }
  });
  
  // Previous button
  prevButton.addEventListener('click', () => {
    if (currentTheme > 0) {
      updateTheme(currentTheme - 1);
    }
  });
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      updateTheme(index);
    });
  });
  
  // Initialize - ensure first theme is visible
  if (themeItems.length > 0) {
    // Remove any existing active states first
    themeItems.forEach(item => {
      item.classList.remove('active', 'prev');
    });
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // Set up the first theme
    themeItems[0].classList.add('active');
    indicators[0].classList.add('active');
    prevButton.disabled = true;
    nextButton.disabled = totalThemes <= 1;
  }
});