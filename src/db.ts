import { DataSource } from "typeorm";
import { Album_artista } from "./entities/album_artista";
import { Artista } from "./entities/artista";
import { Canciones_artista } from "./entities/canciones_artista";
import { Datos_de_contacto } from "./entities/datos_contacto"
import { Noticia } from "./entities/noticia"
import { Play_list } from "./entities/play_list"
import { Usuarios } from "./entities/usuarios"
import { Videos_musicales } from "./entities/videos_musicales"
import { video_artista } from "./entities/videos_artista"
import { Foto } from "./entities/foto";
import * as dotenv from "dotenv"
import { Banner } from "./entities/banner";
import { BannerMobil } from "./entities/bannerMobil";
import { ImagenNoticia } from "./entities/imagenNoticia";
import { ImagenPlaylist } from "./entities/imagenPlayList";
import { FotoAlbum } from "./entities/foto_album";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",//tipo de base de datos q utilizo
  host: process.env.DBHOST,
  port: 3306, // Puerto correcto para MySQL
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  synchronize: false,
  logging: true,
  entities: [
    Album_artista, 
    Artista, 
    Canciones_artista,
    Datos_de_contacto,
    Noticia,
    Play_list,
    Usuarios,
    Videos_musicales,
    video_artista,
    Foto,
    Banner,
    BannerMobil,
    ImagenNoticia,
    ImagenPlaylist,
    FotoAlbum,
  
], // Aquí van las entities
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize()
.then(()=> {
  console.log(`Se ha iniciado correctamente la conexion`)
})
.catch((error)=>  console.log(error))
