// assets/js/hero-carousel.js - Adaptive Ken Burns Version
(async function(){
  const mount = document.getElementById('hero-slides');
  if (!mount) return;

  // Load list
  let photos = [];
  try {
    const res = await fetch('photos.json', { cache: 'no-store' });
    photos = await res.json();
  } catch (e) {
    console.warn('Could not load photos.json', e);
    return;
  }

  // Keep only web-friendly images
  const SUPPORTED = /\.(jpe?g|png|webp|gif)$/i;
  photos = Array.isArray(photos) ? photos.filter(p => SUPPORTED.test(p)) : [];
  if (!photos.length) {
    const hero = document.querySelector('.hero-carousel');
    if (hero) hero.style.display = 'none';
    return;
  }

  // Preload and analyze dimensions
  const preloadAndAnalyze = (src) => new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const isWide = aspectRatio > 1.3; // Wider than 1.3:1 ratio
      const isTall = aspectRatio < 0.8; // Taller than 0.8:1 ratio
      
      resolve({
        src,
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio,
        isWide,
        isTall,
        orientation: isWide ? 'wide' : isTall ? 'tall' : 'square'
      });
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
  
  const imageData = (await Promise.all(photos.map(preloadAndAnalyze))).filter(Boolean);
  if (!imageData.length) {
    const hero = document.querySelector('.hero-carousel');
    if (hero) hero.style.display = 'none';
    return;
  }

  // Build slides with orientation classes
  const slides = imageData.map((data, i) => {
    const wrap = document.createElement('div');
    wrap.className = `hero-slide ${data.orientation}` + (i === 0 ? ' active' : '');
    
    const img = document.createElement('img');
    img.src = data.src; 
    img.alt = '';
    
    // Set different sizing based on orientation
    if (data.orientation === 'wide') {
      img.style.width = '120%';
      img.style.height = '100%';
      img.style.objectPosition = 'left center';
    } else if (data.orientation === 'tall') {
      img.style.width = '100%';
      img.style.height = '120%';
      img.style.objectPosition = 'center top';
    } else {
      img.style.width = '110%';
      img.style.height = '110%';
      img.style.objectPosition = 'center center';
    }
    
    wrap.appendChild(img);
    mount.appendChild(wrap);
    console.log(`Image ${i}: ${data.orientation} (${data.aspectRatio.toFixed(2)} ratio)`);
    return wrap;
  });

  // Transition between slides
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 10000);
})();