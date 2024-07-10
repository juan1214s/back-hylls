import { Request, Response } from "express";
import { Play_list } from "../../entities/play_list";
import { AppDataSource } from "../../db";

export const obtenerPlayLis = async (req: Request, res: Response)=>{
    try {

        const playList = await AppDataSource.getRepository(Play_list).find({
            relations: ['imagenes']
        });

        res.status(200).json(playList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno al obtener las play list"});
    }
}