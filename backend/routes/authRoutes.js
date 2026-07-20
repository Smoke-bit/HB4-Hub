const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
    sendOTP,
    verifyOTP,
    register,
    login
} = require("../controllers/authController");
console.log({
    sendOTP,
    verifyOTP,
    register,
    login
});
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/register", register);
router.post("/login", login);


router.get("/me", authMiddleware, (req, res) => {

    res.json({
        success: true,
        user: req.user
    });

});

module.exports = router;