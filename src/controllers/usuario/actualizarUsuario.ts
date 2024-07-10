import { Request, Response } from "express";
import { Usuarios } from "../../entities/usuarios";
import { AppDataSource } from "../../db";

export const actualizarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rol, password, usuario, nombre } = req.body;

        // Buscar el usuario por su Id
        const usuarioExiste = await AppDataSource.getRepository(Usuarios).findOne({
            where: { Id_usuario: Number(id) }
        });

        if (!usuarioExiste) {
            return res.status(404).json({ error: "Play list no encontrada" });
        }

        // Actualizar los campos si existen en el body y no son undefined o vacíos
        if (rol !== undefined && rol.trim() !== "") {
            usuarioExiste.rol = rol;
        }

        if (password !== undefined && password.trim() !== "") {
            usuarioExiste.password = password;
        }

        if (usuario !== undefined && usuario.trim() !== "") {
            usuarioExiste.usuario = usuario;
        }

        if (nombre !== undefined && nombre.trim() !== "") {
            usuarioExiste.nombre = nombre;
        }

        // Guardar el usuario actualizado en la base de datos
        await AppDataSource.getRepository(Usuarios).save(usuarioExiste);

        // Respondemos con el usuario actualizado
        res.status(200).json(usuarioExiste);
    } catch (error) {
        console.error(`Error al intentar actualizar el usuario: ${error}`);
        res.status(500).json({ error: "Error al intentar actualizar el usuario" });
    }
};
