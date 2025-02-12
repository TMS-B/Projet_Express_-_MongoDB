const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({ message : `Tous les champs sont obligatoires` });
    }
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: `L'utilisateur a bien été crée`, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erreur lors de la création de l'utilisateur` });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const allUser = await User.find().select('-password');
        res.status(200).json({ message: `Récupération de tout les utilisateurs`, allUser })
    } catch (error) {
        res.status(500).json({ message: `Erreur` })
    }
};

exports.updateUser = async (req, res) => {
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
        res.status(500).json({ message: "Erreur lors de la mis à jour de l'utilisateur", error });
    }
};
