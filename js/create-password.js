const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const fill = document.getElementById("strengthFill");
const text = document.getElementById("strengthText");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirm = document.getElementById("toggleConfirm");

togglePassword.onclick = () => {

    password.type =
        password.type === "password"
            ? "text"
            : "password";

};

toggleConfirm.onclick = () => {

    confirmPassword.type =
        confirmPassword.type === "password"
            ? "text"
            : "password";

};

password.addEventListener("input", () => {

    const value = password.value;

    let score = 0;

    if(value.length >= 8){

        score++;

        document.getElementById("length").innerHTML="✅ At least 8 characters";

    }else{

        document.getElementById("length").innerHTML="❌ At least 8 characters";

    }

    if(/[A-Z]/.test(value)){

        score++;

        document.getElementById("upper").innerHTML="✅ One uppercase letter";

    }else{

        document.getElementById("upper").innerHTML="❌ One uppercase letter";

    }

    if(/[0-9]/.test(value)){

        score++;

        document.getElementById("number").innerHTML="✅ One number";

    }else{

        document.getElementById("number").innerHTML="❌ One number";

    }

    if(/[^A-Za-z0-9]/.test(value)){

        score++;

        document.getElementById("special").innerHTML="✅ One special character";

    }else{

        document.getElementById("special").innerHTML="❌ One special character";

    }

    const percent = score * 25;

    fill.style.width = percent + "%";

    if(score <= 1){

        fill.style.background="#ef4444";
        text.innerHTML="Weak";

    }
    else if(score == 2){

        fill.style.background="#f59e0b";
        text.innerHTML="Fair";

    }
    else if(score == 3){

        fill.style.background="#3b82f6";
        text.innerHTML="Good";

    }
    else{

        fill.style.background="#22c55e";
        text.innerHTML="Strong";

    }

});

document.getElementById("passwordForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        return;
    }

    const name = sessionStorage.getItem("signupName");
    const email = sessionStorage.getItem("signupEmail");
    const phone = sessionStorage.getItem("signupPhone");
    const hostel = sessionStorage.getItem("signupHostel");

    try {

        const response = await fetch("http://localhost:5000/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
            name,
            email,
            password: password.value
        })

        });

        const data = await response.json();

        if (data.success) {

            sessionStorage.clear();

            window.location.href = "welcome.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);
        alert("Unable to create account.");

    }

});