import express from "express";
import morgan from "morgan";
import cors from "cors";
import artistaRoutes from "./routes/artista.routes";
import noticiaRoutes from "./routes/noticia.routes"
import fileUpload from 'express-fileupload';
import methodOverride from 'method-override'; 

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

export default app;