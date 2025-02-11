const express = require('express');
const router = express.Router();
const { register, getAllUsers, updateUsers, deleteUsers, login } = require('../controllers/userControllers');
const protect = require('../middlewares/authMiddleware');
const admin = require('../middlewares/admin');

router.post('/register', register);
router.post('/login', login)
router.get('/', protect, admin, getAllUsers);
router.put('/:id', updateUsers);
router.delete('/:id', deleteUsers);

module.exports = router;