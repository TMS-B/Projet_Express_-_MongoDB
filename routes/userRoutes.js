const express = require('express');
const router = express.Router();

const { registerUser, getAllUser } = require('../controllers/userController');

router.post("/register", registerUser);
router.get('/', getAllUser);

module.exports = router;