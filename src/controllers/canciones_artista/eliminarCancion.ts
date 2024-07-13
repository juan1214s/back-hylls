import { Request, Response } from "express";
import { Canciones_artista } from "../../entities/canciones_artista";
import { AppDataSource } from "../../db";

export const eliminarCancion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({message: "ID de la cancion es requerido."});
        }

        // Verificar si la cancion existe
        const cancion = await AppDataSource.getRepository(Canciones_artista).findOne({
             where: { Id_cancion: Number(id) } 
            });

        if (!cancion) {
            return res.status(404).json({ error: "La cancion no fue encontrada." });
        }

        // Eliminar la cancion
        await AppDataSource.getRepository(Canciones_artista).remove(cancion);

        res.status(200).json({ message: "La cancion se elimino correctamente." });
    } catch (error) {
        console.error("Error al eliminar la cancion:", error);
        res.status(500).json({ error: "Error interno al intentar eliminar la cancion." });
    }
};
