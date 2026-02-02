document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Initialize with first section
    showSection(currentSectionIndex);

    // Audio setup
    const bgMusic = document.getElementById('bg-music');
    // Attempt play on interaction to bypass browser policies
    function tryPlayMusic() {
        if (bgMusic && bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Audio play failed (user interaction needed first):", e));
        }
    }

    // Button Event Listeners
    document.getElementById('start-btn').addEventListener('click', () => {
        currentSectionIndex++;
        showSection(currentSectionIndex);
        tryPlayMusic();
    });

    document.getElementById('yes-valentine-btn').addEventListener('click', () => {
        // Trigger heart explosion animation here if desired
        createHeartExplosion();
        setTimeout(() => {
            currentSectionIndex++;
            showSection(currentSectionIndex);
        }, 1000); // Wait 1 second for animation
    });

    // Back Button Logic
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                showSection(currentSectionIndex);
            }
        });
    });

    // Final Proposal Logic
    document.getElementById('final-yes-btn').addEventListener('click', function () {
        this.style.display = 'none'; // Hide the button
        document.getElementById('final-success-msg').style.display = 'block';
        document.getElementById('hashtag-note').classList.add('highlighted');

        // Massive Heart Animation
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = '100vh'; // Start from bottom
                heart.style.fontSize = Math.random() * 30 + 20 + 'px';
                heart.style.transition = 'transform 3s linear, opacity 3s';
                document.body.appendChild(heart);

                // Trigger animation
                requestAnimationFrame(() => {
                    heart.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
                    heart.style.opacity = '0';
                });

                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 100);
        }

        // Also keep the regular confetti
        startConfetti();
    });

    // Photo Placards Logic
    document.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('revealed');
        });
    });

    document.getElementById('next-photos-btn').addEventListener('click', () => {
        currentSectionIndex++;
        showSection(currentSectionIndex);
    });

    // Love Messages Logic
    document.querySelectorAll('.envelope').forEach(envelope => {
        envelope.addEventListener('click', function () {
            const contentId = this.dataset.target;
            document.getElementById(contentId).classList.add('open');
        });
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.parentElement.classList.remove('open');
        });
    });

    document.getElementById('next-messages-btn').addEventListener('click', () => {
        currentSectionIndex++;
        showSection(currentSectionIndex);
        startConfetti();
    });

    // Background Heart Animation Generation
    const bgHearts = document.querySelector('.bg-hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '&#10084;';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        bgHearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 500);

    function createHeartExplosion() {
        // Simple visual feedback before transition
        const btn = document.getElementById('yes-valentine-btn');
        btn.innerHTML = "💖 YAY! 💖";
        btn.style.transform = "scale(1.2)";
    }

    function startConfetti() {
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
        setInterval(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, 100);
    }
});
