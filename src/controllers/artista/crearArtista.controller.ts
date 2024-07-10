import { Request, Response } from "express";
import { Artista } from "../../entities/artista";
import { AppDataSource } from "./../../db";
import FormData from 'form-data';
import axios from "axios";

// const CLIENT_ID = '1088ff90a166b78'; // Reemplaza con tu CLIENT_ID de Imgur

// interface UploadedFile {
//   name: string;
//   data: Buffer;
//   size: number;
//   encoding: string;
//   tempFilePath: string;
//   truncated: boolean;
//   mimetype: string;
//   md5: string;
//   mv: (path: string, callback: (err: any) => void) => void;
// }

// // Función para subir una imagen a Imgur y mostrar el ID por consola
// const subirImagen = async (archivo: UploadedFile): Promise<string> => {
//   // Crear un FormData y agregar la imagen
//   const form = new FormData();
//   form.append('image', archivo.data, { filename: archivo.name });

//   // Enviar la imagen a Imgur
//   const response = await axios.post('https://api.imgur.com/3/image', form, {
//     headers: {
//       'Authorization': `Client-ID ${CLIENT_ID}`,
//       ...form.getHeaders()
//     }
//   });

//   // Mostrar el ID de la imagen por consola
//   console.log('ID de la imagen subida:', response.data.data.id);

//   // Devolver la URL de la imagen subida desde la respuesta de Imgur
//   return response.data.data.link;
// };

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

    // // Verificar que se hayan enviado los archivos requeridos
    // if (!req.files || !req.files.foto || !req.files.banner || !req.files.bannerMobil) {
    //   return res.status(400).json({ error: "Se requieren las imágenes de foto, banner y bannerMobil." });
    // }

    // // Desestructurar los archivos de la solicitud
    // const { foto, banner, bannerMobil } = req.files as { [fieldname: string]: UploadedFile };

    // // Subir las imágenes a Imgur secuencialmente y obtener sus URLs
    // const fotoUrl = await subirImagen(foto);
    // const bannerUrl = await subirImagen(banner);
    // const bannerMobilUrl = await subirImagen(bannerMobil);

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
