const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/sign-up", authController.registerUser);
router.post("/verify-user", authController.verifyEmail);
router.post("/sign-in", authController.signIn);
router.get("/me", authController.protect, authController.getCurrentUser);
router.delete("/logout", authController.protect, authController.logoutUser);

module.exports = router;
