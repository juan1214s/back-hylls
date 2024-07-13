import { Router } from "express"
import { crearAlbum } from "../controllers/album_artista/crearAlbum";
import { eliminarAlbum } from "../controllers/album_artista/eliminarAlbum";
import { obtenerAlbumes } from "../controllers/album_artista/obtenerAlbumes";
import { obtenerAlbumId } from "../controllers/album_artista/obtenerAlbumId";
import { actualizarAlbum } from "../controllers/album_artista/actualizarAlbum";


const router = Router()

router.get('/obtenerAlbumId/:id', obtenerAlbumId);
router.get('/obtenerAlbumes', obtenerAlbumes );
router.post('/crearAlbum/:id', crearAlbum );
router.delete('/eliminarAlbum/:id', eliminarAlbum );
router.put('/actualizarAlbum/:id', actualizarAlbum);

export default router