document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response = await fetch("https://college-hub-z0i0.onrender.com/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            // Save JWT
            localStorage.setItem("token", data.token);

            // Save logged-in user
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect
            window.location.href = "home.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);
        alert("Login failed.");

    }

});