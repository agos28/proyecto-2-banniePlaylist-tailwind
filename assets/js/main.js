
// PLAYLISTS
const playlists = {
  playlist1: [
    { title: "RUN", artist: "BTS", vinyl: "assets/images/vinyls/vinyl-hyyh.png", song: "assets/audio/song-run-bts.mp3" },
    { title: "BITTERSUITE", artist: "Billie Eilish", vinyl: "assets/images/vinyls/vinyl-billie.png", song: "assets/audio/song-bittersuite-billieeilish.mp3" },
    { title: "Whalien 52", artist: "BTS", vinyl: "assets/images/vinyls/vinyl-hyyh.png", song: "assets/audio/song-whalien52-bts.mp3" },
    { title: "Magic", artist: "Coldplay", vinyl: "assets/images/vinyls/vinyl-magic.png", song: "assets/audio/song-magic-coldplay.mp3" }
  ],
  playlist2: [
    { title: "Higher Power", artist: "Coldplay", vinyl: "assets/images/vinyls/vinyl-higherpower.png", song: "assets/audio/song-higher-power-coldplay.mp3" },
    { title: "David", artist: "Lorde", vinyl: "assets/images/vinyls/vinyl-lorde.png", song: "assets/audio/song-david-lorde.mp3" },
    { title: "Lacy", artist: "Olivia Rodrigo", vinyl: "assets/images/vinyls/vinyl-lacy.png", song: "assets/audio/song-lacy-oliviaRodrigo.mp3" },
    { title: "Number One", artist: "Balu Brigada", vinyl: "assets/images/vinyls/vinyl-baluBrigada.png", song: "assets/audio/song-numberOne-baluBrigada.mp3" }
  ],
  playlist3: [
    { title: "You're On Your Own Kid", artist: "Taylor Swift", vinyl: "assets/images/vinyls/vinyl-yoyok.png", song: "assets/audio/song-yoyok-taylorSwift.mp3" },
    { title: "Perfect Blues", artist: "Hannah Bahng", vinyl: "assets/images/vinyls/vinyl-hannah.png", song: "assets/audio/song-perfectBlues-hannah.mp3" },
    { title: "STOP", artist: "Stray Kids", vinyl: "assets/images/vinyls/vinyl-levanter.png", song: "assets/audio/song-stop-strayKids.mp3" },
    { title: "This Is What Slow Dancing Feels Like", artist: "Jvke", vinyl: "assets/images/vinyls/vinyl-jvke.png", song: "assets/audio/song-thisIsWhatSlowDancingFeelsLike-jvke.mp3" }
  ]
};


// VARIABLES GLOBALES
let currentPlaylist = "playlist1";
let currentSongIndex = 0;

const marqueeContainer = document.getElementById("marquee-container");
const songArtist = document.getElementById("song-artist");
const vinylImg = document.getElementById("vinyl");
const audio = document.getElementById("audio-player");
const playlistList = document.getElementById("playlist-list");

// Botones
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon"); 
const restartBtn = document.getElementById("restartBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playlist1Btn = document.getElementById("playlist1-btn");
const playlist2Btn = document.getElementById("playlist2-btn");
const playlist3Btn = document.getElementById("playlist3-btn");


// FUNCIONES PRINCIPALES

function showPlaylistSongs() {
  playlistList.replaceChildren();
  const songs = playlists[currentPlaylist];

  for (let i = 0; i < songs.length; i++) {
    const contenedorListaPlaylist = document.createElement("div");
    contenedorListaPlaylist.classList.add("flex", "gap-2");

    const title = document.createElement("h3");
    title.textContent = songs[i].title;
    title.classList.add("text-sm", "font-redaction-bold", "text-[#1B62F3]", "my-1", "cursor-pointer", "w-[100px]");

    const contenedorIcono = document.createElement("div");
    contenedorIcono.classList.add("flex", "items-top", "mt-2");

    const icon = document.createElement("img");
    icon.src = "assets/images/playPulse.png";
    icon.classList.add("playing-icon", "animate-pulse", "w-[12px]", "h-[12px]");
    icon.style.visibility = "hidden";

    contenedorIcono.appendChild(icon);
    contenedorListaPlaylist.appendChild(contenedorIcono);
    contenedorListaPlaylist.appendChild(title);
    playlistList.appendChild(contenedorListaPlaylist);

    title.addEventListener("click", function () {
      currentSongIndex = i;
      loadSong();
      audio.play();
    });
  }
}


function updatePlayingIcon() {
  const icons = document.getElementsByClassName("playing-icon");
  for (let i = 0; i < icons.length; i++) {
    icons[i].style.visibility = (i === currentSongIndex) ? "visible" : "hidden";
  }
}


const repeatCount = 6;

function loadSong() {
  const song = playlists[currentPlaylist][currentSongIndex];
  vinylImg.src = song.vinyl;
  audio.src = song.song;
  songArtist.textContent = song.artist;

  marqueeContainer.replaceChildren();
  for (let i = 0; i < repeatCount; i++) {
    const span = document.createElement("span");
    span.textContent = song.title;
    span.classList.add("song-title", "text-[#1B62F3]", "font-redaction-bold", "text-lg", "animacion-texto", "tracking-widest", "w-[420px]");
    marqueeContainer.appendChild(span);
  }

  updatePlayingIcon();
}


function changePlaylist(name) {
  currentPlaylist = name;
  currentSongIndex = 0;
  showPlaylistSongs();
  loadSong();
  audio.play();
}


function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlists[currentPlaylist].length;
  loadSong();
  audio.play();
}


function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
  loadSong();
  audio.play();
}


// EVENTOS

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    playIcon.src = "assets/images/pause.png"; // cambia al ícono de pausa
  } else {
    audio.pause();
    playIcon.src = "assets/images/play.png"; // vuelve al ícono de play
  }
});

restartBtn.addEventListener("click", function () {
  audio.currentTime = 0; // vuelve al inicio
  audio.play(); // la reproduce
});

prevBtn.addEventListener("click", function () {
  prevSong();
});

nextBtn.addEventListener("click", function () {
  nextSong();
});

playlist1Btn.addEventListener("click", function () {
  changePlaylist("playlist1");
});

playlist2Btn.addEventListener("click", function () {
  changePlaylist("playlist2");
});

playlist3Btn.addEventListener("click", function () {
  changePlaylist("playlist3");
});

audio.addEventListener("pause", function () {
  const icons = document.getElementsByClassName("playing-icon");
  for (let i = 0; i < icons.length; i++) {
    icons[i].style.visibility = "hidden";
  }
});

audio.addEventListener("play", function () {
  updatePlayingIcon();
});


// INICIO
showPlaylistSongs();
loadSong();
