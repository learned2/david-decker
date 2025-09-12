// assets/js/audio.js - Fixed version
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("music-toggle");
  const audio = document.getElementById("site-audio");
  
  if (!btn || !audio) return;

  let isPlaying = false;

  const setBtn = (playing) => {
    isPlaying = playing;
    btn.textContent = playing ? "■ Stop Music" : "▶ Play Music";
    btn.setAttribute("aria-pressed", playing ? "true" : "false");
  };

  // Add the click handler BEFORE other scripts load to capture the event first
  btn.addEventListener("click", async (event) => {
    // Always prevent default and stop propagation for the music button
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation(); // This stops other event listeners
    
    try {
      if (!isPlaying) {
        await audio.play();
        setBtn(true);
      } else {
        audio.pause();
        audio.currentTime = 0;
        setBtn(false);
      }
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  }, true); // Use capture phase to run before other handlers

  audio.addEventListener("ended", () => setBtn(false));
  audio.addEventListener("pause", () => {
    if (Math.floor(audio.currentTime) === 0) setBtn(false);
  });
});