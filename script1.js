console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Tum hi Ho ", filePath: "songs/1.mp3", coverPath: "covers/tum-hi-ho.jpg" },
    { songName: "Khamosiyan", filePath: "songs/2.mp3", coverPath: "covers/khamoshiyan.jpg" },
    { songName: "Sanam Re", filePath: "songs/3.mp3", coverPath: "covers/sanam-re.jpg" },
    { songName: "Ae Dil He Muskil", filePath: "songs/4.mp3", coverPath: "covers/ae-dil-hai-muskil.jpg" },
    { songName: "Mareez-E-Isque", filePath: "songs/5.mp3", coverPath: "covers/Mareez-E-Ishq.jpg" },
    { songName: "Ghungroo", filePath: "songs/6.mp3", coverPath: "covers/ghungroo.jpg" },
    { songName: "Itni si Bat hey", filePath: "songs/7.mp3", coverPath: "covers/itni-si-baat-hai.jpeg" },
    { songName: "Kabhi jo Badal Barse", filePath: "songs/8.mp3", coverPath: "covers/kabhi-jo-badal.jpg" },
    { songName: "Chal Wahan Jate he", filePath: "songs/9.mp3", coverPath: "covers/Chal-Wahan-Jaate-Hain.jpg" },
    { songName: "Sooraj Dooba hein", filePath: "songs/10.mp3", coverPath: "covers/Sooraj-Dooba-Hain.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        document.getElementsByClassName("paused")[0].classList.remove("fa-play-circle");
        document.getElementsByClassName("paused")[0].classList.add("fa-pause-circle");
        document.getElementsByClassName("paused")[0].classList.add("playing");
        document.getElementsByClassName("paused")[0].classList.remove("paused");

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        document.getElementsByClassName("playing")[0].classList.remove("fa-pause-circle");
        document.getElementsByClassName("playing")[0].classList.add("fa-play-circle");
        document.getElementsByClassName("playing")[0].classList.add("paused");
        document.getElementsByClassName("playing")[0].classList.remove("playing");
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
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

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (document.getElementsByClassName("playing")[0]) {
            document.getElementsByClassName("playing")[0].classList.remove("playing");
        }
        if (e.target.classList.contains("fa-pause-circle")) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            audioElement.pause();
            gif.style.opacity = 0;
            e.target.classList.add("paused");
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');


        }
        else if (e.target.classList.contains("fa-play-circle")) {
            makeAllPlays();
            if (!e.target.classList.contains("paused")) {

                songIndex = parseInt(e.target.id);
                audioElement.src = `songs/${songIndex + 1}.mp3`;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;

            }

            if (document.getElementsByClassName("paused")[0]) {
                document.getElementsByClassName("paused")[0].classList.remove("paused");
            }
            e.target.classList.add("playing");
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    document.querySelectorAll(".songItemPlay")[songIndex].classList.remove('fa-pause-circle')
    document.querySelectorAll(".songItemPlay")[songIndex].classList.add('fa-play-circle')
    if (document.getElementsByClassName("paused")[0]) {
        document.getElementsByClassName("paused")[0].classList.remove("paused");
    }
    if (document.getElementsByClassName("playing")[0]) {
        document.getElementsByClassName("playing")[0].classList.remove("playing");
    }
    
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
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
    if (document.getElementsByClassName("paused")[0]) {
        document.getElementsByClassName("paused")[0].classList.remove("paused");
    }
    if (document.getElementsByClassName("playing")[0]) {
        document.getElementsByClassName("playing")[0].classList.remove("playing");
    }
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.querySelectorAll(".songItemPlay")[songIndex].classList.remove('fa-play-circle')
    document.querySelectorAll(".songItemPlay")[songIndex].classList.add('fa-pause-circle')
    document.querySelectorAll(".songItemPlay")[songIndex].classList.add('playing')
})