console.log("Welcome to Spotify");

// Initialize the Variables
let canShuffle = false
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');


let songs = [
    { songName: "Dil Chiz Tujhe Dedi ", filePath: "./songs/1.mp3", coverPath: "./images/1.jpg", songDur: "03:14" },
    { songName: "Dilli Wali Girlfriend", filePath: "./songs/2.mp3", coverPath: "./images/2.jpg", songDur: "02:37" },
    { songName: "Galti Se Mistake", filePath: "./songs/3.mp3", coverPath: "./images/3.jpg", songDur: "02:44" },
    { songName: "Paalat", filePath: "./songs/4.mp3", coverPath: "./images/4.jpg", songDur: "03:43" },
    { songName: "Sooraj Doba Hai Yaroon", filePath: "./songs/5.mp3", coverPath: "./images/5.jpg", songDur: "02:39" },
]

let i;
let songContainer = document.querySelector(".songItemContainer")
songContainer.innerHTML = ""
for (i = 0; i < songs.length; i++) {

    songContainer.innerHTML += `<div class="songItem"><img alt="1" src = "${songs[i].coverPath}"><span class="songName">${songs[i].songName}</span><span class="songlistplay"><span class="timestamp">${songs[i].songDur} <i id="${i}"class="far songItemPlay fa-play-circle"></i> </span></span></div>`

}

let songItems = Array.from(document.getElementsByClassName('songItem'));



document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
document.querySelectorAll(".songItemPlay")[0].classList.add("paused")
gif.src = songs[songIndex].coverPath


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.classList.add("animate");
        document.getElementsByClassName("paused")[0].classList.remove("fa-play-circle");
        document.getElementsByClassName("paused")[0].classList.add("fa-pause-circle");
        document.getElementsByClassName("paused")[0].classList.add("playing");
        document.getElementsByClassName("paused")[0].classList.remove("paused");

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.classList.remove("animate");
        document.getElementsByClassName("playing")[0].classList.remove("fa-pause-circle");
        document.getElementsByClassName("playing")[0].classList.add("fa-play-circle");
        document.getElementsByClassName("playing")[0].classList.add("paused");
        document.getElementsByClassName("playing")[0].classList.remove("playing");
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    // progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

function addingEventListener(songItems) {


    songItems.forEach((element) => {

        element.addEventListener('click', (e) => {

            if (document.getElementsByClassName("playing")[0]) {
                document.getElementsByClassName("playing")[0].classList.remove("playing");
            }
            if (e.target.querySelector(".songItemPlay").classList.contains("fa-pause-circle")) {
                makeAllPlays();
                songIndex = parseInt(e.target.getElementsByClassName("songItemPlay")[0].id);
                audioElement.pause();
                gif.classList.remove("animate");
                e.target.getElementsByClassName("songItemPlay")[0].classList.add("paused");
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');


            }
            else if (e.target.querySelector(".songItemPlay").classList.contains("fa-play-circle")) {

                makeAllPlays();
                if (!e.target.querySelector(".songItemPlay").classList.contains("paused")) {
                    document.querySelectorAll(".songItem")[songIndex].classList.remove("currentSongItem")
                    songIndex = parseInt(e.target.getElementsByClassName("songItemPlay")[0].id);
                    // console.log(songIndex)
                    audioElement.src = `songs/${songIndex + 1}.mp3`;
                    gif.src = songs[songIndex].coverPath
                    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
                    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
                    masterSongName.innerText = songs[songIndex].songName;
                    audioElement.currentTime = 0;

                }

                if (document.getElementsByClassName("paused")[0]) {
                    document.getElementsByClassName("paused")[0].classList.remove("paused");
                }
                e.target.getElementsByClassName("songItemPlay")[0].classList.add("playing");
                e.target.getElementsByClassName("songItemPlay")[0].classList.remove('fa-play-circle');
                e.target.getElementsByClassName("songItemPlay")[0].classList.add('fa-pause-circle');
                audioElement.play();
                gif.classList.add("animate");
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            }
        })
    })

}

addingEventListener(songItems)

document.getElementById('next').addEventListener('click', () => {
    document.querySelectorAll(".songItemPlay")[songIndex].classList.remove('fa-pause-circle')
    document.querySelectorAll(".songItemPlay")[songIndex].classList.add('fa-play-circle')
    document.querySelectorAll(".songItem")[songIndex].classList.remove("currentSongItem")
    if (document.getElementsByClassName("paused")[0]) {
        document.getElementsByClassName("paused")[0].classList.remove("paused");
    }
    if (document.getElementsByClassName("playing")[0]) {
        document.getElementsByClassName("playing")[0].classList.remove("playing");
    }

    if (canShuffle) {

        songIndex = Math.floor(Math.random() * songs.length)

    } else {

        if (songIndex >= 4) {
            songIndex = 0
        }
        else {
            songIndex += 1;
        }
    }

    audioElement.src = songs[songIndex].filePath;
    gif.src = songs[songIndex].coverPath
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.querySelectorAll(".songItemPlay")[songIndex].classList.remove('fa-play-circle')
    document.querySelectorAll(".songItemPlay")[songIndex].classList.add('fa-pause-circle')
    document.querySelectorAll(".songItemPlay")[songIndex].classList.add('playing')

})

document.getElementById('previous').addEventListener('click', () => {
    document.querySelectorAll(".songItemPlay")[songIndex].classList.remove('fa-pause-circle')
    document.querySelectorAll(".songItemPlay")[songIndex].classList.add('fa-play-circle')
    document.querySelectorAll(".songItem")[songIndex].classList.remove("currentSongItem")
    if (document.getElementsByClassName("paused")[0]) {
        document.getElementsByClassName("paused")[0].classList.remove("paused");
    }
    if (document.getElementsByClassName("playing")[0]) {
        document.getElementsByClassName("playing")[0].classList.remove("playing");
    }
    if (canShuffle) {

        songIndex = Math.floor(Math.random() * songs.length)

    }
    else {

        if (songIndex <= 0) {
            songIndex = 0
        }
        else {
            songIndex -= 1;
        }
    }
    audioElement.src = songs[songIndex].filePath;
    gif.src = songs[songIndex].coverPath
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.querySelectorAll(".songItemPlay")[songIndex].classList.remove('fa-play-circle')
    document.querySelectorAll(".songItemPlay")[songIndex].classList.add('fa-pause-circle')
    document.querySelectorAll(".songItemPlay")[songIndex].classList.add('playing')
})

let min, sec
setInterval(displaySongTime, 1000)
function displaySongTime() {
    min = Math.floor(audioElement.currentTime / 60)
    sec = Math.floor(audioElement.currentTime % 60)

    document.getElementById("songCurrTime").innerText = ((min >= 10) ? sec : ("0" + min)) + ":" + ((sec >= 10) ? sec : ("0" + sec))
}

function replay() {
    audioElement.currentTime = 0
}
function shuffle() {
    
    if(!canShuffle){

        canShuffle = true
        document.querySelector(".fa-shuffle").style.color = "green"
    }
    else{
        canShuffle = false
        document.querySelector(".fa-shuffle").style.color = "white"
    }
}
let vol = document.getElementById("vol");
vol.oninput = function () {
    audioElement.volume = vol.value / 1000;
}

var icon = document.getElementById("icon");
icon.onclick = function () {
document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    // icon.src = "sun-icon.png";
    icon.src = "../moon-icon.png";
}
else {
//   icon.src = "moon-icon.png";
  icon.src = "../sun-icon.png";

}
}