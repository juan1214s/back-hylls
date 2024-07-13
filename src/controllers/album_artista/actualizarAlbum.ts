import { Request, Response } from "express";
import { Album_artista } from "../../entities/album_artista";
import { AppDataSource } from "../../db";

export const actualizarAlbum = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre_album, fecha_album } = req.body;

        // Buscar el album por su ID
        const album = await AppDataSource.getRepository(Album_artista).findOne({ where: { Id_album: Number(id) } });

        if (!album) {
            return res.status(404).json({ error: 'Album no encontrado.' });
        }

        // Actualizar los campos si existen en el body y no son undefined o vacíos
       album.nombre_album = nombre_album || album.nombre_album;
       album.fecha_album = fecha_album || album.fecha_album;

        // Guardar la información actualizada del album en la base de datos
        await AppDataSource.getRepository(Album_artista).save(album);

        // Responder con el mensaje de éxito y el album actualizado
        res.status(200).json({ message: 'Album actualizado correctamente', album });
    } catch (error) {
        console.error('Error al actualizar el album:', error);
        res.status(500).json({ error: 'Error interno al actualizar el album' });
    }
};
