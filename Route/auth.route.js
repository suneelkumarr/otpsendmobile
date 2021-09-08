const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/checkAuth')
const checkAdmin = require('../middleware/checkAdmin')

const {
    fetchCurrentUser,
    loginWithPhoneOtp,
    createNewUser,
    verifyPhoneOtp,
    handleAdmin
} = require('../Controller/auth.controller');

router.post("/register", createNewUser);

router.post("/login_with_phone", loginWithPhoneOtp);


router.post("/verify", verifyPhoneOtp);

router.get("/me", checkAuth, fetchCurrentUser);

router.get("/admin", checkAuth, checkAdmin, handleAdmin);

module.exports = router;