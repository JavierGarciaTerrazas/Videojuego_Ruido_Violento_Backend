import Game from "../models/Game.js";

export const createGame = async (req, res) => {
    try{
        const { titulo, genero, plataforma } = req.body;
        if (!titulo || !genero) {
            return res.status(400).json({ message: "⛔ Título y género son requeridos ✖️" });
        }

        const newGame = new Game({ titulo, genero, plataforma });
        await newGame.save(); // agrega el juego a la base de datos
        res.status(201).json({ message: "✅ Juego creado exitosamente ✔️", Juego : newGame });

    } 
    catch (error) {
        res.status(500).json({ message: "❌ Error al crear el juego ✖️", error: error.message });
    }
}

export const getGames = async (req, res) => {
    try {
        const {genere, platform, search} = req.query; // obtener los parámetros de consulta
        let filter = {};   // objeto para almacenar los filtros

        if (genere){
            filter.genere = genere; // agregar filtro de género si se proporciona
        }
        if (platform){
            filter.platform = platform; // agregar filtro de plataforma si se proporciona
        }
        if (search){
            filter.$or = [ // agregar filtro de búsqueda usando $or para buscar en múltiples campos
                { titulo: { $regex: search, $options: 'i' } },
                { genero: { $regex: search, $options: 'i' } },
                { plataforma: { $regex: search, $options: 'i' } }
            ]; // agregar filtro de búsqueda en título, género y plataforma usando regex para coincidencia parcial, $or para buscar en cualquiera de los campos, y $options: 'i' para hacer la búsqueda insensible a mayúsculas y minúsculas
            // regex son expresiones regulares, $options: 'i' hace que la búsqueda no distinga entre mayúsculas y minúsculas 
        }

        const games = await Game.find(filter); // buscar juegos en la base de datos con los filtros aplicados
        res.json(games);
    } 
    catch (error) {
        res.status(500).json({ message: "❌ Error al obtener juegos ✖️", error: error.message });
    }
}

export const deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ message: "⛔ Juego no encontrado ✖️" });
        }

        res.json({ message: "✅ Juego eliminado exitosamente ✔️" + game.titulo });
    } 
    catch (error) {
        res.status(500).json({ message: "❌ Error al eliminar el juego ✖️", error: error.message });
    }
}