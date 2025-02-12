const express = require('express');
const router = express.Router();

const { registerUser, getAllUser, updateUser,  } = require('../controllers/userController');

router.post("/register", registerUser);
router.get('/', getAllUser);
router.put('/:id', updateUser);

module.exports = router;