import { Request, Response } from "express";
import { Noticia } from "../../entities/noticia";
import { AppDataSource } from "../../db";

export const obtenerNoticiaId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID de la noticia es requerido." });
        }

        const noticia = await AppDataSource.getRepository(Noticia).findOne({
            where: { Id_noticia: Number(id) },
            relations: ["imagenes"] 
        });

        if (!noticia) {
            return res.status(404).json({ error: 'Noticia no encontrada.' });
        }

        res.status(200).json(noticia);
    } catch (error) {
        console.log(`Error al intentar obtener la noticia: ${error}`);
        res.status(500).json({ error: 'Error al intentar obtener la noticia' });
    }
}

