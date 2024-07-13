import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { Datos_de_contacto } from "../../entities/datos_contacto";

export const obtenerDataContacto = async (req: Request, res: Response) => {
    try {
        // Obtiene todos los datos de contacto
        const dataContacto = await AppDataSource.getRepository(Datos_de_contacto).find();

        res.status(200).json( dataContacto );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno al intentar obtener los datos." });
    }
};
