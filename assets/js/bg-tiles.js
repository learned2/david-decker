// assets/js/bg-tiles.js
(function () {
  const mount = document.getElementById('bg-tiles');
  if (!mount) return;

  const TILE_PX = 100; // virtual tile size for responsiveness
  const CLASSES = ['morph-navy','morph-midnight','morph-deep','morph-slate','morph-ocean','morph-steel'];

  function pick(arr){ return arr[(Math.random()*arr.length)|0]; }

  function createTile(){
    const el = document.createElement('div');
    el.className = 'tile ' + pick(CLASSES);
    el.style.animationDelay = (Math.random()*10).toFixed(2) + 's'; // 0–10s
    return el;
  }

  function build(){
    const cols = Math.max(16, Math.ceil(window.innerWidth  / TILE_PX));
    const rows = Math.max(10, Math.ceil(window.innerHeight / TILE_PX));
    mount.style.setProperty('--cols', cols);
    mount.style.setProperty('--rows', rows);

    const total = cols * rows;
    mount.replaceChildren();                 
    for (let i = 0; i < total; i++) mount.appendChild(createTile());
  }

  function refreshSome(){
    const tiles = mount.querySelectorAll('.tile');
    const n = Math.max(1, Math.floor(tiles.length * 0.03)); // ~3%
    for (let i = 0; i < n; i++){
      const idx = (Math.random()*tiles.length)|0;
      const old = tiles[idx];
      if (old && old.parentNode) old.parentNode.replaceChild(createTile(), old);
    }
  }

  // Build on load + throttle on resize
  let t;
  function onResize(){ clearTimeout(t); t = setTimeout(build, 200); }

  build();
  window.addEventListener('resize', onResize);
  setInterval(refreshSome, 30000); // every 30s
})();
