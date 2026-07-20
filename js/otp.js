const inputs = document.querySelectorAll(".otp-input");

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

document.getElementById("otpForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const otp = [...inputs].map(input => input.value).join("");

    if (otp.length !== 6) {
        alert("Please enter the complete OTP.");
        return;
    }

    const email = sessionStorage.getItem("signupEmail");

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
        alert("Unable to verify OTP.");

    }

});