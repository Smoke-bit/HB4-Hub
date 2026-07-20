 const db = require("../config/db");
const bcrypt = require("bcrypt");

const generateOTP = require("../utils/generateOTP");
const sendOTPEmail = require("../utils/sendOTP");

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const otp = generateOTP();

        const hashedOTP = await bcrypt.hash(otp, 10);
        const expiresAt = Date.now() + 5 * 60 * 1000;

        db.run(
            "DELETE FROM otp WHERE email = ?",
            [email],
            (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Database Error"
                    });
                }

                db.run(
                    "INSERT INTO otp (email, otp, expiresAt) VALUES (?, ?, ?)",
                    [email, hashedOTP, expiresAt],
                    async (err) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: "Database Error"
                            });
                        }

                        try {
    await sendOTPEmail(email, otp);
} catch (error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Failed to send OTP email"
    });
}

                        return res.json({
                            success: true,
                            message: "OTP Sent Successfully"
                        });
                    }
                );
            }
        );

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.verifyOTP = async (req, res) => {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        db.get(
            "SELECT * FROM otp WHERE email = ?",
            [email],
            async (err, row) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Database Error"
                    });
                }

                if (!row) {
                    return res.status(400).json({
                        success: false,
                        message: "OTP not found"
                    });
                }

                if (Date.now() > row.expiresAt) {

                    db.run(
                        "DELETE FROM otp WHERE email = ?",
                        [email]
                    );

                    return res.status(400).json({
                        success: false,
                        message: "OTP Expired"
                    });
                }

                const isMatch = await bcrypt.compare(
                    otp,
                    row.otp
                );

                if (!isMatch) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid OTP"
                    });
                }

                // Mark email as verified
db.run(
    "INSERT OR REPLACE INTO verifiedEmails (email, verifiedAt) VALUES (?, ?)",
    [email, Date.now()]
);

// Delete used OTP
db.run(
    "DELETE FROM otp WHERE email = ?",
    [email]
);

return res.json({
    success: true,
    message: "OTP Verified Successfully"
});

            }
        );

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if email was OTP verified
        db.get(
            "SELECT * FROM verifiedEmails WHERE email = ?",
            [email],
            async (err, verifiedRow) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Database Error"
                    });
                }

                if (!verifiedRow) {
                    return res.status(400).json({
                        success: false,
                        message: "Please verify your email first"
                    });
                }

                // Check if user already exists
                db.get(
                    "SELECT * FROM users WHERE email = ?",
                    [email],
                    async (err, userRow) => {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: "Database Error"
                            });
                        }

                        if (userRow) {
                            return res.status(400).json({
                                success: false,
                                message: "User already exists"
                            });
                        }

                        // Hash password
                        const hashedPassword = await bcrypt.hash(password, 10);

                        // Create user
                        db.run(
                            "INSERT INTO users (name, email, password, verified) VALUES (?, ?, ?, ?)",
                            [name, email, hashedPassword, 1],
                            function (err) {

                                if (err) {
                                    return res.status(500).json({
                                        success: false,
                                        message: "Registration Failed"
                                    });
                                }

                                // Remove verification record
                                db.run(
                                    "DELETE FROM verifiedEmails WHERE email = ?",
                                    [email]
                                );

                                return res.json({
                                    success: true,
                                    message: "Registration Successful"
                                });

                            }
                        );

                    }
                );

            }
        );

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        db.get(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, user) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Database Error"
                    });
                }

                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: "User not found"
                    });
                }

                const match = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!match) {
                    return res.status(400).json({
                        success: false,
                        message: "Incorrect Password"
                    });
                }

                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                );

                return res.json({
                    success: true,
                    message: "Login Successful",
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });

            }
        );

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};