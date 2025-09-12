// ---------- Elements ----------
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const filterButtons = document.querySelectorAll('.filter-btn');
const grid = document.getElementById('gallery-grid');

const modal = document.getElementById('artwork-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDetails = document.getElementById('modal-details');
const modalStory = document.getElementById('modal-story');
const modalTags = document.getElementById('modal-tags');
const closeModalBtn = document.querySelector('.close-modal');

let artworks = [];
let currentArtworks = [];
let lastFocusedEl = null;

// ---------- Gallery logic ----------
async function loadArtworks() {
  try {
    const res = await fetch('artworks.json', { cache: 'no-store' });
    artworks = await res.json();
    currentArtworks = artworks;
    populateGallery();
  } catch (e) {
    console.error('Failed to load artworks.json', e);
    grid.innerHTML = '<p>Unable to load artworks at the moment.</p>';
  }
}

function populateGallery() {
  grid.innerHTML = '';
  currentArtworks.forEach(art => {
    const card = document.createElement('article');
    card.className = 'artwork-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${art.image}" alt="${art.title}" class="artwork-image" loading="lazy">
      <div class="artwork-info">
        <h3 class="artwork-title">${art.title}</h3>
        <p class="artwork-details">${art.medium} | ${art.year}</p>
        <div class="artwork-tags">
          ${art.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
    card.addEventListener('click', () => openModal(art, card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(art, card); }
    });
    grid.appendChild(card);
  });
}

// ---------- Modal ----------
function openModal(art, triggerEl) {
  lastFocusedEl = triggerEl || document.activeElement;
  modalImg.src = art.image;
  modalImg.alt = art.title;
  modalTitle.textContent = art.title;
  modalDetails.textContent = `${art.medium} | ${art.year}`;
  modalStory.textContent = art.story || '';
  modalTags.innerHTML = art.tags.map(t => `<span class="tag">${t}</span>`).join('');

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  closeModalBtn.focus();
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

// ---------- Navigation ----------
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const target = link.dataset.section;
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(target).classList.add('active');

    if (target === 'gallery' && artworks.length === 0) loadArtworks();
  });
});

// ---------- Filters ----------
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    currentArtworks = (filter === 'all')
      ? artworks
      : artworks.filter(a => a.tags.includes(filter));
    populateGallery();
  });
});

// Debug modal opening
function openModal(art, triggerEl) {
  console.log('Opening modal for:', art.title);
  console.log('Modal element:', modal);
  console.log('Modal classes before:', modal.className);
  
  lastFocusedEl = triggerEl || document.activeElement;
  modalImg.src = art.image;
  modalImg.alt = art.title;
  modalTitle.textContent = art.title;
  modalDetails.textContent = `${art.medium} | ${art.year}`;
  modalStory.textContent = art.story || '';
  modalTags.innerHTML = art.tags.map(t => `<span class="tag">${t}</span>`).join('');

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  
  console.log('Modal classes after:', modal.className);
  console.log('Modal computed style display:', window.getComputedStyle(modal).display);
  console.log('Modal computed style z-index:', window.getComputedStyle(modal).zIndex);
  console.log('Modal computed style position:', window.getComputedStyle(modal).position);
  
  // Force focus to close button
  setTimeout(() => {
    closeModalBtn.focus();
    console.log('Focused close button');
  }, 100);
}