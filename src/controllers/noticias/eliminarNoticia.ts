import { Request, Response } from "express";
import { Noticia } from "../../entities/noticia";
import { AppDataSource } from "../../db";

export const eliminarNoticia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({message: "ID de la noticia es requerido."});
        }

        // Verificar si la noticia existe
        const noticiaExistente = await AppDataSource.getRepository(Noticia).findOne({ where: { Id_noticia: Number(id) } });

        if (!noticiaExistente) {
            return res.status(404).json({ error: "La noticia no existe." });
        }

        // Eliminar la noticia
        await AppDataSource.getRepository(Noticia).remove(noticiaExistente);

        res.status(200).json({ message: "Noticia eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar la noticia:", error);
        res.status(500).json({ error: "Error interno al intentar eliminar la noticia." });
    }
};