// Check if user is logged in
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// Get logged in user
const user = JSON.parse(localStorage.getItem("user"));

// Example: Show user's name if an element exists
const nameElement = document.getElementById("userName");

if (nameElement && user) {
    nameElement.textContent = user.name;
}
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "login.html";

    });
}