import { Noticia } from "../../entities/noticia";
import { AppDataSource } from "../../db";
import { Request, Response } from "express";

export const crearNoticia = async (req: Request, res: Response) => {
  try {
    const { titulo, descripcion_corta, descripcion_larga, fecha } = req.body;

    // Verificar si la noticia ya existe
    const noticiaExiste = await AppDataSource.getRepository(Noticia).findOne({
      where: { titulo },
    });

    if (noticiaExiste) {
      return res.status(400).json({ error: "La noticia ya existe." });
    }

    // Validar que todos los campos requeridos están presentes
    if (!titulo || !descripcion_corta || !descripcion_larga || !fecha) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }

    // Crear una nueva instancia de Noticia
    const noticia = new Noticia();
    noticia.titulo = titulo;
    noticia.descripcion_corta = descripcion_corta;
    noticia.descripcion_larga = descripcion_larga;
    noticia.fecha = fecha;

    // Obtener el repositorio de Noticia desde el DataSource
    const noticiaRepository = AppDataSource.getRepository(Noticia);

    // Guardar la noticia en la base de datos
    await noticiaRepository.save(noticia);

    console.log("Noticia creada correctamente");

    // Enviar respuesta JSON con la noticia creada
    res.status(200).json({ message: "Noticia creada correctamente"});
  } catch (error) {
    console.error("Error al crear la noticia:", error);

    // Manejar errores específicos de TypeORM u otros errores internos
    res.status(500).json({ error: "Error interno al crear la noticia" });
  }
};
