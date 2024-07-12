import { BannerMobil } from "../../entities/bannerMobil";
import { AppDataSource } from "../../db";
import { Request, Response } from "express";
import axios from 'axios';

// Es el token que devuelve Imgur para poder realizar las operaciones
const ACCESS_TOKEN = '6237be3b97d53270329a58313f6a8bb3954f6343';

export const eliminarBannerMobil = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ message: "Id del banner es requerido." });
        }

        const bannerMobil = await AppDataSource.getRepository(BannerMobil).findOne({
            where: {
                Id_bannerMobil: Number(id)
            }
        });

        if (!bannerMobil) {
            return res.status(400).json({ error: "El banner no existe." });
        }

        // Extrae el id_imgur que está en la base de datos
        const { id_imgur } = bannerMobil;

        try {
            // Eliminar la imagen de Imgur
            const imgurResponse = await axios.delete(`https://api.imgur.com/3/image/${id_imgur}`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
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

        // Eliminar el banner de la base de datos
        await AppDataSource.getRepository(BannerMobil).remove(bannerMobil);
        res.status(200).json({ message: "Se ha eliminado correctamente el banner mobil." });
    } catch (error) {
        console.error(`Error interno al intentar eliminar el banner con ID ${req.params.id}:`, error);
        res.status(500).json({ error: "Error interno al intentar eliminar el banner mobil." });
    }
};
