import { Usuarios } from "../../entities/usuarios";
import { Request, Response } from "express";
import { AppDataSource } from "../../db";

export const eliminarUsuario = async ( req: Request, res: Response)=>{
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID del usuario es requerido." });
        }
        
    const usuario = await AppDataSource.getRepository(Usuarios).findOne(
        {
            where: {Id_usuario: Number(id)}
        }
    );

    if (!usuario) {
      return res.status(404).json({error: "El usuario no existe."});
    }

    await AppDataSource.getRepository(Usuarios).remove(usuario);

    res.status(200).json({message: "Se elimino correctamente."});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno al intenta eliminar el usuario."});
    }

}