import { Request, Response } from "express";
import { Artista } from "../../entities/artista";
import { AppDataSource } from "../../db";

export const obtenerArtistas = async (req: Request, res: Response) => {
    try {
        // Obtener todos los artistas
        const artistas = await AppDataSource.getRepository(Artista).find({relations: ["banner", "foto", "bannerMobil"]});

        res.status(200).json(artistas);
    } catch (error) {
        console.error("Error al obtener los artistas:", error);
        res.status(500).json({ error: "Error interno al intentar obtener los artistas." });
    }
};
