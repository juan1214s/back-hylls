import { Request, Response } from "express";
import { Datos_de_contacto } from "../../entities/datos_contacto";
import { AppDataSource } from "./../../db";

export const crearContacto = async (req: Request, res: Response) => {
  try {
    const { asunto, nombre, email, contenido, spam } = req.body;   

    // Validar que todos los campos requeridos están presentes
    if (!nombre || !asunto || !email || !contenido || !spam ) {
      return res.status(400).json({ error: "Todos los campos son requeridos." });
    }
   
    // Crear una instancia de la tabla de datos de contacto
    const dataContacto = new Datos_de_contacto();
    dataContacto.nombre = nombre;
    dataContacto.email = email;
    dataContacto.contenido = contenido;
    dataContacto.asunto = asunto;
    dataContacto.spam = spam;

    // Guardar los datos en la base de datos
    await AppDataSource.getRepository(Datos_de_contacto).save(dataContacto);

    console.log("Artista creado correctamente");

    // Enviar respuesta JSON
    res.status(200).json({ message: "Se guardaron correctamente los datos." });
  } catch (error) {
    console.error("Error al guardar la informacion:", error);

    // Manejar errores específicos de TypeORM u otros errores internos
    res.status(500).json({ error: "Error interno al guardar los datos" });
  }
};
