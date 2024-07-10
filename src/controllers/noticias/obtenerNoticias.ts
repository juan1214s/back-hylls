import { Request, Response } from "express";
import { Noticia } from "../../entities/noticia";
import { AppDataSource } from "../../db";

export const obtenerNoticias = async (req: Request, res: Response)=>{
    try {

        const noticia = await AppDataSource.getRepository(Noticia).find({
            relations: ['imagenes']
        });

        res.status(200).json(noticia);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno al obtener las noticias"});
    }
}