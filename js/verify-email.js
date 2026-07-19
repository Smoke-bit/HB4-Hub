const inputs = document.querySelectorAll(".otp-input");

inputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        input.value = input.value.replace(/[^0-9]/g, "");

        if(input.value && index < inputs.length - 1){

            inputs[index + 1].focus();

        }

    });

    input.addEventListener("keydown", (e) => {

        if(e.key === "Backspace" && !input.value && index > 0){

            inputs[index - 1].focus();

        }

    });

});

document.getElementById("otpForm").addEventListener("submit", (e)=>{

    e.preventDefault();

    window.location.href = "create-password.html";

});