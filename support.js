var icon = document.getElementById("icon");
icon.onclick = function () {
document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    // icon.src = "sun-icon.png";
    icon.src = "moon-icon2.png";
}
else {
//   icon.src = "moon-icon.png";
  icon.src = "sun-icon.png";

}
}