const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/verify-email/:token", authCtrl.verifyEmail);
router.post("/resend-verification", authCtrl.resendVerification);

router.post("/forgot-password", authCtrl.forgotPassword);
router.get("/verify-reset-token/:token", authCtrl.verifyResetToken);
router.post("/reset-password/:token", authCtrl.resetPassword);

// Google OAuth
router.get("/google", authCtrl.googleAuth);
router.get("/google/callback", authCtrl.googleAuthCallback);

// Protected
router.get("/me", protect, authCtrl.getMe);
router.post("/logout", protect, authCtrl.logout);


//Profile management (Protected)
router.put('/complete-profile', protect, authCtrl.completeProfile);  // ✅ กรอกข้อมูลครั้งแรก
router.put('/update-profile', protect, authCtrl.updateProfile);      // ✅ แก้ไขข้อมูลภายหลัง


// Admin routes (Protected)
router.post('/admin/create-user', protect, upload.single('user_img'), authCtrl.createEmployee);
router.get('/admin/employees', protect, authCtrl.getEmployees);
router.get('/admin/deleted-employees', protect, authCtrl.getDeletedEmployees);
router.get('/admin/employee/:id', protect, authCtrl.getEmployeeById);
router.put('/admin/update-info-employee-for-admin/:id', protect, upload.single('user_img'), authCtrl.updateEmployee);
router.delete('/admin/delete-employee/:id', protect, authCtrl.deleteEmployee);
router.put('/admin/employees/:id/restore', protect, authCtrl.restoreEmployee);
router.delete('/admin/employees/:id/hardDeleted', protect, authCtrl.hardDeletedEmployee);




module.exports = router;