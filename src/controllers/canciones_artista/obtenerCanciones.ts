import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { Canciones_artista } from "../../entities/canciones_artista";

export const obtenerCanciones = async (req: Request, res: Response) => {
    try {
        // Obtener todas las canciones
        const canciones = await AppDataSource.getRepository(Canciones_artista).find({
            relations: ["artista_album"]
        });

        res.status(200).json( canciones );
    } catch (error) {
        console.error("Error al obtener las canciones:", error);
        res.status(500).json({ error: "Error interno al intentar obtener las canciones." });
    }
};
