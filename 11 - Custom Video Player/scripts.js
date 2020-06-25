const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const ranges = player.querySelectorAll('.player__slider');
const skipBtns = player.querySelectorAll('[data-skip]');

function toggleVideo() { // check to see if video is paused using .paused property of HTMLMediaElement and play or pause based on that 
    // if (video.paused) {
    //     video.play();
    // }else {
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateBtn() { // change the play/pause icons when toggling video
    const icon = video.paused ? '&#9658;' : '&#10074; &#10074;';
    toggle.innerHTML = icon;
}

function skip() { // using .currentTime property of HTMLMediaElement to skip video 
    //console.log(this.dataset);
    const skipTime = this.dataset.skip;
    video.currentTime += parseFloat(skipTime);
}

function handleRanges() { // there 2 range inputs - for volume and playbackrate 
    //console.log(this.value);
    video[this.name] = parseFloat(this.value); // video.volume = valueof input, video.playbackrate = value of input
}

function updateProgress() {
    const percentage = (video.currentTime / video.duration) * 100; // get progress in percents
    progressBar.style.flexBasis = `${percentage}%`; // update css flex-basis to that percentage
}

function scroll(e){
    //console.log(e);
    // The offsetX property of a MouseEvent returns the x-coordinate of the mouse pointer, relative to the target element.
    // The HTMLElement.offsetWidth read-only property returns the layout width of an element as an integer.
    const scrollTime = parseFloat(e.offsetX / progress.offsetWidth) * video.duration; // using e.offsetX and progress.offsetWidth to calculate what time to scroll to
    video.currentTime = scrollTime; //using .currentTime property of HTMLMediaElement to scroll
}


//listening to the events
video.addEventListener('click', toggleVideo);
video.addEventListener('pause', updateBtn);
video.addEventListener('play', updateBtn);
video.addEventListener('timeupdate', updateProgress);
toggle.addEventListener('click', toggleVideo);
skipBtns.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRanges));

let isMouseDown = false; // flag used to call scroll function when mouse moved AND down
progress.addEventListener('click', scroll);
progress.addEventListener('mousemove', () => isMouseDown && scroll); // used && to avoid using else part of the ternary operation 
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);