window.addEventListener('DOMContentLoaded', () => {
    const mask = document.querySelector('.mask');
    const spotlight = document.createElement('div');
    spotlight.classList.add('spotlight');
    document.body.appendChild(spotlight);

    document.body.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        spotlight.style.left = x + 'px';
        spotlight.style.top = y + 'px';
        mask.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 100px, rgba(0, 0, 0, 0.9) 150px)`;
    });

    const images = document.querySelectorAll('.image');

    images.forEach((img) => {
        img.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!img.classList.contains('clicked')) {
                images.forEach((otherImg) => {
                    otherImg.classList.remove('clicked');
                    otherImg.style.zIndex = ''; // Reset z-index of other images
                });
            }
            img.classList.toggle('clicked');
            if (img.classList.contains('clicked')) {
                img.style.zIndex = '100'; // Set z-index of clicked image to 100
            } else {
                img.style.zIndex = ''; // Reset z-index when image is clicked again to remove enlargement
            }
        });
    });

    document.body.addEventListener('click', () => {
        images.forEach((img) => {
            img.classList.remove('clicked');
            img.style.zIndex = ''; // Reset z-index when clicking outside of images
        });
    });
});
