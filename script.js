document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const observerOptions = { threshold: 0.2 };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    sections.forEach(section => observer.observe(section));
  
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
      key.addEventListener('mouseover', () => playSound(key));
      key.addEventListener('click', () => playSound(key));
    });
  
    function playSound(key) {
      const soundFile = key.getAttribute('data-sound');
      const audio = new Audio(soundFile);
      audio.play();
    }
  
    const bgMusic = document.getElementById('bg-music');
    const toggleMusicBtn = document.getElementById('toggle-music');
    let isPlaying = false;
  
    toggleMusicBtn.addEventListener('click', () => {
      if (isPlaying) {
        bgMusic.pause();
        toggleMusicBtn.textContent = 'Play Background Music';
      } else {
        bgMusic.play();
        toggleMusicBtn.textContent = 'Pause Background Music';
      }
      isPlaying = !isPlaying;
    });
  });
  