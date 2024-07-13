import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { Usuarios } from "../../entities/usuarios";
import { AppDataSource } from "../../db";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "HyllsProyec2024";

export const login = async (req: Request, res: Response) => {
    try {
        const { usuario, password } = req.body;

        const usuarioExiste = await AppDataSource.getRepository(Usuarios).findOne({
            where: { usuario }
        });

        if (!usuarioExiste) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
        }

        const passwordValido = await bcrypt.compare(password, usuarioExiste.password);

        if (!passwordValido) {
            return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
        }

        // Construye el payload del token JWT
        const payload = {
            sub: usuarioExiste.Id_usuario,
            usuario: usuarioExiste.usuario,
            nombre: usuarioExiste.nombre
        };

        // Genera el token JWT con un tiempo de expiración
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

        // Devuelve el token JWT al cliente
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor." });
    }
};
