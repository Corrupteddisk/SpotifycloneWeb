function validateForm() {
    var username = document.forms["loginForm"]["uname"].value;
    var usernameRegex = /^[a-zA-Z0-9]{1,30}$/;
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    var password = document.forms["loginForm"]["psw"].value;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    var errorMsg1 = document.getElementById("errormsg1");
    var errorMsg2 = document.getElementById("errormsg2");

    errorMsg1.innerHTML = "";
    errorMsg2.innerHTML = "";

    if (!usernameRegex.test(username) && !emailRegex.test(username)) {
        errorMsg1.innerHTML = "Invalid username format. It should contain English letters or English letters with numbers and not exceed 30 characters, or it should be a valid email address.";
        return false;
    }

    if (!passwordRegex.test(password)) {
        errorMsg2.innerHTML = "Invalid password format. It should contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.";
        return false;
    }

    return true;
}

const passwordInput = document.getElementById('password-input');
const togglePassword = document.getElementById('toggle-password');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

