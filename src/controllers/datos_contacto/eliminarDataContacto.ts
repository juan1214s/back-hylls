import { Request, Response } from "express";
import { Datos_de_contacto } from "../../entities/datos_contacto";
import { AppDataSource } from "../../db";

export const eliminarContacto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({message: "ID del contacto es requerido."});
        }

        // Verificar si existe el contacto
        const contacto = await AppDataSource.getRepository(Datos_de_contacto).findOne({
             where: { Id_contacto: Number(id) } 
            });

        if (!contacto) {
            return res.status(404).json({ error: "El contacto no fue encontrado." });
        }

        // Eliminar el contacto
        await AppDataSource.getRepository(Datos_de_contacto).remove(contacto);

        res.status(200).json({ message: "Se elimino correctamente el contacto." });
    } catch (error) {
        console.error("Error al eliminar el contacto:", error);
        res.status(500).json({ error: "Error interno al intentar el contacto." });
    }
};
