import { Request, Response } from "express";
import { Artista } from "../../entities/artista";
import { AppDataSource } from "../../db";

export const actualizarArtista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, biografia, facebook, twitter, instagram, youtube } = req.body;

        // Buscar el artista por su ID
        const artista = await AppDataSource.getRepository(Artista).findOne({ where: { Id_artista: Number(id) } });

        if (!artista) {
            return res.status(404).json({ error: 'Artista no encontrado.' });
        }

        // Actualizar los campos si existen en el body y no son undefined o vacíos
        artista.nombre = nombre || artista.nombre;
        artista.biografia = biografia || artista.biografia;
        artista.facebook = facebook || artista.facebook;
        artista.twitter = twitter || artista.twitter;
        artista.instagram = instagram || artista.instagram;
        artista.youtube = youtube || artista.youtube;

        // Guardar la información actualizada del artista en la base de datos
        await AppDataSource.getRepository(Artista).save(artista);

        // Responder con el mensaje de éxito y el artista actualizado
        res.status(200).json({ message: 'Artista actualizado correctamente', artista });
    } catch (error) {
        console.error('Error al actualizar el artista:', error);
        res.status(500).json({ error: 'Error interno al actualizar el artista' });
    }
};
