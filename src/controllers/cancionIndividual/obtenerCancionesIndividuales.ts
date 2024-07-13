import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { Cancion } from "../../entities/cancion";

export const obtenerCancionesIndividuales = async (req: Request, res: Response) => {
    try {
        // Obtener todas las canciones
        const canciones = await AppDataSource.getRepository(Cancion).find();

        res.status(200).json( canciones );
    } catch (error) {
        console.error("Error al obtener las canciones:", error);
        res.status(500).json({ error: "Error interno al intentar obtener las canciones." });
    }
};
