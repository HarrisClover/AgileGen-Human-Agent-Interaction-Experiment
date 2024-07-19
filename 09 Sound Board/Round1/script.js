
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.word-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const audio = card.querySelector('audio');
            audio.play();
            card.classList.toggle('flipped');
        });
    });
});
