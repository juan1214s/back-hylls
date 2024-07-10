import { Request, Response } from "express";
import { Noticia } from "../../entities/noticia";
import { AppDataSource } from "../../db";

export const actualizarNoticia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion_corta, descripcion_larga, fecha } = req.body;

        // Buscar la noticia por su Id
        const noticia = await AppDataSource.getRepository(Noticia).findOne({
            where: { Id_noticia: Number(id) }
        });

        if (!noticia) {
            return res.status(404).json({ error: "Noticia no encontrada" });
        }

        // Actualizar los campos si existen en el body y no son undefined o vacíos
        if (titulo !== undefined && titulo.trim() !== "") {
            noticia.titulo = titulo;
        }
        if (descripcion_corta !== undefined && descripcion_corta.trim() !== "") {
            noticia.descripcion_corta = descripcion_corta;
        }
        if (descripcion_larga !== undefined && descripcion_larga.trim() !== "") {
            noticia.descripcion_larga = descripcion_larga;
        }
        if (fecha !== undefined) {
            noticia.fecha = new Date(fecha);
        }

        // Guardar la noticia actualizada en la base de datos
        await AppDataSource.getRepository(Noticia).save(noticia);

        // Respondemos con la noticia actualizada
        res.status(200).json(noticia);
    } catch (error) {
        console.error(`Error al intentar actualizar la noticia: ${error}`);
        res.status(500).json({ error: "Error al intentar actualizar la noticia" });
    }
};
