import FormData from 'form-data';
import axios from "axios";
import { BannerMobil } from '../../entities/bannerMobil';
import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Artista } from '../../entities/artista';
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

export const crearBannerMobil = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({message: "ID del artista es requerido."});
    }

    const artistaExistente = await AppDataSource.getRepository(Artista).findOne({ where: { Id_artista: Number(id) } });

    if (!artistaExistente) {
        return res.status(404).json({ error: "El artista no fue encontrado." });
    }

    // Verificar que se hayan enviado los archivos requeridos
    if (!req.files || !req.files.bannerMobil) {
      return res.status(400).json({ error: "Se requieren el banner mobil." });
    }

    // Desestructurar los archivos de la solicitud
    const { bannerMobil } = req.files as { [fieldname: string]: UploadedFile };

    // Subir las imágenes a Imgur secuencialmente y obtener sus URLs y IDs
    const { url: bannerUrl, id_imgur: bannerImgurId } = await subirImagen(bannerMobil);

    // Crear el objeto Banner con los datos de la imagen subida
    const bannerData = new BannerMobil();
    bannerData.bannerMobil = bannerUrl;
    bannerData.id_imgur = bannerImgurId;
    bannerData.artista = artistaExistente;

    // Guardar el banner en la base de datos
    await AppDataSource.getRepository(BannerMobil).save(bannerData);

    // Responder con el banner creado
    res.status(200).json({ message: "Banner mobil creado correctamente."});
  } catch (error) {
    console.error(`Error al crear el banner: ${error}`);
    res.status(500).json({ error: "Error interno al crear el banner mobil." });
  }
};
