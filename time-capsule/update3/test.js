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
            const clicked = img.classList.contains('clicked');
            images.forEach((otherImg) => {
                if (otherImg !== img) {
                    otherImg.style.opacity = clicked ? '1' : '0.0'; // Set opacity to 10% if clicked, else 100%
                    otherImg.style.transform = clicked ? '' : 'scale(1)'; // Set scale to 1 if clicked, else 1.5
                }
            });
            img.classList.toggle('clicked'); // Toggle 'clicked' class for the clicked image
            if (clicked) {
                img.style.transform = 'scale(1)'; // Set scale to 1 when image is clicked again to remove enlargement
                document.body.style.backgroundImage = 'none'; // Reset background image when polaroid is clicked again to remove enlargement
            } else {
                img.style.transform = 'scale(2)'; // Set scale to 1.5 of clicked image
                // Set new background image based on the data-id
                const polaroidDiv = img.parentNode;
                const dataId = polaroidDiv.getAttribute('data-id');
                document.body.style.backgroundImage = `url(images/${dataId}_background.jpg)`; // Change 'jpg' to your image format
                // Change the image source
                img.src = `images/${dataId}_new.png`; // Change 'png' to your image format
                // Adjust body styles to cover the whole viewport
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundAttachment = 'fixed';
                document.body.style.overflow = 'hidden';
            }
        });

        img.addEventListener('mouseleave', () => {
            if (!img.classList.contains('clicked')) {
                const polaroidDiv = img.parentNode;
                const dataId = polaroidDiv.getAttribute('data-id');
                img.src = `images/${dataId}.png`; // Change 'png' to your image format
            }
        });
    });

    document.body.addEventListener('click', () => {
        images.forEach((img) => {
            img.style.opacity = '1'; // Reset opacity to 100% when clicking outside of images
            img.style.transform = 'scale(1)'; // Reset scale when clicking outside of images
            img.classList.remove('clicked'); // Remove 'clicked' class from all images
            // Reset background image when clicking outside of images
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundSize = 'auto';
            document.body.style.backgroundPosition = 'initial';
            document.body.style.backgroundAttachment = 'initial';
            document.body.style.overflow = 'auto';
            // Reset image source to original
            const polaroidDiv = img.parentNode;
            const dataId = polaroidDiv.getAttribute('data-id');
            img.src = `images/${dataId}.png`; // Change 'png' to your image format
        });
    });
});
