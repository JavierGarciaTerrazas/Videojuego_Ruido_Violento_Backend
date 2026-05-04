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

export const getMyLibrary = async (req, res) => {
    try {
        const items = await Library.find({ 
            userId: req.user.id // Obtenemos el ID del usuario autenticado para filtrar su biblioteca
        }).populate("gameId");  //popula el campo gameId para obtener los detalles del juego
                                //populate es una función de Mongoose que permite reemplazar el campo gameId 
                                //con los datos completos del juego asociado, en lugar de solo su ID. 
                                //Esto facilita el acceso a la información del juego directamente 
                                //desde la biblioteca del usuario.
        res.status(200).json(items);
        console.log(items);

    } catch (error) {
        res.status(500).json({ message: "Error del servidor ⛔", error: error.message });
    }
}