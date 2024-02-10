document.addEventListener('DOMContentLoaded', function() {
    // Get the <h1> element inside the .intro div
    const introHeading = document.querySelector('.intro h1');
    
    // Add a click event listener to the <h1> element
    introHeading.addEventListener('click', function() {
        // Show the content outside of the home section
        document.querySelector('#container1').style.display = 'block';

        // Get the y-coordinate of the target element (container-one)
        const containerOneY = document.querySelector('#container1').offsetTop;
        
        // Smooth scroll to the target element
        window.scrollTo({
            top: containerOneY,
            behavior: 'smooth' // Smooth scrolling behavior
        });
    });
});

