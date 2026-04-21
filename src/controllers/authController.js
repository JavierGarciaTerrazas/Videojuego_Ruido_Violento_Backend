import bcrypt from 'bcrypt';
import  User  from '../models/User.js';
import jwt from 'jsonwebtoken';


// controlador para el registro de usuarios
export const registro =async (req, res) => {
    try {
        const { email, password } = req.body;

        //validar que contenga email y password el body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y password son requeridos' });
        }
        //validar que el email no exista en la base de datos
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }
        //encriptar el password / hash del password
        const passwordEncriptado = await bcrypt.hash(password, 7);
        const user = new User({ 
            email, 
            password: passwordEncriptado 
        });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente, todo bien' });
    } 
    catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}

// controlador para el login de usuarios

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validar que no esten vacios el email y password
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y password son requeridos ✖️' });
        }

        //validar que el email exista en la base de datos
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: 'El usuario no está registrado ⛔' });
        }

        // comparar la contraseña ingresada con la contraseña encriptada en la base de datos
        const contraseñaValida = await bcrypt.compare(password, user.password);
        if (!contraseñaValida) {
            return res.status(400).json({ message: 'Contraseña incorrecta ⛔' });
        }

        // generar un token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, message: 'Login exitoso ✅' });
    } 
    catch (error) {
        res.status(500).json({ message: 'Algo salio mal ✖️' });
    }
} 