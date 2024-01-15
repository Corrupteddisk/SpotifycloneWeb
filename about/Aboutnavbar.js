function showSidebar() {
  let sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}
function hideSidebar() {
  let hide_sidebar = document.querySelector(".sidebar");
  hide_sidebar.style.display = 'none';
}

document.getElementById("year").innerHTML = new Date().getFullYear();