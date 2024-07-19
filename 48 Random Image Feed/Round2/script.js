document.addEventListener('DOMContentLoaded', () => {
    const randomizeButton = document.getElementById('randomizeButton');
    const categoryDropdown = document.getElementById('categoryDropdown');
    const imageTable = document.getElementById('imageTable');

    async function fetchImages(category) {
        // Assuming category 'all' should fetch 10 images, others fetch 5
        const count = category === 'all' ? 10 : 5;
        let images = [];
        for (let i = 0; i < count; i++) {
            images.push(`https://picsum.photos/200/200?random=${Math.random()}`);
        }
        return images.map(src => ({ src }));
    }

    function displayImages(images) {
        imageTable.innerHTML = '';
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imageTable.appendChild(imgElement);
        });
    }

    function shuffleImages(images) {
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }
        return images;
    }

    async function updateImages() {
        const selectedCategory = categoryDropdown.value;
        try {
            const images = await fetchImages(selectedCategory);
            const shuffledImages = shuffleImages(images);
            displayImages(shuffledImages);
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    }

    randomizeButton.addEventListener('click', updateImages);
    categoryDropdown.addEventListener('change', updateImages);

    updateImages(); // Initial call to display images
});
