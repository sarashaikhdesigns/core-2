document.addEventListener('DOMContentLoaded', function() {
    const introDiv = document.querySelector('.intro');

    // Add click event listener to the intro div
    introDiv.addEventListener('click', function() {
        navigateToContainer('#container1');
    });

    const scrollButtons = document.querySelectorAll('.scroll-button1, .scroll-button2');

    scrollButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default scroll behavior
            
            // Get the target container id from the data-target attribute of the clicked button
            const targetContainerId = this.getAttribute('data-target');

            // Navigate to the target container
            navigateToContainer(targetContainerId);
        });
    });

    function navigateToContainer(containerId) {
        const container = document.querySelector(containerId);
        if (container) {
            container.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    // Disable default scroll behavior
    window.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
});
