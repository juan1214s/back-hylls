import { Request, Response } from "express";
import { Cancion } from "../../entities/cancion";
import { AppDataSource } from "../../db";

export const eliminarCancionIndividual = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({message: "ID de la cancion es requerido."});
        }

        // Verificar si la cancion existe
        const cancion = await AppDataSource.getRepository(Cancion).findOne({
             where: { Id_cancion: Number(id) } 
            });

        if (!cancion) {
            return res.status(404).json({ error: "La cancion no fue encontrada." });
        }

        // Eliminar la cancion
        await AppDataSource.getRepository(Cancion).remove(cancion);

        res.status(200).json({ message: "La cancion se elimino correctamente." });
    } catch (error) {
        console.error("Error al eliminar la cancion:", error);
        res.status(500).json({ error: "Error interno al intentar eliminar la cancion." });
    }
};
