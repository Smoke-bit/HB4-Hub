const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000
});

async function sendOTP(email, otp) {
    try {

        console.log("📨 Sending OTP to:", email);

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "HB4 Hub Verification Code",
            html: `
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

        console.log("✅ Email Sent Successfully!");
        console.log(info.response);

        return info;

    } catch (error) {

        console.error("❌ Nodemailer Error:");
        console.error(error);

        throw error;
    }
}


module.exports = sendOTP;