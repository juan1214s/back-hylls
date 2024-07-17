import { FotoAlbum } from "../../entities/foto_album";
import { AppDataSource } from "../../db";
import { Request, Response } from "express";
import axios from 'axios';
import * as dotenv from "dotenv"

dotenv.config();

export const eliminarFotoAlbum = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ message: "Id de la fotografia es requerido." });
        }

        const fotoAlbum = await AppDataSource.getRepository(FotoAlbum).findOne({
            where: {
                Id_foto: Number(id)
            }
        });

        if (!fotoAlbum) {
            return res.status(400).json({ error: "La fotografia no existe." });
        }

        // Extrae el id_imgur que está en la base de datos
        const { id_imgur } = fotoAlbum;

        try {
            // Eliminar la imagen de Imgur
            const imgurResponse = await axios.delete(`https://api.imgur.com/3/image/${id_imgur}`, {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            });

            if (imgurResponse.status === 200 && imgurResponse.data.success) {
                console.log(`Imagen de Imgur con ID ${id_imgur} eliminada correctamente.`);
            } else {
                console.error(`Error al eliminar la imagen de Imgur con ID ${id_imgur}. Respuesta:`, imgurResponse.data);
                return res.status(500).json({ error: "Error al intentar eliminar la imagen de Imgur." });
            }
        } catch (imgurError) {
            console.error(`Error en la solicitud a Imgur para eliminar la imagen con ID ${id_imgur}`);
            return res.status(500).json({ error: "Error en la solicitud a Imgur para eliminar la imagen." });
        }

        // Eliminar la fotografia de la base de datos
        await AppDataSource.getRepository(FotoAlbum).remove(fotoAlbum);
        res.status(200).json({ message: "Se ha eliminado correctamente la fotografia." });
    } catch (error) {
        console.error(`Error interno al intentar eliminar la fotografia con ID ${req.params.id}:`, error);
        res.status(500).json({ error: "Error interno al intentar eliminar la fotografia." });
    }
};
