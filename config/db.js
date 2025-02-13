const mongoose = require ("mongoose");


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Base de données connectée`);
    } catch (error) {
        console.error(`Erreur lors de la connexion à la databse`, error)
    }
}

module.exports = connectDB;