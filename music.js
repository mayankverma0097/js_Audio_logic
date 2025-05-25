let p_button = document.getElementById("PlayPauseImage");
let range = document.getElementById("inptrange");
let CurrentTime = document.getElementById("CurrentTime");
let TotalTime = document.getElementById("TotalTime");

let audio = new Audio("./Songs/BlankSpace _Taylor Swift.mp3");

let play = true;

// Format seconds to MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// console.log(p_button);

CurrentTime.innerText = "00:00";

p_button.onclick = function () {
  if (play) {
    p_button.setAttribute("src", "Images/pause.png");
    audio.play();
    play = false;
  } else {
    p_button.setAttribute("src", "Images/play.png");
    audio.pause();
    play = true;
  }
};

if (CurrentTime.innerText == TotalTime.innerText) {
  p_button.setAttribute("src", "Images/play.png");
  audio.pause();
  play = true;
}

// Update range max when metadata is loaded
audio.addEventListener("loadedmetadata", function () {
  range.max = audio.duration;
  TotalTime.innerText = formatTime(audio.duration);
});

// Update range value as song plays
audio.addEventListener("timeupdate", function () {
  range.value = audio.currentTime;
  CurrentTime.innerText = formatTime(audio.currentTime);

  // Check if the song is effectively finished
  if (Math.floor(audio.currentTime) >= Math.floor(audio.duration)) {
    p_button.setAttribute("src", "Images/play.png");
    audio.pause();
    play = true;
    audio.currentTime = 0;
    range.value = 0;
    play = true;
  }
});

// Seek when range slider is changed
range.addEventListener("input", function () {
  audio.currentTime = range.value;
});
