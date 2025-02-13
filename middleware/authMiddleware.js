const JWT = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

exports.protect = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: `Token manquant` });
        };

        const decoded = JWT.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        
        res.status(500).json({ message: `Erreur lors de la vérification du token`, error });
    }
};

exports.adminCheck = async (req, res, next) => {
    try {
        if(req.user.role === "admin"){
            next();
        }else{
          return res.status(401).json({ message: `Vous n'êtes pas admin` })  
        }
    } catch (error) {
        res.status(500).json({ message: `Erreur d'authentification admin` });
    }
};