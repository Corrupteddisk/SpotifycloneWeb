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
    { songName: "Tum hi Ho ", filePath: "songs/1.mp3", coverPath: "covers/tum-hi-ho.jpg", songDur: "04:22" },
    { songName: "Khamosiyan", filePath: "songs/2.mp3", coverPath: "covers/khamoshiyan.jpg", songDur: "05:34" },
    { songName: "Sanam Re", filePath: "songs/3.mp3", coverPath: "covers/sanam-re.jpg", songDur: "05:07 " },
    { songName: "Ae Dil He Muskil", filePath: "songs/4.mp3", coverPath: "covers/ae-dil-hai-muskil.jpg", songDur: "04:29" },
    { songName: "Mareez-E-Isque", filePath: "songs/5.mp3", coverPath: "covers/Mareez-E-Ishq.jpg", songDur: "04:51" },
    { songName: "Ghungroo", filePath: "songs/6.mp3", coverPath: "covers/ghungroo.jpg", songDur: "05:02" },
    { songName: "Itni si Bat hey", filePath: "songs/7.mp3", coverPath: "covers/itni-si-baat-hai.jpeg", songDur: "04:53" },
    { songName: "Kabhi jo Badal Barse", filePath: "songs/8.mp3", coverPath: "covers/kabhi-jo-badal.jpg", songDur: "04:15" },
    { songName: "Chal Wahan Jate he", filePath: "songs/9.mp3", coverPath: "covers/Chal-Wahan-Jaate-Hain.jpg", songDur: "05:24" },
    { songName: "Sooraj Dooba hein", filePath: "songs/10.mp3", coverPath: "covers/Sooraj-Dooba-Hain.jpg", songDur: "04:23" }
]

let i;
let songContainer = document.querySelector(".songItemContainer")
songContainer.innerHTML = ""
for (i = 0; i < songs.length; i++) {

    songContainer.innerHTML += `<div class="songItem"><img alt="1" src = "${songs[i].coverPath}"><span class="songName">${songs[i].songName}</span><span class="songlistplay"><span class="timestamp">${songs[i].songDur} <i id="${i}"class="far songItemPlay fa-play-circle"></i> </span></span></div>`

}

let songItems = Array.from(document.getElementsByClassName('songItem'));


// songItems.forEach((element, i) => {
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
// })

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
        // gif.style.opacity = 1;
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
        // gif.style.opacity = 0;
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
                // gif.style.opacity = 0;
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
                // gif.style.opacity = 1;
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

        if (songIndex >= 9) {
            songIndex = 0
        }
        else {
            songIndex += 1;
        }
    }
    
    gif.src = songs[songIndex].coverPath

    audioElement.src = songs[songIndex].filePath;
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



// sad song

let sadSongs = [
    { songName: "Agar Tum Sath Ho ", filePath: "./songs/sad/1.mp3", coverPath: "./songs/sad/1.jpg", songDur: "05:38" },
    { songName: "Channa Mereya ", filePath: "./songs/sad/2.mp3", coverPath: "./songs/sad/2.jpg", songDur: "03:03" },
    { songName: "Darkhast", filePath: "./songs/sad/3.mp3", coverPath: "./songs/sad/3.jpg", songDur: "07:11" },
    { songName: "hamari adhuru kahani ", filePath: "./songs/sad/4.mp3", coverPath: "./songs/sad/4.jpg", songDur: "05:45" },
    { songName: "Lo Maan Liya ", filePath: "./songs/sad/5.mp3", coverPath: "./songs/sad/5.jpg", songDur: "04:41" }
]
// romantic song

let romantiSongs = [
    { songName: "Hamdard ", filePath: "./songs/romantic/1.mp3", coverPath: "./songs/romantic/1.jpg", songDur: "04:20" },
    { songName: "kesariya ", filePath: "./songs/romantic/2.mp3", coverPath: "./songs/romantic/2.jpg", songDur: "04:28" },
    { songName: "muskurane ki wajah", filePath: "./songs/romantic/3.mp3", coverPath: "./songs/romantic/3.jpg", songDur: "05:34" },
    { songName: "Phir Muhabbat ", filePath: "./songs/romantic/4.mp3", coverPath: "./songs/romantic/4.jpg", songDur: "05:29" },
    { songName: "Zaalima ", filePath: "./songs/romantic/5.mp3", coverPath: "./songs/romantic/5.jpg", songDur: "04:59" }
]
// party song

let partySongs = [
    { songName: "Dil Chiz Tujhe Dedi ", filePath: "./songs/party/1.mp3", coverPath: "./songs/party/1.jpg", songDur: "03:14" },
    { songName: "DilliWali GirlFriend ", filePath: "./songs/party/2.mp3", coverPath: "./songs/party/2.jpg", songDur: "02:37" },
    { songName: "Galti se Mistake", filePath: "./songs/party/3.mp3", coverPath: "./songs/party/3.jpg", songDur: "02:44" },
    { songName: "Tera dhyan Kidhar hai ", filePath: "./songs/party/4.mp3", coverPath: "./songs/party/4.jpg", songDur: "03:43" },
    { songName: "Sooraj Dooba Hai yaaro ", filePath: "./songs/party/5.mp3", coverPath: "./songs/party/5.jpg", songDur: "02:39" }
]

// bengali songs
let bengaliSongs = [

    { songName: "Fatafati Football", filePath: "songs/11.mp3", coverPath: "covers/fatafati-football.jpg", songDur: "03:48" },
    { songName: "Bojhena Shey Bojhena", filePath: "songs/12.mp3", coverPath: "covers/bojhena-se-bojhena.jpeg", songDur: "04:09" },
    { songName: "Tomake Chai", filePath: "songs/13.mp3", coverPath: "covers/tomake-chai.jpg", songDur: "04:23" },
    { songName: "Asotama Saggamaya", filePath: "songs/14.mp3", coverPath: "covers/asotama-saggamaya.jpg", songDur: "05:14" },
    { songName: "Jabo Na Jabo Na Fire", filePath: "songs/15.mp3", coverPath: "covers/jabo-na-jabo-na-fire.jpg", songDur: "03:18" },
    { songName: "Eksho Bochor Dhore", filePath: "songs/16.mp3", coverPath: "covers/eksho-bochor-dhore.jpg", songDur: "03:20 " }
]
// top 10

let top10songs = [
    { songName: "Tum hi Ho ", filePath: "songs/1.mp3", coverPath: "covers/tum-hi-ho.jpg", songDur: "04:22" },
    { songName: "Khamosiyan", filePath: "songs/2.mp3", coverPath: "covers/khamoshiyan.jpg", songDur: "05:34" },
    { songName: "Sanam Re", filePath: "songs/3.mp3", coverPath: "covers/sanam-re.jpg", songDur: "05:07 " },
    { songName: "Ae Dil He Muskil", filePath: "songs/4.mp3", coverPath: "covers/ae-dil-hai-muskil.jpg", songDur: "04:29" },
    { songName: "Mareez-E-Isque", filePath: "songs/5.mp3", coverPath: "covers/Mareez-E-Ishq.jpg", songDur: "04:51" },
    { songName: "Ghungroo", filePath: "songs/6.mp3", coverPath: "covers/ghungroo.jpg", songDur: "05:02" },
    { songName: "Itni si Bat hey", filePath: "songs/7.mp3", coverPath: "covers/itni-si-baat-hai.jpeg", songDur: "04:53" },
    { songName: "Kabhi jo Badal Barse", filePath: "songs/8.mp3", coverPath: "covers/kabhi-jo-badal.jpg", songDur: "04:15" },
    { songName: "Chal Wahan Jate he", filePath: "songs/9.mp3", coverPath: "covers/Chal-Wahan-Jaate-Hain.jpg", songDur: "05:24" },
    { songName: "Sooraj Dooba hein", filePath: "songs/10.mp3", coverPath: "covers/Sooraj-Dooba-Hain.jpg", songDur: "04:23" }
]

function top10() {
    myProgressBar.value = 0
    gif.style.opacity = 0
    songs = top10songs;
    songIndex = 0
    document.querySelector("#top-heading").innerText = "Top Songs of Arijit Singh"
    let i;
    audioElement.pause()
    audioElement.currentTime = 0;
    songContainer.innerHTML = ""
    for (i = 0; i < songs.length; i++) {

        songContainer.innerHTML += `<div class="songItem"><img alt="1" src = "${songs[i].coverPath}"><span class="songName">${songs[i].songName}</span><span class="songlistplay"><span class="timestamp">${songs[i].songDur} <i id="${i}"class="far songItemPlay fa-play-circle"></i> </span></span></div>`

    }
    let songItems = Array.from(document.getElementsByClassName('songItem'));
    addingEventListener(songItems)
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    document.querySelectorAll(".songItemPlay")[0].classList.add("paused")
    audioElement.src = songs[songIndex].filePath;
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

    myProgressBar.value = 0

}
function romantic() {
    myProgressBar.value = 0

    gif.style.opacity = 0
    songs = romantiSongs;
    songIndex = 0
    document.querySelector("#top-heading").innerText = "Romantic Songs of Arijit Singh"
    let i;
    audioElement.pause()
    audioElement.currentTime = 0;
    songContainer.innerHTML = ""
    for (i = 0; i < songs.length; i++) {

        songContainer.innerHTML += `<div class="songItem"><img alt="1" src = "${songs[i].coverPath}"><span class="songName">${songs[i].songName}</span><span class="songlistplay"><span class="timestamp">${songs[i].songDur} <i id="${i}"class="far songItemPlay fa-play-circle"></i> </span></span></div>`

    }
    let songItems = Array.from(document.getElementsByClassName('songItem'));
    addingEventListener(songItems)
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    document.querySelectorAll(".songItemPlay")[0].classList.add("paused")
    audioElement.src = songs[songIndex].filePath;
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

}
function sad() {
    myProgressBar.value = 0

    gif.style.opacity = 0
    songs = sadSongs;
    songIndex = 0
    document.querySelector("#top-heading").innerText = "Sad Songs of Arijit Singh"
    let i;
    audioElement.pause()
    audioElement.currentTime = 0;
    songContainer.innerHTML = ""
    for (i = 0; i < songs.length; i++) {

        songContainer.innerHTML += `<div class="songItem"><img alt="1" src = "${songs[i].coverPath}"><span class="songName">${songs[i].songName}</span><span class="songlistplay"><span class="timestamp">${songs[i].songDur} <i id="${i}"class="far songItemPlay fa-play-circle"></i> </span></span></div>`

    }
    let songItems = Array.from(document.getElementsByClassName('songItem'));
    addingEventListener(songItems)
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    document.querySelectorAll(".songItemPlay")[0].classList.add("paused")
    audioElement.src = songs[songIndex].filePath;
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

}
function bengali() {
    myProgressBar.value = 0

    gif.style.opacity = 0
    songs = bengaliSongs;
    songIndex = 0
    document.querySelector("#top-heading").innerText = "Bengali Songs of Arijit Singh"
    let i;
    audioElement.pause()
    audioElement.currentTime = 0;
    songContainer.innerHTML = ""
    for (i = 0; i < songs.length; i++) {

        songContainer.innerHTML += `<div class="songItem"><img alt="1" src = "${songs[i].coverPath}"><span class="songName">${songs[i].songName}</span><span class="songlistplay"><span class="timestamp">${songs[i].songDur} <i id="${i}"class="far songItemPlay fa-play-circle"></i> </span></span></div>`

    }
    let songItems = Array.from(document.getElementsByClassName('songItem'));
    addingEventListener(songItems)
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    document.querySelectorAll(".songItemPlay")[0].classList.add("paused")
    audioElement.src = songs[songIndex].filePath;
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

}
function party() {
    myProgressBar.value = 0

    gif.style.opacity = 0
    songs = partySongs;
    songIndex = 0
    document.querySelector("#top-heading").innerText = "Party Songs of Arijit Singh"
    let i;
    audioElement.pause()
    audioElement.currentTime = 0;
    songContainer.innerHTML = ""
    for (i = 0; i < songs.length; i++) {

        songContainer.innerHTML += `<div class="songItem"><img alt="1" src = "${songs[i].coverPath}"><span class="songName">${songs[i].songName}</span><span class="songlistplay"><span class="timestamp">${songs[i].songDur} <i id="${i}"class="far songItemPlay fa-play-circle"></i> </span></span></div>`

    }
    let songItems = Array.from(document.getElementsByClassName('songItem'));
    addingEventListener(songItems)
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    document.querySelectorAll(".songItemPlay")[0].classList.add("paused")
    audioElement.src = songs[songIndex].filePath;
    document.getElementById("songTotalTime").innerText = "/" + document.querySelectorAll(".timestamp")[songIndex].innerText
    document.querySelectorAll(".songItem")[songIndex].classList.add("currentSongItem")
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

}


document.querySelectorAll(".genre").forEach((div) => {
    div.addEventListener("click", function () {
        myProgressBar.value = 0
        console.log(myProgressBar.value)
    })
})

// For volume button

let vol = document.getElementById("vol");
vol.oninput = function () {
    audioElement.volume = vol.value / 1000;
}

function replay() {
    audioElement.currentTime = 0
}
function shuffle() {

    if (!canShuffle) {

        canShuffle = true
        document.querySelector(".fa-shuffle").style.color = "green"
    }
    else {
        canShuffle = false
        document.querySelector(".fa-shuffle").style.color = "white"
    }
}


var icon = document.getElementById("icon");
icon.onclick = function () {
document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    // icon.src = "sun-icon.png";
    icon.src = "moon-icon.png";
}
else {
//   icon.src = "moon-icon.png";
  icon.src = "sun-icon.png";

}
}
