const video = document.getElementById('video')
const slider = document.getElementById('slider')
const timer = document.getElementById('timer')
const playPauseIcon = document.getElementById('play-pause-icon')
const muteUnmuteIcon = document.getElementById('mute-unmute-icon')

slider.max = 23;
video.addEventListener('timeupdate', setTime);
function setTime() {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime - minutes * 60);
  
    const minuteValue = minutes.toString().padStart(2, '0');
    const secondValue = seconds.toString().padStart(2, '0');
  
    const mediaTime = `${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;
    slider.value = video.currentTime
}

slider.addEventListener('input', seek);
function seek(){
    video.currentTime = slider.value
}

const forward = () => {
    video.currentTime += 10
}
const backward = () => {
    video.currentTime -= 10
}
const fullscreen = () => {
    video.fullscreen = true
}
const playPause = () => {
    if(video.paused){
        video.play();
        playPauseIcon.className = "bi bi-pause-fill"
    } else{
        video.pause();
        playPauseIcon.className = "bi bi-play-fill"
    }
}
video.addEventListener('click', playPause);
const muteUnmute = () => {
    if(video.muted){
        video.muted=false
        muteUnmuteIcon.className = "bi bi-volume-up"
    } else{
        video.muted=true
        muteUnmuteIcon.className = "bi bi-volume-mute"
    }
}



