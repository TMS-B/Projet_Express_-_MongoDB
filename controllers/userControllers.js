const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (_id) => {
    const token = JWT.sign({ _id }, JWT_SECRET, {
        expiresIn: "10h",
    });
    return token;
}

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email })
        if (userExists){
            return res.status(404).json({ message: `Email déjà utilisé, veuillez en utilisé un autre.`})
        }
        const newUser = await User.create({ name, email, password, role });
        res.status(201).json({ message: `Votre compte a bien été créer.`, user: newUser });
    } catch (error) {
		res.status(500).json({ message: `Erreur lors de la création de l'utilisateur`, error });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: `erreurs lors de la récupération des utilisateurs`, error });
    }
};

exports.updateUsers = async (req, res) => {
    const { id } = req.params;
    const { name, password } = req.body;
    try {
        const update = await User.findByIdAndUpdate(id, { name, password }, { new: true });
        res.status(200).json({ message: `Profil mis à jour`, update });
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la modification de votre profil`, error })
    }
}

exports.deleteUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProfil = await User.findByIdAndDelete(id);
        res.status(200).json({ message: `Votre profil a été supprimé avec succès !`, deleteProfil})
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la suppression du profil` })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userLogin = await  User.findOne({ email });
        if(!userLogin){
            return res.status(404).json({ message: `Cet Utilisateur n'existe pas` });
        }
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
            return res.status(404).json({ message: `Email ou mot de passe incorrect` });
        }
        const token = generateToken(userLogin._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true
        });
        res.status(201).json({ userLogin, token });
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la connexion`, error : error.message});
    }
}