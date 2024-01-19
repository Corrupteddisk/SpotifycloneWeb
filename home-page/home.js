let title = document.querySelector('.say')
let name = "Welcome To Say Music ♩ ♪ ♫ ♬"
let index = 1;

let typewriter = () =>{
    let new_title = name.slice(0,index);
    title. innerText = new_title;
    index > name.length ? index = 1:index ++;
    setTimeout(()=>typewriter(),200);
}

typewriter()

function playAudio() {
    var audio = document.getElementById("myAudio");
    audio.muted = false;
    audio.play();
}

window.onload = playAudio; 



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
