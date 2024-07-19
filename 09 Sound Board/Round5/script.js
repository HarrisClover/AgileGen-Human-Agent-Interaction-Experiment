document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const audioSrc = card.getAttribute('data-audio');
            const audio = new Audio(audioSrc);
            audio.play();

            // Text-to-speech for the definition on the back of the card
            const definition = card.getAttribute('data-definition');
            const speech = new SpeechSynthesisUtterance(definition);
            window.speechSynthesis.speak(speech);

            card.classList.toggle('flipped');
        });
    });
});
