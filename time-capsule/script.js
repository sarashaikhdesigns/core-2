document.addEventListener('DOMContentLoaded', () => {
    const mask = document.querySelector('.mask');

    // Add event listener to catch mouse movements on the document
    document.addEventListener('mousemove', (event) => {
        // Calculate mouse position in percentages
        let x = event.clientX / window.innerWidth * 100;
        let y = event.clientY / window.innerHeight * 100;

        // Update the custom property values on the body
        mask.style.setProperty('--mouse-x', x + '%');
        mask.style.setProperty('--mouse-y', y + '%');
    });
});


