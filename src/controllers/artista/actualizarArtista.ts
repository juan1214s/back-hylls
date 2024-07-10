// import FormData from 'form-data';
// import axios from 'axios';

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

// // Función para subir una imagen a Imgur
// const subirImagen = async (archivo: UploadedFile): Promise<string> => {
//   const form = new FormData();
//   form.append('image', archivo.data, { filename: archivo.name });

//   const response = await axios.post('https://api.imgur.com/3/image', form, {
//     headers: {
//       'Authorization': `Client-ID ${CLIENT_ID}`,
//       ...form.getHeaders()
//     }
//   });

//   return response.data.data.link;
// };

// export const actualizarArtista = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { nombre, biografia, facebook, twitter, instagram, youtube } = req.body;

//     // // Verificar si hay archivos adjuntos
//     // const { foto, banner, bannerMobil } = req.files as { [fieldname: string]: UploadedFile } || {};

//     // Buscar el artista por ID
//     const artista = await AppDataSource.getRepository(Artista).findOne({ where: { Id_artista: Number(id) } });

//     if (!artista) {
//       return res.status(404).json({ error: 'Artista no encontrado.' });
//     }

//     // Subir imágenes solo si se proporcionan
//     // let fotoUrl = artista.foto;
//     // let bannerUrl = artista.banner;
//     // let bannerMobilUrl = artista.bannerMobil;

//     // if (foto) {
//     //   fotoUrl = await subirImagen(foto);
//     // }
//     // if (banner) {
//     //   bannerUrl = await subirImagen(banner);
//     // }
//     // if (bannerMobil) {
//     //   bannerMobilUrl = await subirImagen(bannerMobil);
//     // }

//     // Actualizar datos del artista
//     artista.nombre = nombre || artista.nombre;
//     artista.biografia = biografia || artista.biografia;
//     artista.facebook = facebook || artista.facebook;
//     artista.twitter = twitter || artista.twitter;
//     artista.instagram = instagram || artista.instagram;
//     artista.youtube = youtube || artista.youtube;

//     // // Conservar las URLs actuales si no se proporcionan nuevas imágenes
//     // artista.foto = fotoUrl || artista.foto;
//     // artista.banner = bannerUrl || artista.banner;
//     // artista.bannerMobil = bannerMobilUrl || artista.bannerMobil;

//     // Guardar cambios en la base de datos
//     await AppDataSource.getRepository(Artista).save(artista);

//     // Responder con el artista actualizado
//     res.status(200).json({ message: 'Artista actualizado correctamente', artista });
//   } catch (error) {
//     console.error('Error al actualizar el artista:', error);
//     res.status(500).json({ error: 'Error interno al actualizar el artista' });
//   }
// };

import { Request, Response } from "express";
import { Artista } from "../../entities/artista";
import { AppDataSource } from "../../db";

export const actualizarArtista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, biografia, facebook, twitter, instagram, youtube } = req.body;

        // Buscar el artista por su ID
        const artista = await AppDataSource.getRepository(Artista).findOne({ where: { Id_artista: Number(id) } });

        if (!artista) {
            return res.status(404).json({ error: 'Artista no encontrado.' });
        }

        // Actualizar los campos si existen en el body y no son undefined o vacíos
        artista.nombre = nombre || artista.nombre;
        artista.biografia = biografia || artista.biografia;
        artista.facebook = facebook || artista.facebook;
        artista.twitter = twitter || artista.twitter;
        artista.instagram = instagram || artista.instagram;
        artista.youtube = youtube || artista.youtube;

        // Guardar la información actualizada del artista en la base de datos
        await AppDataSource.getRepository(Artista).save(artista);

        // Responder con el mensaje de éxito y el artista actualizado
        res.status(200).json({ message: 'Artista actualizado correctamente', artista });
    } catch (error) {
        console.error('Error al actualizar el artista:', error);
        res.status(500).json({ error: 'Error interno al actualizar el artista' });
    }
};
