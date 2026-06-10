import mongoose from "mongoose";

const LibrarySchema = new mongoose.Schema({
    userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User', // Referencia al modelo User 
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game' // Referencia al modelo Game
    },
    status: {
        type: String,
        enum: [ 'playing', 'completed', 'pending' ], // Estado del juego en la biblioteca
        default: 'pending' // Valor por defecto
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
}, { timestamps: true });

export default mongoose.model('Library', LibrarySchema);