import { AppDataSource } from "../../db";
import { Usuarios } from "../../entities/usuarios";
import { Request, Response } from "express";

export const obtenerUsuarioId = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({message: "ID de usuario es requerido."});
        }

        const usuario = await AppDataSource.getRepository(Usuarios).findOne(
            {
                where: {Id_usuario: Number(id)}
            }
        )

        if (!usuario) {
            return res.status(404).json({error: "Usuario no encontrado."});
        }

        res.status(200).json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno al obtener el usuario."});
    }
}