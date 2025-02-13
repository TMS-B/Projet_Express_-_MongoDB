const JWT = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ message: 'Token manquant' });
		};

		const decoded = JWT.verify(token, JWT_SECRET)
		
		req.user = await User.findById(decoded._id)		

		next();

	} catch (error) {
		// En cas d'erreur serveur, retourner une réponse 500 (erreur interne)
		res.status(500).json({ message: 'Erreur de serveur', error: error.message });
	}
};

// Exporter le middleware pour l'utiliser dans d'autres parties de l'application
module.exports = protect;