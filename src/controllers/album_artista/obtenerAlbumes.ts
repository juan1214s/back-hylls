import { Request, Response } from "express";
import { Album_artista } from "../../entities/album_artista";
import { AppDataSource } from "../../db";

export const obtenerAlbumes = async (req: Request, res: Response) => {
    try {
        // Obtener todos los artistas
        const albumes = await AppDataSource.getRepository(Album_artista).find({
            relations: ["cancion", "fotoAlbum", "artista"]
        });

        res.status(200).json( albumes );
    } catch (error) {
        console.error("Error al obtener los albumes:", error);
        res.status(500).json({ error: "Error interno al intentar obtener los albumes." });
    }
};
