import Game from "../models/Game.js";

export const saveGameSceneStats = async (req, res) => {
    try {
        console.log('TRACE: POST /stats received');
        console.log('TRACE: request body:', JSON.stringify(req.body));
        const { score_guerrero, playerHealth, score_enemigo, enemyHealth } = req.body;

        if (score_guerrero == null || playerHealth == null || score_enemigo == null || enemyHealth == null) {
            return res.status(400).json({ message: "⛔ Todos los valores de estadística son requeridos ✖️" });
        }

        const newStats = new Game({
            titulo: 'RUIDO VIOLENTO',
            //genero: 'ACCION',
            //plataforma: 'PC',
            score_guerrero,
            playerHealth,
            score_enemigo,
            enemyHealth
        });

        console.log('TRACE: saving to DB...');
        await newStats.save();
        console.log('TRACE: save successful, id=', newStats._id);
        res.status(201).json({ message: "✅ Estadísticas guardadas correctamente ✔️", stats: newStats });
    } catch (error) {
        console.error('ERROR: /stats failed:', error);
        res.status(500).json({ message: "❌ Error al guardar las estadísticas ✖️", error: error.message });
    }
}


export const getGameSceneStats = async (req, res) => {
    try {
        const stats = await Game.find().sort({ createdAt: -1 }).limit(10); // Obtener las últimas 10 estadísticas
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: "❌ Error al obtener las estadísticas ✖️", error: error.message });
    }
}