// Middleware pour traiter les erreurs 
const errorHandler = (err, req, res, next) => {
    // Afficher l'erreur dans la console
    console.error(`errorHandler: ${ err.stack }`)

    //Déterminer le code erreur, par defaut 500
    const statusCode = err.statusCode || 500;

    // Déterminer le message d'erreur
    const message = err.message || "Erreur interne du serveur";

    // Determiner le code erreur (utils pour les erreur spécifiques comme MongoDB)
    const errorCode = err.code || "SERVER_ERROR"

    // Reponse JSON
    res.status(statusCode).json({ success: false, message, error: errorCode, stack: err.stack });
};

module.exports = errorHandler;