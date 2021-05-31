const mname = document.getElementById("name");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const play = document.getElementById("play");
const img = document.querySelector("img");
const music = document.querySelector("audio");

const songs = [
  {
    name: "betterdays",
    title: "Slow ambient cinematic piece with a melancholic and sad feel",
    author: "Benjamin Tissot",
    imgName: 1,
  },
  {
    name: "dubstep",
    title: "Modern and energetic royalty free Dubstep music.",
    author: "Benjamin Tissot",
    imgName: 2,
  },
  {
    name: "energy",
    title: "Corporate motivational royalty free music track featuring.",
    author: "BABAROGA",
    imgName: 4,
  },
]

// play,pause the music

isPlaying = false;

const musicPlay = () => {
  isPlaying = true;
  music.play();
  img.classList.add("anime")
  play.classList.replace("fa-play", "fa-pause");
};

const musicPause = () => {
  isPlaying = false;
  music.pause();
  img.classList.remove("anime");
  play.classList.replace("fa-pause", "fa-play");
};

play.addEventListener("click", () => {
  isPlaying ? musicPause() : musicPlay();
});

// --------------------------------------------------
const loadSongs = (songs) => {
  mname.textContent = songs.name;
  title.textContent = songs.title;
  img.src = "Images/" + songs.imgName + ".jpg";
  music.src = "Songs/bensound-" + songs.name + ".mp3";
}

songsIndex = 0
const nextSong = () => {
  songsIndex = (songsIndex + 1) % songs.length;
  loadSongs(songs[songsIndex]);
  musicPlay();
}

const prevSong = () => {
  songsIndex = (songsIndex - 1 + songs.length) % songs.length;
  loadSongs(songs[songsIndex]);
  musicPlay();
}

// progress bar 
var current_timing = document.getElementById("current_timing");
var duration_timing = document.getElementById("duration_timing");
var progressbar = document.getElementById("progressbar");
var progress = document.getElementById("progress");

music.addEventListener("timeupdate", (event) => {

  const { currentTime, duration } = event.srcElement;
  // console.log("current time is "+currentTime);
  // console.log("duration is "+duration);

  // for duration 
  let duration_min = Math.floor(duration / 60);
  let duration_sec = Math.floor(duration % 60);
  // console.log(duration_min+":"+duration_sec);
  if (duration_sec < 10) {
    duration_sec = `0${duration_sec}`;
  }
  if (duration) {
    duration_timing.textContent = `${duration_min}:${duration_sec}`;
  }

  //now for current time
  let currentTime_min = Math.floor(currentTime / 60);
  let currentTime_sec = Math.floor(currentTime % 60);

  if (currentTime_sec < 10) {
    currentTime_sec = `0${currentTime_sec}`;
  }
  current_timing.textContent = `${currentTime_min}:${currentTime_sec}`;

  let progressWidth = (currentTime / duration) * 100
  progress.style.width = `${progressWidth}%`;

})
progressbar.addEventListener("click", (event) => {
  // console.log(event);
  const { duration } = music;

  let progressClick = (event.offsetX / event.srcElement.clientWidth) * duration;

  //the (currentTime is built in audio controller)
  music.currentTime = progressClick;
  musicPlay()
});

music.addEventListener("ended", nextSong);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
