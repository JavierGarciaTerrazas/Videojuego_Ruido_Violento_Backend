import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    try {
        // Obtener el token del encabezado de autorización
        const authHeder = req.headers.authorization; 

        // Verificar que el token esté presente
        if (!authHeder) {
            return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
        } 
        // El token se espera en el formato "Bearer <token>"
        const token = authHeder.split(' ')[1]; // el token viene despues de Bearer ej [Bearer 00324-340-=234234]
        
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar la información del usuario decodificada al objeto de solicitud
        req.user = decoded; // decoded contiene la información del usuario, como userId y role
        next(); // Continuar con la siguiente función de middleware o ruta
    } 
    catch (error) {
        return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
}