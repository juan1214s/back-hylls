import { Usuarios } from "../../entities/usuarios";
import { Request, Response } from "express";
import { AppDataSource } from "../../db";

export const obtenerUsuarios = async (req: Request, res: Response)=>{
    try {
        const usuario = await AppDataSource.getRepository(Usuarios).find();

        res.status(200).json(usuario)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno al obtener el usuario"});
    }
}