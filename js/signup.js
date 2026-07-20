document.getElementById("signupForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const hostel = document.getElementById("hostel").value;

    // Basic validation
    if (!name || !email || !phone || !hostel) {
        alert("Please fill all fields.");
        return;
    }

    // Only Manipal learner email
    if (!email.endsWith("@learner.manipal.edu")) {
        alert("Please use your Manipal learner email.");
        return;
    }
    if (!/^\d{10}$/.test(phone)) {
    alert("Enter a valid 10-digit mobile number.");
    return;
}
    // Save data for next pages
    sessionStorage.setItem("signupName", name);
    sessionStorage.setItem("signupEmail", email);
    sessionStorage.setItem("signupPhone", phone);
    sessionStorage.setItem("signupHostel", hostel);

    // Next page
    window.location.href = "verify-email.html";

});