import { Request, Response } from "express";
import { Artista } from "../../entities/artista";
import { AppDataSource } from "../../db";

export const obtenerArtistaPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verificar si el ID del artista fue proporcionado
        if (!id) {
            return res.status(400).json({ error: "ID del artista es requerido." });
        }

        // Buscar el artista por ID, incluyendo la relación 'banner'
        const artista = await AppDataSource.getRepository(Artista).findOne({
            where: { Id_artista: Number(id) },
            relations: ["banner", "foto", "bannerMobil"]
        });

        // Verificar si el artista fue encontrado
        if (!artista) {
            return res.status(404).json({ error: "Artista no encontrado." });
        }

        // Devolver el artista encontrado
        res.status(200).json(artista);
    } catch (error) {
        console.error("Error al obtener el artista:", error);
        res.status(500).json({ error: "Error interno al intentar obtener el artista." });
    }
};
