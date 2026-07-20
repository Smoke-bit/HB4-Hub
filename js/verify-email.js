const inputs = document.querySelectorAll(".otp-input");
const email = sessionStorage.getItem("signupEmail");
document.getElementById("emailDisplay").textContent = email;

// Redirect if user opened page directly
if (!email) {
    window.location.href = "signup.html";
}

// Send OTP automatically
window.addEventListener("load", async () => {

    try {

        const response = await fetch("http://localhost:5000/api/auth/send-otp", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email
            })

        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
        }

    } catch (err) {

        console.error(err);
        alert("Failed to send OTP.");

    }

});

// OTP Input Logic
inputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        input.value = input.value.replace(/[^0-9]/g, "");

        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }

    });

    input.addEventListener("keydown", (e) => {

        if (e.key === "Backspace" && !input.value && index > 0) {
            inputs[index - 1].focus();
        }

    });

});

// Verify OTP
document.getElementById("otpForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const otp = [...inputs].map(input => input.value).join("");

    if (otp.length !== 6) {
        alert("Enter the complete OTP.");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/auth/verify-otp", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                otp
            })

        });

        const data = await response.json();

        if (data.success) {

            window.location.href = "create-password.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);
        alert("OTP verification failed.");

    }

});