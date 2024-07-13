import { Album_artista } from "../../entities/album_artista";
import { AppDataSource } from "../../db";
import { Request, Response } from "express";
import { Artista } from "../../entities/artista";

export const crearAlbum = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        const { nombre_album, fecha_album } = req.body;


        if (!nombre_album || !fecha_album) {
            return res
            .status(400)
            .json({ error: "Todos los campos son requeridos." });
        }

        const albumExiste = await AppDataSource.getRepository(Album_artista).findOne(
            {
                where: {
                    nombre_album: nombre_album
                }
            }
        )

        if (albumExiste) {
            return res.status(400).json({ error: "Ya existe un album registrado con ese nombre." });
        }

        const artistaExiste = await AppDataSource.getRepository(Artista).findOne(
            {
                where: {
                    Id_artista: Number(id)
                }
            }
        )

        if (!artistaExiste) {
            return res.status(404).json({ error: "No se ha podido encontrar el artista." });
        }

        const album = new Album_artista()
        album.nombre_album = nombre_album;
        album.fecha_album = fecha_album;
        album.artista = artistaExiste;

        await AppDataSource.getRepository(Album_artista).save(album);

        res.status(200).json({message: "Se creo correctamente el album."});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno al crear el album."});
    }
}