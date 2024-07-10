import { Request, Response } from "express";
import { Artista } from "../../entities/artista";
import { AppDataSource } from "../../db";

export const eliminarArtista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({message: "ID del artista es requerido."});
        }

        // Verificar si el artista existe
        const artistaExistente = await AppDataSource.getRepository(Artista).findOne({ where: { Id_artista: Number(id) } });

        if (!artistaExistente) {
            return res.status(404).json({ error: "El artista no fue encontrado." });
        }

        // Eliminar el artista
        await AppDataSource.getRepository(Artista).remove(artistaExistente);

        res.status(200).json({ message: "Artista eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar el artista:", error);
        res.status(500).json({ error: "Error interno al intentar eliminar el artista." });
    }
};
