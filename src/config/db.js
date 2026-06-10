import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        await mongoose.connect(mongoUri);
        console.log('Conectado a la base de datos ✅');
    } catch (error) {
        console.error('⛔ Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}
    
