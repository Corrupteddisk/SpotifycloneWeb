function validateForm() {
    var form = document.forms["loginForm"];
    var username = form["uname"].value;
    var password = form["psw"].value;
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
    if (!usernameRegex.test(username)) {
        alert("Invalid username. Please enter a valid username.");
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert("Invalid password. Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.");
        return false;
    }
    return true;
}

const passwordInput = document.getElementById('password-input');
const togglePassword = document.getElementById('toggle-password');

togglePassword.addEventListener('click', function() {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});