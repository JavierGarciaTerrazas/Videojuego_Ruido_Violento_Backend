import Library from "../models/Library.js";

export const addToLibrary = async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario autenticado
        const { gameId } = req.body; // Obtener el ID del juego desde el cuerpo de la solicitud

        const existing = await Library.findOne({
            userId,
            gameId
        });

        if (existing) {
            return res.status(400).json({ message: "⛔ El juego ya está en tu biblioteca ✖️" });
        }

        const item = new Library({
            userId,
            gameId
        });

        await item.save();
        res.status(201).json({ message: "✅ Juego agregado a tu biblioteca ✔️", item });
    } 
    catch (error) {
        res.status(500).json({ message: "Error del servidor ⛔", error: error.message });
    }
}