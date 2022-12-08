const play = document.getElementById('play')
const next = document.getElementById('next')
const previous = document.getElementById('previous')
const slider = document.getElementById('slider')
const current = document.getElementById('current-time')
const total = document.getElementById('total-time')
const thumbnail = document.getElementById('thumbnail')
const container = document.getElementById('container').style
const audio = document.querySelector('audio')
const title = document.getElementById('song-name')
const artist = document.getElementById('artist-name')

let currentSong = 0

const playlist = [
    {
        name: "Starboy",
        artist: "The Weeknd",
        thumbnail: "./images/thumbnail1.png",
        src: "./songs/starboy.mp3"
    },
    {
        name: "New Rules",
        artist: "Dua Lipa",
        thumbnail: "./images/thumbnail2.png",
        src: "./songs/newrules.mp3"
    },
    {
        name: "Another Love",
        artist: "Tom Odell",
        thumbnail: "./images/thumbnail3.png",
        src: "./songs/anotherlove.mp3"
    }
]

total.innerText = getDuration()

function getDuration(){
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration - minutes * 60);
      
        const minuteValue = minutes.toString().padStart(2, '0');
        const secondValue = seconds.toString().padStart(2, '0');
      
        const mediaTime = `${minuteValue}:${secondValue}`;

        slider.setAttribute('max', audio.duration)
        return mediaTime
}

audio.addEventListener('timeupdate', setTime)

function setTime(){
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime - minutes * 60);
  
    const minuteValue = minutes.toString().padStart(2, '0');
    const secondValue = seconds.toString().padStart(2, '0');
  
    const mediaTime = `${minuteValue}:${secondValue}`;
    current.innerText = mediaTime;
    slider.value = audio.currentTime
    total.innerText = getDuration()
}

function changeSong(song){
    title.innerText = song.name
    artist.innerText = song.artist
    thumbnail.setAttribute('src', song.thumbnail)
    audio.setAttribute('src', song.src)
    container.backgroundImage = `url(${song.thumbnail})`
}
function playsong(){
    play.innerHTML = '<i class="bi bi-pause-fill"></i>'
    audio.play()
}
function pausesong(){
    play.innerHTML = '<i class="bi bi-play-fill"></i>'
    audio.pause()
}
function playPause(){
    if(audio.paused){
        playsong()
    }
    else{
        pausesong()
    }
}
slider.addEventListener('input', seek)
function seek(){
    audio.currentTime = slider.value
}

function nextSong(){
    currentSong++;
    if ( currentSong > playlist.length-1) {
        currentSong = 0;
    }
    changeSong(playlist[currentSong])
    playPause()
}
function previousSong(){
    currentSong--;
    if ( currentSong < 0 ) {
        currentSong = playlist.length - 1;
    }
    changeSong(playlist[currentSong])
    playPause()
}
next.addEventListener('click', nextSong)
previous.addEventListener('click', previousSong)

play.addEventListener('click', playPause)