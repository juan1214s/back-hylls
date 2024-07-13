import { Request, Response } from "express";
import { Canciones_artista } from "../../entities/canciones_artista";
import { AppDataSource } from "../../db";

export const obtenerCancionId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verificar si el ID cancion fue proporcionado
        if (!id) {
            return res.status(400).json({ error: "ID de la cancion es requerido." });
        }

        // Buscar el album por ID, incluyendo la relaciones
        const cancion = await AppDataSource.getRepository(Canciones_artista).findOne({
            where: { Id_cancion: Number(id) },
            relations: ["artista_album"],
        });

        // Verificar si la cancion fue encontrada
        if (!cancion) {
            return res.status(404).json({ error: "Cancion no encontrada." });
        }

        // Devolver la cancion encontrada
        res.status(200).json(cancion);
    } catch (error) {
        console.error("Error al obtener la cancion:", error);
        res.status(500).json({ error: "Error interno al intentar obtener la cancion." });
    }
};
