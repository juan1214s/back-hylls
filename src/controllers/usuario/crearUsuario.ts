import { Usuarios } from "../../entities/usuarios";
import { AppDataSource } from "../../db";
import { Request, Response } from "express";

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { rol, password, usuario, nombre } = req.body;
    
    // Verificar si la noticia ya existe
    const usuarioExiste = await AppDataSource.getRepository(Usuarios).findOne({
      where: { nombre },
    });

    if (usuarioExiste) {
      return res.status(400).json({ error: "La noticia ya existe." });
    }

    // Validar que todos los campos requeridos están presentes
    if (!rol || !password || !nombre || !usuario) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }

    // Crear una nueva instancia de Noticia
    const usuarioNew = new Usuarios();
    usuarioNew.nombre = nombre;
    usuarioNew.usuario = usuario;
    usuarioNew.password = password;
    usuarioNew.rol = rol;

    // Obtener el repositorio de Noticia desde el DataSource
    const usuarioRepository = AppDataSource.getRepository(Usuarios);

    // Guardar la noticia en la base de datos
    await usuarioRepository.save(usuarioNew);

    // Enviar respuesta JSON con la noticia creada
    res.status(200).json({ message: "Usuario creado correctamente"});
  } catch (error) {
    console.error("Error al crear el usuario:", error);

    // Manejar errores específicos de TypeORM u otros errores internos
    res.status(500).json({ error: "Error interno al crear el usuario" });
  }
};
