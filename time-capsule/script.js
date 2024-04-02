window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image');
    let zIndexCounter = 1; // Initialize z-index counter

    images.forEach((img) => {
        img.style.zIndex = zIndexCounter++; // Assign z-index to each image
        img.addEventListener('click', (event) => {
            event.stopPropagation();
            const clicked = img.classList.contains('clicked');
            images.forEach((otherImg) => {
                if (otherImg !== img) {
                    otherImg.style.opacity = clicked ? '1' : '0.1'; // Set opacity to 10% if clicked, else 100%
                    otherImg.style.transform = clicked ? '' : 'scale(1)'; // Set scale to 1 if clicked, else 1.5
                }
            });

            // Increment z-index for the clicked image
            img.style.zIndex = zIndexCounter++;
            img.classList.toggle('clicked'); // Toggle 'clicked' class for the clicked image

            const polaroidDiv = img.parentNode;
            const textReveals = polaroidDiv.querySelectorAll('.text-reveal');
            textReveals.forEach((text) => {
                text.classList.toggle('revealed'); // Toggle the 'revealed' class for the text reveal elements
            });

            if (clicked) {
                document.body.style.backgroundImage = 'none'; // Reset background image when polaroid is clicked again to remove enlargement
                img.classList.remove('fade-transition'); // Remove the fade transition class
            } else {
                // Set new background image based on the data-id
                const dataId = polaroidDiv.getAttribute('data-id');
                // Change the image source
                img.src = `images/${dataId}_new.png`; // Change 'png' to your image format
                // Add fade transition class to the image
                img.classList.add('fade-transition');
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
            img.style.transform = 'scale(2)'; // Reset scale when clicking outside of images
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

            // Hide text reveal elements
            const textReveals = polaroidDiv.querySelectorAll('.text-reveal');
            textReveals.forEach((text) => {
                text.classList.remove('revealed');
            });
        });
    });

    // Additional code for fading in images slowly and randomly
    images.forEach((image) => {
        // Initially set opacity to 0
        image.style.opacity = '0';
        // Set transition duration
        image.style.transition = 'opacity 5s ease';
    });

    // Function to fade in images gradually after a delay
    function fadeInImagesGradually() {
        images.forEach(function(image) {
            // Set a random delay between 0 and 3 seconds for each image
            var delay = Math.random() * 3000;

            // Fade in the image after the random delay
            setTimeout(function() {
                image.style.opacity = '1';
            }, delay);
        });
    }

    // Call the function to fade in images gradually after a delay
    fadeInImagesGradually();
});
