// Importer express validator
const { body, param } = require("express-validator");

// Tableau de validation pour l'endpoint POST/register
// Validation lors de la création d'un utilisateur
exports.validateRegisterUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isLength({ min: 3, max: 10 })
    .withMessage("Le nom doit avoir entre 3 et 10 caractères"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Mot de passe manquant")
    .isLength({ min: 8, max: 200 })
    .withMessage("Le mot de passe doit contenir entre 8 et 200 caractères"),
];

exports.validateUpdateUser = [
  param("id").isMongoId().withMessage("ID utilisateur manquant ou invalide"),

  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("password")
    .trim()
    .optional()
    .isLength({ min: 8, max: 200 })
    .withMessage("Le mot de passe doit contenir entre 8 et 200 caractères"),
];

exports.validateDeleteUser = [
  param("id").isMongoId().withMessage("ID utilisateur manquant ou invalide"),
];
