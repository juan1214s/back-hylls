import FormData from 'form-data';
import axios from "axios";
import { ImagenPlaylist } from '../../entities/imagenPlayList';
import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Play_list } from '../../entities/play_list';

 // Reemplaza con tu CLIENT_ID de Imgur
const CLIENT_ID = '1088ff90a166b78';

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
      'Authorization': `Client-ID ${CLIENT_ID}`,
      ...form.getHeaders()
    }
  });

  // Mostrar el ID de la imagen por consola
  const imgurData = response.data.data;
  console.log('ID de la imagen subida:', imgurData.id);

  // Devolver la URL y el ID de la imagen subida desde la respuesta de Imgur
  return { url: imgurData.link, id_imgur: imgurData.id };
};

export const crearImagenPlayList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({message: "ID de la play list es requerida."});
    }

    const playList = await AppDataSource.getRepository(Play_list).findOne({ where: { Id_playlist: Number(id) } });

    if (!playList) {
        return res.status(404).json({ error: "La play list no fue encontrada." });
    }

    // Verificar que se hayan enviado los archivos requeridos
    if (!req.files || !req.files.fotoPlayList) {
      return res.status(400).json({ error: "Se requieren la fotografia." });
    }

    // Desestructurar los archivos de la solicitud asi es como se mando desde el front
    const { fotoPlayList } = req.files as { [fieldname: string]: UploadedFile };

    // Subir las imágenes a Imgur secuencialmente y obtener sus URLs y IDs
    const { url: fotoPlayListUrl, id_imgur: imagenImgurId } = await subirImagen(fotoPlayList);

    // Crear el objeto foto con los datos de la foto subida
    const fotoPlayListaData = new ImagenPlaylist();
    fotoPlayListaData.url = fotoPlayListUrl;
    fotoPlayListaData.id_imgur = imagenImgurId;
    fotoPlayListaData.playlist = playList;

    // Guardar la fotografia en la base de datos
    await AppDataSource.getRepository(ImagenPlaylist).save(fotoPlayListaData);

    // Responder con la imagen
    res.status(200).json({ message: "La fotografia se creo correctamente."});
  } catch (error) {
    console.error(`Error al crear la fotografia: ${error}`);
    res.status(500).json({ error: "Error interno al crear la fotografia." });
  }
};
