const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

async function sendOTP(email, otp) {
    try {
        console.log("📨 Sending OTP to:", email);

        const response = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "College Hub",
                email: "utkarshneegi7@gmail.com"
            },

            to: [
                {
                    email: email
                }
            ],

            subject: "HB4 Hub Verification Code",

            htmlContent: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>HB4 Hub Verification</h2>

                    <p>Your verification code is:</p>

                    <h1 style="
                        letter-spacing:5px;
                        background:#f4f4f4;
                        display:inline-block;
                        padding:10px 20px;
                        border-radius:8px;
                    ">
                        ${otp}
                    </h1>

                    <p>This OTP expires in <b>5 minutes</b>.</p>

                    <p>If you didn't request this, you can ignore this email.</p>
                </div>
            `
        });

        console.log("✅ Email sent!");
        return response;

    } catch (error) {
        console.error("❌ Brevo Error:");
        console.error(error);
        throw error;
    }
}

module.exports = sendOTP;