import bcrypt from 'bcrypt';
import  User  from '../models/User.js';

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