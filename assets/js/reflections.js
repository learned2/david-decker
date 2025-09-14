document.addEventListener('DOMContentLoaded', function() {
  const reflectionsContainer = document.getElementById('reflections-container');
  const prevButton = document.getElementById('prev-reflection');
  const nextButton = document.getElementById('next-reflection');
  const indicators = document.querySelectorAll('.indicator');
  const reflectionItems = document.querySelectorAll('.reflection-item');
  
  if (!reflectionsContainer) return; // Exit if elements don't exist
  
  let currentReflection = 0;
  const totalReflections = reflectionItems.length;
  
  function updateReflection(newIndex) {
    // Remove active states from all items
    reflectionItems.forEach(item => {
      item.classList.remove('active', 'prev');
    });
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // Only add 'prev' class if we're not initializing (currentReflection exists)
    if (currentReflection !== newIndex && reflectionItems[currentReflection]) {
      reflectionItems[currentReflection].classList.add('prev');
    }
    
    // Add active state to new reflection
    reflectionItems[newIndex].classList.add('active');
    indicators[newIndex].classList.add('active');
    
    // Update current index
    currentReflection = newIndex;
    
    // Update button states
    prevButton.disabled = currentReflection === 0;
    nextButton.disabled = currentReflection === totalReflections - 1;
  }
  
  // Next button
  nextButton.addEventListener('click', () => {
    if (currentReflection < totalReflections - 1) {
      updateReflection(currentReflection + 1);
    }
  });
  
  // Previous button
  prevButton.addEventListener('click', () => {
    if (currentReflection > 0) {
      updateReflection(currentReflection - 1);
    }
  });
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      updateReflection(index);
    });
  });
  
  // Initialize - ensure first reflection is visible
  // Remove any existing active states first
  reflectionItems.forEach(item => {
    item.classList.remove('active', 'prev');
  });
  indicators.forEach(indicator => {
    indicator.classList.remove('active');
  });
  
  // Then set up the first reflection properly
  if (reflectionItems.length > 0) {
    reflectionItems[0].classList.add('active');
    indicators[0].classList.add('active');
    prevButton.disabled = true;
    nextButton.disabled = totalReflections <= 1;
  }
});
