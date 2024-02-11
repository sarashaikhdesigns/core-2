document.addEventListener('DOMContentLoaded', function() {
    const introHeading = document.querySelector('.intro h1');
    const scrollButtons = document.querySelectorAll('.scroll-button, .scroll-button1');

    introHeading.addEventListener('click', function() {
        const targetContainer = document.querySelector('#container1');
        toggleContainerVisibility(targetContainer);
        scrollToElement(targetContainer);
    });

    scrollButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const targetContainerId = this.getAttribute('data-target');
            const targetContainer = document.querySelector(`#${targetContainerId}`);
            scrollToElement(targetContainer);
        });
    });

    function toggleContainerVisibility(container) {
        container.style.display = 'block';
    }

    function scrollToElement(element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
});
