var vid, playbtn, seekslider, curtimetext, durtimetext, mutebtn, fullscreenbtn;

function initializePlayer(){
    //Set Object reference
    vid = document.getElementById("my_video");
    playbtn = document.getElementById("playpausebtn");
    seekslider = document.getElementById("seekslider");
    curtimetext = document.getElementById("curtimetext");
    durtimetext = document.getElementById("durtimetext");
    mutebtn = document.getElementById("mutebtn");
    volumeslider = document.getElementById("volumeslider");
    fullscreenbtn = document.getElementById("fullscreenbtn");

    // Add event listeners
    playbtn.addEventListener("click",playPause,false);
    seekslider.addEventListener("change",vidSeek,false);
    vid.addEventListener("timeupdate",seektimeupdate,false);
    mutebtn.addEventListener("click",vidmute, false);
    volumeslider.addEventListener("change",setvolume, false);
    fullscreenbtn.addEventListener("click",toggleFullScreen, false);
}

window.onload = initializePlayer;

function playPause() {
    if(vid.paused){
        vid.play();
        playbtn.innerHTML = "Pause";
    }else{ 
        vid.pause();
        playbtn.innerHTML = "Play";
    }
}
function vidSeek(){
    var seekto = vid.duration * (seekslider.value / 100);
    vid.currentTime = seekto;
}
function seektimeupdate(){
    var nt = vid.currentTime * (100 / vid.duration);
    seekslider.value = nt;
    var curmins=Math.floor(vid.currentTime / 60);
    var cursecs=Math.floor(vid.currentTime - curmins * 60);
    var durmins= Math.floor(vid.duration / 60);
    var dursecs = Math.floor(vid.duration - durmins * 60);
    if(cursecs < 10){cursecs = "0" + cursecs;}
    if(dursecs < 10){ dursecs = "0" + dursecs;}
    if(curmins < 10){ curmins = "0" + curmins;}
    if(dursecs < 10){ durmins = "0" + durmins;}
    curtimetext.innerHTML = curmins + ":" + cursecs;
    durtimetext.innerHTML = durmins + ":" + dursecs;
}
function vidmute(){
    if(vid.muted){
        vid.muted = false;
        mutebtn.innerHTML = "Mute";
    }else { 
        vid.muted = true;
        mutebtn.innerHTML = "Unmute";
    }
}
function setvolume(){
    vid.volume = volumeslider.value /100;
}
function toggleFullScreen(){
    if(vid.requestFullScreen){
        vid.requestFullScreen();
    } else if(vid.webkitRequestFullScreen){
        vid.webkitRequestFullScreen();
    } else if(vid.mozRequestFullScreen){
        vid.mozRequestFullScreen();
    }
}
let listVideo = document.querySelectorAll('.video-list .vid');
let mainVideo = document.querySelector('.main-video video');
let title = document.querySelector('.main-video .title');
listVideo.forEach(video =>{
    video.onclick = () =>{
        listVideo.forEach(vid => vid.classList.remove('active'));
        video.classList.add('active');
        if(video.classList.contains('active')){
            let src = video.children[0].getAttribute('src');
            mainVideo.src = src;
            let text= video.children[1].innerHTML;
            title.innerHTML = text;            
        };
    };
}); 