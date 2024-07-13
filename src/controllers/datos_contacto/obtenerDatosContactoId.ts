import { Request, Response } from "express";
import { Datos_de_contacto } from "../../entities/datos_contacto";
import { AppDataSource } from "../../db";

export const obtenerContactoId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verificar si el ID existe
        if (!id) {
            return res.status(400).json({ error: "ID de contacto es requerido." });
        }

        // Buscar el contacto por ID
        const dataContacto = await AppDataSource.getRepository(Datos_de_contacto).findOne({
            where: { Id_contacto: Number(id) }
        });

        // Verificar si el contacto fue encontrado
        if (!dataContacto) {
            return res.status(404).json({ error: "Contacto no encontrado." });
        }

        // Devolver el contacto encontrado
        res.status(200).json(dataContacto);
    } catch (error) {
        console.error("Error al obtener el contacto:", error);
        res.status(500).json({ error: "Error interno al intentar obtener el contacto." });
    }
};
