import mongoose from "mongoose";


const gameSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    plataforma: {
        type: String
    }

});

export default mongoose.model('Game', gameSchema);