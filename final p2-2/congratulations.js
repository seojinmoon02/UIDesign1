document.addEventListener('DOMContentLoaded', () => {
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.opacity = Math.random();

        document.body.appendChild(confetti);
    }

    function getRandomColor() {
        const colors = ['#f2a65a', '#f28b1d', '#f2e205', '#80f240', '#40f2e8', '#4095f2', '#b740f2', '#f2408e'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Add this part to trigger the stamp animation
    setTimeout(() => {
        const stamp = document.getElementById('stamp');
        stamp.style.animation = 'stamp-animation 1s ease-in-out forwards';
    }, 1000); // Adjust the delay as needed
});