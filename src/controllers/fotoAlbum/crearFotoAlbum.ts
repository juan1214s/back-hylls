import FormData from 'form-data';
import axios from "axios";
import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Album_artista } from '../../entities/album_artista';
import { FotoAlbum } from '../../entities/foto_album';
import * as dotenv from "dotenv"

dotenv.config();

interface UploadedFile {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: (path: string, callback: (err: any) => void) => void;
}

// Función para subir una imagen a Imgur y mostrar el ID por consola
const subirImagen = async (archivo: UploadedFile): Promise<{ url: string, id_imgur: string }> => {
  // Crear un FormData y agregar la imagen
  const form = new FormData();
  form.append('image', archivo.data, { filename: archivo.name });

  // Enviar la imagen a Imgur
  const response = await axios.post('https://api.imgur.com/3/image', form, {
    headers: {
      'Authorization': `Client-ID ${process.env.CLIENT_ID}`,
      ...form.getHeaders()
    }
  });

  // Mostrar el ID de la imagen por consola
  const imgurData = response.data.data;
  console.log('ID de la imagen subida:', imgurData.id);

  // Devolver la URL y el ID de la imagen subida desde la respuesta de Imgur
  return { url: imgurData.link, id_imgur: imgurData.id };
};

export const crearFotoAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({message: "ID del album es requerido."});
    }

    const albumExiste = await AppDataSource.getRepository(Album_artista).findOne({ where: { Id_album: Number(id) } });

    if (!albumExiste) {
        return res.status(404).json({ error: "El album no fue encontrado." });
    }

    // Verificar que se hayan enviado los archivos requeridos
    if (!req.files || !req.files.fotoAlbum) {
      return res.status(400).json({ error: "Se requieren la fotografia." });
    }

    // Desestructurar los archivos de la solicitud
    const { fotoAlbum } = req.files as { [fieldname: string]: UploadedFile };

    // Subir las imágenes a Imgur secuencialmente y obtener sus URLs y IDs
    const { url: fotoAlbumUrl, id_imgur: fotoImgurId } = await subirImagen(fotoAlbum);

    // Crear el objeto foto con los datos de la imagen subida
    const fotoData = new FotoAlbum();
    fotoData.foto = fotoAlbumUrl;
    fotoData.id_imgur = fotoImgurId;
    fotoData.albumArtista = albumExiste;

    // Guardar la fotografia en la base de datos
    await AppDataSource.getRepository(FotoAlbum).save(fotoData);

    // Responder con el banner creado
    res.status(200).json({ message: "La fotografia se creo correctamente."});
  } catch (error) {
    console.error(`Error al crear la fotografia: ${error}`);
    res.status(500).json({ error: "Error interno al crear la fotografia." });
  }
};
