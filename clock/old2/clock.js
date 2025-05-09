function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return { hours, minutes, seconds };
}

function formatTime(value) {
  return String(value).padStart(2, '0');
}

function updateClock() {
  const { hours, minutes, seconds } = updateTime();
  const timeString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  document.getElementById('clock').textContent = timeString;
}

function setClockColor(color) {
  document.getElementById('clock').style.color = color;
}

function setClockFont(font) {
  document.getElementById('clock').style.fontFamily = font;
}

function redirectToWebsite() {
  window.location.href = "https://sarashaikhdesigns.github.io/core-2/clock/index.html";
}

function initClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

setClockColor('#0F0');
setClockFont('monospace');
initClock();


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