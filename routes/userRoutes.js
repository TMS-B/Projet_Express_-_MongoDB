const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");
const { protect, adminCheck } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateRequest");
const {
  validateRegisterUser,
  validateUpdateUser,
  validateDeleteUser,
} = require("../validations/authValidation");

router.post("/register", validateRegisterUser, validateRequest, registerUser);

router.get("/", protect, adminCheck, getAllUser);

router.put("/:id", protect, validateUpdateUser, validateRequest, updateUser);

router.delete("/:id", protect, validateDeleteUser, validateRequest, deleteUser);

router.post("/login", login);

module.exports = router;