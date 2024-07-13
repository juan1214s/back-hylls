import express from "express";
import morgan from "morgan";
import cors from "cors";
import artistaRoutes from "./routes/artista.routes";
import noticiaRoutes from "./routes/noticia.routes";
import playListRoutes from "./routes/playList.routes";
import usuarioRoutes from "./routes/usuario.routes";
import bannerRoutes from "./routes/banner.routes"
import fileUpload from 'express-fileupload';
import methodOverride from 'method-override'; 
import bannnerMobilRoutes from "./routes/bannerMobil.routes";
import albumRoutes from "./routes/album.routes";
import fotoAlbunRoutes from "./routes/fotoAlbum.routes";
import cancionRoutes from "./routes/cancion.routes";
import dataContacto from "./routes/dataContacto.routes";
import fotoArtistaRoutes from "./routes/fotoArtista.routes";
import fotoPlayListRoutes from "./routes/fotoPlayList.routes";
import fotoNoticiaRoutes from "./routes/fotoNoticia.routes";

const app = express();

app.use(morgan('dev')); // Muestra las peticiones que se reciben en la consola

// Middleware para manejar CORS
app.use(cors());

// Permite el formato JSON
app.use(express.json()); 

// Permite formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar la carga de archivos
app.use(fileUpload());

// Middleware para manejar el método _method
app.use(methodOverride('_method')); 

// Montar el router en una ruta base
app.use('/Hylls', artistaRoutes);
app.use('/Hylls', noticiaRoutes);
app.use('/Hylls', playListRoutes);
app.use('/Hylls', usuarioRoutes);
app.use('/Hylls', bannerRoutes);
app.use('/Hylls', bannnerMobilRoutes);
app.use('/Hylls', fotoAlbunRoutes);
app.use('/Hylls', albumRoutes);
app.use('/Hylls', cancionRoutes);
app.use('/Hylls', dataContacto);
app.use('/Hylls', fotoArtistaRoutes);
app.use('/Hylls', fotoPlayListRoutes);
app.use('/Hylls', fotoNoticiaRoutes);


export default app;
