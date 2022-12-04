checkDevice()

window.addEventListener("keydown", playSound)

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}
function playSound(e) {
    //getting the audio source for the pressed key
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    //getting the key element for the pressed key
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    //if the pressed key doesnt have a audio, function will stop
    if (!audio) return;
    //otherwise, style will be added and audio will be played
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}


const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

function checkDevice(){
    let isDesktop;

(() => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        isDesktop = false
        alert("This application works only on PC")
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        isDesktop = false
        alert("This application works only on PC")
    } else {
        isDesktop = true
    }

})();


if (isDesktop) {
    window.addEventListener("keydown", playSound)
}
}