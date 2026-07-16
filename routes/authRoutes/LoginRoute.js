const express = require("express");
const loginControllers = require("../../controllers/authControllers/LoginControllers");
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post("/login", loginControllers.loginControllers);
router.post("/forget-pass", loginControllers.forgetpass);
router.post("/resetPassword/:token", loginControllers.resetPassword);
router.post("/logout", loginControllers.logout);
router.get("/profile", authMiddleware.protect, loginControllers.getProfile);
router.get("/userList", authMiddleware.protect, authMiddleware.authorizeRoles("superadmin"), loginControllers.allUsers);

//Superadmin appprove staff request
router.get(
  "/superadmin/pending",
  authMiddleware.protect,
  authMiddleware.ensureApprove,
  authMiddleware.authorizeRoles("superadmin"),
  loginControllers.getAllPendingStaff,
);
router.patch(
  "/superadmin/approve/:id",
  authMiddleware.protect,
  authMiddleware.ensureApprove,
  authMiddleware.authorizeRoles("superadmin"),
  loginControllers.reviewStaffStatus
);

module.exports = router;
