export const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({ message: '⛔ Acceso denegado' }); //si el rol del usuario no está incluido en los roles permitidos, se devuelve un error 403 (Forbidden)  
    }
        next(); //si el rol del usuario está incluido en los roles permitidos, se llama a next() para continuar con la ejecución de la ruta protegida
    }
}