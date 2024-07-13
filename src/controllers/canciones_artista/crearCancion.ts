import { AppDataSource } from "../../db";
import { Canciones_artista } from "../../entities/canciones_artista";
import { Request, Response } from "express";
import { Album_artista } from "../../entities/album_artista";

export const crearCancion = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        const { cancion } = req.body;

        const albumExiste = await AppDataSource.getRepository(Album_artista).findOne(
            {
                where: {Id_album: Number(id)}
            }
        )

        if (!albumExiste) {
            return res.status(400).json({ error: "El album no existe." });
        }

        const cancionExiste = await AppDataSource.getRepository(Canciones_artista).findOne(
            {
                where: {cancion}
            }
        )

        if (cancionExiste) {
            return res.status(400).json({ error: "Ya hay una cancion registrada con ese nombre." });
        }

        if(!cancion){
            res.status(404).json({error: "Todos los campos son requeridas."})
        }

        const cancionData = new Canciones_artista();
        cancionData.cancion = cancion;
        cancionData.artista_album = albumExiste;

        await AppDataSource.getRepository(Canciones_artista).save(cancionData);

        res.status(200).json({message : "Se creo correctamente la cancion."})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno al intentar crear la cancion."});
    }
}