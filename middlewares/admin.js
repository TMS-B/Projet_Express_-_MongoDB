const User = require("../models/User");

const Admin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return res
        .status(401)
        .json({ message: `Vous n'avez pas l'accès administrateur` });
    }

    next();
  } catch (error) {
    // En cas d'erreur serveur, retourner une réponse 500 (erreur interne)
    res
      .status(500)
      .json({ message: "Erreur de serveur", error: error.message });
  }
};

// Exporter le middleware pour l'utiliser dans d'autres parties de l'application
module.exports = Admin;
