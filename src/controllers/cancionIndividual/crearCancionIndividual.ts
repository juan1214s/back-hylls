import { AppDataSource } from "../../db";
import { Cancion } from "../../entities/cancion";
import { Request, Response } from "express";

export const cancionIndividual = async (req: Request, res: Response)=>{
    try {
        const { cancionIndividual } = req.body;

        if (!cancionIndividual) {
            return res.status(404).json({error: "Campo vacio, ingresa un nombre."});
        }

        const cancionExiste = await AppDataSource.getRepository(Cancion).findOne(
            {
                where: {
                    cancion: cancionIndividual
                }
            }
        )

        if (cancionExiste) {
            return res.status(404).json({error: "Ya se encuentra una cancion registrada con ese nombre."})
        }

        const cancionData = new Cancion();
        cancionData.cancion = cancionIndividual;

        await AppDataSource.getRepository(Cancion).save(cancionData);

        res.status(200).json({message: "Se registro correctamente la cancion."})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno al crear la cancion."});
    }
}
