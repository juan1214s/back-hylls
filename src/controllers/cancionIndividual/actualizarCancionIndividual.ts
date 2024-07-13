import { Request, Response } from "express";
import { Cancion } from "../../entities/cancion";
import { AppDataSource } from "../../db";

export const actualizarCancionIndividual = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { cancionIndividual } = req.body;

        // Buscar el album por su ID
        const existeCancion = await AppDataSource.getRepository(Cancion).findOne({ 
            where: { Id_cancion: Number(id) } 
        });

        if (!existeCancion) {
            return res.status(404).json({ error: 'La cancion no se ha encontrado.' });
        }

        // Actualizar los campos si existen en el body y no son undefined o vacíos
        existeCancion.cancion = cancionIndividual || existeCancion.cancion

        // Guardar la información actualizada de la cancion en la base de datos
        await AppDataSource.getRepository(Cancion).save(existeCancion);

        // Responder con el mensaje de éxito 
        res.status(200).json({ message: 'Cancion actualizada correctamente.'});
    } catch (error) {
        console.error('Error al actualizar la cancion:', error);
        res.status(500).json({ error: 'Error interno al actualizar la cancion' });
    }
};
