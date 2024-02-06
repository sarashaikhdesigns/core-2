document.addEventListener("DOMContentLoaded", function () {
  const captionText = document.getElementById("captionText");
  const words = captionText.innerText.split(" ");
  captionText.innerHTML = ""; // Clear the original text

  words.forEach((word, index) => {
      setTimeout(() => {
          captionText.innerHTML += word + " ";
      }, index * 500); // Adjust the delay (500ms in this example)
  });
});