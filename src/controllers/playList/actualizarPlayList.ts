import { Request, Response } from "express";
import { Play_list } from "../../entities/play_list";
import { AppDataSource } from "../../db";

export const actualizarPlayList = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { enlace_spotify, enlace_applemusic, nombre_playlist, tipo } = req.body;

        // Buscar la noticia por su Id
        const playlist = await AppDataSource.getRepository(Play_list).findOne({
            where: { Id_playlist: Number(id) }
        });

        if (!playlist) {
            return res.status(404).json({ error: "Play list no encontrada" });
        }

        // Actualizar los campos si existen en el body y no son undefined o vacíos
        if (enlace_applemusic !== undefined && enlace_applemusic.trim() !== "") {
            playlist.enlace_applemusic = enlace_applemusic;
        }

        if (enlace_spotify !== undefined && enlace_applemusic.trim() !== "") {
            playlist.enlace_spotify = enlace_spotify;
        }

        if (nombre_playlist !== undefined && nombre_playlist.trim() !== "") {
            playlist.nombre_playlist = nombre_playlist;
        }

        if (tipo !== undefined && tipo.trim() !== "") {
            playlist.tipo = tipo;
        }

        // Guardar la play list actualizada en la base de datos
        await AppDataSource.getRepository(Play_list).save(playlist);

        // Respondemos con la play list actualizada
        res.status(200).json(playlist);
    } catch (error) {
        console.error(`Error al intentar actualizar el play list: ${error}`);
        res.status(500).json({ error: "Error al intentar actualizar el play list" });
    }
};
