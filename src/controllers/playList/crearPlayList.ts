import { Play_list } from "../../entities/play_list";
import { AppDataSource } from "../../db";
import { Request, Response } from "express";

export const crearPlayList = async (req: Request, res: Response) => {
    try {
        const { enlace_spotify, enlace_applemusic, nombre_playlist, tipo } = req.body;

        // Verificar si ya existe una playlist con el mismo nombre
        const existingPlaylist = await AppDataSource.getRepository(Play_list).findOne(
            { where: {
                nombre_playlist
            } }
        );

        if (existingPlaylist) {
            return res.status(400).json({ error: "Ya hay un play list registrado con ese nombre." });
        }

        // Verificar que todos los campos requeridos estén presentes
        if (!enlace_applemusic || !enlace_spotify || !nombre_playlist || !tipo) {
            return res.status(400).json({ error: "Todos los campos son requeridos." });
        }

        // Crear una nueva instancia de Play_list y asignar los valores
        const newPlaylist = new Play_list();
        newPlaylist.enlace_applemusic = enlace_applemusic;
        newPlaylist.enlace_spotify = enlace_spotify;
        newPlaylist.nombre_playlist = nombre_playlist;
        newPlaylist.tipo = tipo;

        // Guardar la nueva playlist en la base de datos
        await AppDataSource.getRepository(Play_list).save(newPlaylist);

        res.status(200).json({ message: "Se guardó correctamente la nueva play list" });
    } catch (error) {
        console.error('Error al crear la playlist:', error);
        res.status(500).json({ message: "Error interno al crear el play list" });
    }
};
