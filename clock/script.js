// Function to simulate vibration effect for all text
function vibrateText() {
  // Get all paragraph elements
  const paragraphs = document.querySelectorAll('p');

  // Apply vibration effect to each paragraph element
  paragraphs.forEach(paragraph => {
      const displacementX = getRandomInt(-20, 20); // Random displacement in X direction
      const displacementY = getRandomInt(-20, 20); // Random displacement in Y direction
      paragraph.style.animation = `vibrate 0.5s ease infinite`;
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

window.onload = function () {
  // Get all paragraph elements
  const paragraphs = document.querySelectorAll('p');

  // Apply blinking effect to each paragraph element
  paragraphs.forEach(paragraph => {
      blinkLetters(paragraph);
  });

  // Call vibrateText every minute
  setInterval(vibrateText, 60000); // Every minute

  // Add event listener to the body to redirect to a new website when clicked
  document.body.addEventListener('click', function() {
      window.location.href = 'https://sarashaikhdesigns.github.io/core-2/clock/clock.html'; // Change this URL to your desired website
  });
};

// Function to get a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
