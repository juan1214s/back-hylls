import { Request, Response } from "express";
import { Artista } from "../../entities/artista";
import { AppDataSource } from "./../../db";

export const crearArtista = async (req: Request, res: Response) => {
  try {
    const { nombre, biografia, facebook, twitter, instagram, youtube } = req.body;

    // Verificar si el artista ya existe
    const artistaExistente = await AppDataSource.getRepository(Artista).findOne({ where: { nombre } });

    if (artistaExistente) {
        return res.status(400).json({ error: "El artista ya existe." });
    }

    // Validar que todos los campos requeridos están presentes
    if (!nombre || !biografia || !facebook || !twitter || !instagram || !youtube) {
      return res.status(400).json({ error: "Todos los campos son requeridos." });
    }
   
    // Crear una instancia de Artista y asignar valores
    const artista = new Artista();
    artista.nombre = nombre;
    artista.biografia = biografia;
    artista.facebook = facebook;
    artista.twitter = twitter;
    artista.instagram = instagram;
    artista.youtube = youtube;


    // Obtener el repositorio de Artista desde el DataSource
    const artistaRepository = AppDataSource.getRepository(Artista);

    // Guardar el artista en la base de datos
    await artistaRepository.save(artista);

    console.log("Artista creado correctamente");

    // Enviar respuesta JSON con el artista creado
    res.status(200).json({ message: "Artista creado correctamente" });
  } catch (error) {
    console.error("Error al crear el artista:", error);

    // Manejar errores específicos de TypeORM u otros errores internos
    res.status(500).json({ error: "Error interno al crear el artista" });
  }
};
