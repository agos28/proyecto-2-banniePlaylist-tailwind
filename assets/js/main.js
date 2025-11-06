// playlist
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
  ],

};

// Variables globales
let currentPlaylist = "playlist1";
let currentSongIndex = 0;

// carga cancion
const marqueeContainer = document.getElementById("marquee-container");
const songArtist = document.getElementById("song-artist");
const vinylImg = document.getElementById("vinyl");
const audio = document.getElementById("audio-player");
const songTitle = document.querySelectorAll(".song-title");

const playlistList = document.getElementById("playlist-list");

function showPlaylistSongs() {
  playlistList.innerHTML = ""; 

  const songs = playlists[currentPlaylist];
  for (let i = 0; i < songs.length; i++) {
    const textoo = document.createElement("h3");
    textoo.textContent = songs[i].title;
    textoo.classList.add("text-sm", "font-redaction-bold", "text-[#1B62F3]", "my-1");

    playlistList.appendChild(textoo);
  }
}

showPlaylistSongs();

// repeticiones del título
const repeatCount = 100;

function loadSong() {
  const song = playlists[currentPlaylist][currentSongIndex];
  vinylImg.src = song.vinyl;
  audio.src = song.song;
  songArtist.textContent = song.artist;

  // saco el contenido de antes
  marqueeContainer.innerHTML = "";

  // crea los spans 
  for (let i = 0; i < repeatCount; i++) {
    const span = document.createElement("span");
    span.textContent = song.title;
    span.classList.add("song-title", "text-[#1B62F3]", "font-redaction-bold", "text-lg", "animacion-texto", "mr-7", "tracking-widest");
    marqueeContainer.appendChild(span);
  }
}


// controlws
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

// cambiar playlist
function changePlaylist(name) {
  currentPlaylist = name;
  currentSongIndex = 0;
  loadSong();
  audio.play();
}

// inicia
loadSong();
