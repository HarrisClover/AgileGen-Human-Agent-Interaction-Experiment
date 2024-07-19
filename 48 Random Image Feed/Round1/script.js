
const images = [
    { src: 'https://via.placeholder.com/150?text=Nature+1', category: 'nature' },
    { src: 'https://via.placeholder.com/150?text=Nature+2', category: 'nature' },
    { src: 'https://via.placeholder.com/150?text=Animals+1', category: 'animals' },
    { src: 'https://via.placeholder.com/150?text=Animals+2', category: 'animals' },
    { src: 'https://via.placeholder.com/150?text=Tech+1', category: 'technology' },
    { src: 'https://via.placeholder.com/150?text=Tech+2', category: 'technology' }
];

document.addEventListener('DOMContentLoaded', () => {
    const randomizeButton = document.getElementById('randomizeButton');
    const categoryDropdown = document.getElementById('categoryDropdown');
    const imageTable = document.getElementById('imageTable');

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

    function filterImages(category) {
        if (category === 'all') {
            return images;
        }
        return images.filter(image => image.category === category);
    }

    randomizeButton.addEventListener('click', () => {
        const selectedCategory = categoryDropdown.value;
        const filteredImages = filterImages(selectedCategory);
        const shuffledImages = shuffleImages(filteredImages);
        displayImages(shuffledImages);
    });

    categoryDropdown.addEventListener('change', () => {
        const selectedCategory = categoryDropdown.value;
        const filteredImages = filterImages(selectedCategory);
        const shuffledImages = shuffleImages(filteredImages);
        displayImages(shuffledImages);
    });

    displayImages(shuffleImages(images));
});
