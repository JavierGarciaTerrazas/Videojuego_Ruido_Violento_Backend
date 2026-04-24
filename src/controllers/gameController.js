import Game from "../models/Game.js";

export const createGame = async (req, res) => {
    try{
        const { titulo, genero, plataforma } = req.body;
        if (!titulo || !genero) {
            return res.status(400).json({ message: "⛔ Título y género son requeridos ✖️" });
        }

        const newGame = new Game({ titulo, genero, plataforma });
        await newGame.save();
        res.status(201).json({ message: "✅ Juego creado exitosamente ✔️", Juego : newGame });

    } 
    catch (error) {
        res.status(500).json({ message: "❌ Error al crear el juego ✖️", error: error.message });
    }
}

export const getGames = async (req, res) => {
    try {
        const juegos = await Game.find();
        res.json(juegos);
    } 
    catch (error) {
        res.status(500).json({ message: "❌ Error al obtener los juegos ✖️", error: error.message });
    }
}