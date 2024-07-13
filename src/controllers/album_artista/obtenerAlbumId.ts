import { Request, Response } from "express";
import { Album_artista } from "../../entities/album_artista";
import { AppDataSource } from "../../db";

export const obtenerAlbumId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verificar si el ID del album fue proporcionado
        if (!id) {
            return res.status(400).json({ error: "ID del album es requerido." });
        }

        // Buscar el album por ID, incluyendo la relaciones
        const album = await AppDataSource.getRepository(Album_artista).findOne({
            where: { Id_album: Number(id) },
            relations: ["cancion", "fotoAlbum", "artista"]
        });

        // Verificar si el album fue encontrado
        if (!album) {
            return res.status(404).json({ error: "Album no encontrado." });
        }

        // Devolver el album encontrado
        res.status(200).json(album);
    } catch (error) {
        console.error("Error al obtener el album:", error);
        res.status(500).json({ error: "Error interno al intentar obtener el album." });
    }
};
