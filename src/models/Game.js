import mongoose from "mongoose";


const gameSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
 /*    genero: {
        type: String,
        required: true,
    },
    plataforma: {
        type: String
    },
    programa: {
        type: String,
        default: 'VIDEOJUEGORUIDOVIOLENTO'
    }, */
    score_guerrero: {
        type: Number,
        default: 0
    },
    playerHealth: {
        type: Number,
        default: 0
    },
    score_enemigo: {
        type: Number,
        default: 0
    },
    enemyHealth: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Stat', gameSchema);