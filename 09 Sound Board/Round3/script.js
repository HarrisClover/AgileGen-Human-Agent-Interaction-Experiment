
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const audioSrc = card.getAttribute('data-audio');
            const audio = new Audio(audioSrc);
            audio.play();

            card.classList.toggle('flipped');
        });
    });
});
