const User = require('../models/User');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_SECRET;

const generateToken = (_id) => {
    const token = JWT.sign({ _id }, JWT_Secret, {
        expiresIn: "10h",
    });
    return token;
};


exports.registerUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    
    if(!name || !email || !password){
        return next({ statusCode: 400, message: "Tous les champs sont obligatoires",  });
    }
    try {
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ message: `L'utilisateur a bien été crée`, user });
    } catch (error) {
        next(error);
    }
};

exports.getAllUser = async (req, res, next) => {
    try {
        const allUser = await User.find().select('-password');
        res.status(200).json({ message: `Récupération de tout les utilisateurs`, allUser })
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    const {id} = req.params;
    const newName = req.body.name;
    const newPassword = req.body.newPassword;
    try {
        const updateUser = await User.findByIdAndUpdate(id, { name: newName, password: newPassword }, { new: true });
        if(!updateUser){
            return res.status(400).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json({ message: "Utilisateur mis à jour" });
    } catch (error) {
        next()
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params);
        res.status(200).json({ message: 'User deleted successfuly' })
    } catch (error) {
       next(error); 
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userLogin = await User.findOne({ email });
        if(!userLogin){
            return res.status(401).json({ message: `L'utilisateur n'existe pas` });
        }

        const isMatch = await bcrypt.compare( password, userLogin.password);
        if(!isMatch){
            return res.status(401).json({ message: `Email ou mot de passe incorrect` });
        }

        const token = generateToken(userLogin._id);
        res.cookie('jwt', token, {
            httpOnly: true,
        })

        res.status(201).json({ userLogin, token });
        
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la connexion`, error : error.message });
    }
    
} 
