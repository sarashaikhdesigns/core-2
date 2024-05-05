// Function to play the clicking sound
function playClickSound() {
  var audio = document.getElementById("clickSound");
  audio.play();
}

// Call the playClickSound function every second
setInterval(playClickSound, 1000);
