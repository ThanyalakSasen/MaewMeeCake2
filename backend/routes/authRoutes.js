const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authCtrl = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/users');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/users/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'user-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

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