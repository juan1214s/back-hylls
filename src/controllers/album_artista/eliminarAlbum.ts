import { Request, Response } from "express";
import { Album_artista } from "../../entities/album_artista";
import { AppDataSource } from "../../db";

export const eliminarAlbum = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({message: "ID del album es requerido."});
        }

        // Verificar si el album existe
        const albumExiste = await AppDataSource.getRepository(Album_artista).findOne({ where: { Id_album: Number(id) } });

        if (!albumExiste) {
            return res.status(404).json({ error: "El album no fue encontrado." });
        }

        // Eliminar el album
        await AppDataSource.getRepository(Album_artista).remove(albumExiste);

        res.status(200).json({ message: "Album eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar el album:", error);
        res.status(500).json({ error: "Error interno al intentar eliminar el album." });
    }
};
