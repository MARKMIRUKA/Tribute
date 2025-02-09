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
    const audioMap = new Map(); 

    keys.forEach(key => {
        key.addEventListener('click', () => toggleSound(key));
    });

    function toggleSound(key) {
        const soundFile = key.getAttribute('data-sound');

        if (audioMap.has(soundFile)) {
            const audio = audioMap.get(soundFile);
            if (!audio.paused) {
                audio.pause();
                key.textContent = key.textContent.replace("⏸", "▶"); 
            } else {
                audio.play();
                key.textContent = key.textContent.replace("▶", "⏸");
            }
        } else {
            const audio = new Audio(soundFile);
            audioMap.set(soundFile, audio);
            audio.play();
            key.textContent += " ⏸"; 
            audio.addEventListener('ended', () => {
                audioMap.delete(soundFile);
                key.textContent = key.textContent.replace("⏸", "▶");
            });
        }
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
