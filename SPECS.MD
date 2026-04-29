🎮 Proyecto: API de Biblioteca de Videojuegos
🧠 Objetivo

Construir una API donde múltiples usuarios puedan:

Registrar videojuegos
Organizar su biblioteca
Marcar progreso / estado
No ver datos de otros usuarios

diseño de rutas

GET    /games        => User    obtener todos los juegos  
GET    /games/:id    => User    obtener un juego  
POST   /games        => admin   crear un juego           **
PATCH  /games        => admin   modificar un juego
DELETE /games        => admin   borrar un juego

Listar Juegos
aplicar filtros desde query params
crear relacion usuario => juegos(library)
mostrar datos propios del ususario