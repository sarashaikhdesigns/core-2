// Function to simulate vibration effect for all text
function vibrateText() {
  // Get all paragraph elements
  const paragraphs = document.querySelectorAll('p');

  // Apply vibration effect to each paragraph element
  paragraphs.forEach(paragraph => {
    const displacementX = getRandomInt(-40, 40); // Increase range of displacement in X direction
    const displacementY = getRandomInt(-40, 40); // Increase range of displacement in Y direction
    paragraph.style.animation = `vibrate 5s ease infinite`;
    paragraph.style.transform = `translate(${displacementX}px, ${displacementY}px)`;
  });

  // Remove animation and reset position after 5 seconds (adjust as needed)
  setTimeout(() => {
    paragraphs.forEach(paragraph => {
      paragraph.style.animation = '';
      paragraph.style.transform = 'translate(0)';
    });
  }, 5000); // Remove animation after 5 seconds
}

// Function to simulate blinking effect for each letter
function blinkLetters(element) {
  const text = element.textContent;
  let index = 0;

  // Clear the content of the element
  element.innerHTML = '';

  // Blink each letter one at a time
  const interval = setInterval(() => {
    if (index >= text.length) {
      clearInterval(interval);
      return;
    }
    const letter = text.charAt(index);
    // Create a span for each letter
    const span = document.createElement('span');
    span.textContent = letter;
    // Toggle visibility of the span every second
    setInterval(() => {
      span.style.visibility = span.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 1000); // Blink every second
    // Append the span to the element
    element.appendChild(span);
    index++;
  }, 1000); // Move to next letter every second
}

 // Function to play the clicking sound
 function playClickSound() {
  var audio = document.getElementById("clickSound");
  audio.currentTime = 0; // Reset audio to the beginning
  audio.play();
}

 // Function to play the clicking sound
 function playBeepSound() {
  var audio = document.getElementById("beepSound");
  audio.currentTime = 0; // Reset audio to the beginning
  audio.play();
}

function playComputerSound() {
  var audio = document.getElementById("computerSound");
  audio.volume = 0.3; // Set the volume to 30% of its maximum (0.3 out of 1)
  audio.play();
  // Add event listener to repeat the computer sound when it ends
  audio.addEventListener('ended', function() {
    this.currentTime = 0; // Reset audio to the beginning
    this.play();
  });
}

// Call the functions to start playing the sounds simultaneously
playClickSound();
playComputerSound();
playBeepSound();


// Set interval to repeat the clicking sound every second
setInterval(playClickSound, 1000);
setInterval(playBeepSound, 60000);


// Rest of your JavaScript code
window.onload = function() {
  // Your code here
};




// Call vibrateText immediately after the page loads
vibrateText();

// Get all paragraph elements
const paragraphs = document.querySelectorAll('p');

// Apply blinking effect to each paragraph element
paragraphs.forEach(paragraph => {
  blinkLetters(paragraph);
});

// Call vibrateText every minute
setInterval(vibrateText, 60000); // Every minute

// Call playClickSound every second
setInterval(playClickSound, 1000);

// Add event listener to the body to redirect to a new website when clicked
document.body.addEventListener('click', function() {
  window.location.href = 'https://sarashaikhdesigns.github.io/core-2/clock/clock.html'; // Change this URL to your desired website
});

// Function to get a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
