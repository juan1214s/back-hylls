import { Router } from "express"
import { crearArtista } from "../controllers/artista/crearArtista.controller"
import { obtenerArtistas } from "../controllers/artista/obtenerArtistas";
import { eliminarArtista } from "../controllers/artista/eliminarArtista";
import { obtenerArtistaPorId } from "../controllers/artista/obtenerArtistaId";
import { actualizarArtista } from "../controllers/artista/actualizarArtista";

const router = Router()

router.get('/obtenerArtista/:id', obtenerArtistaPorId)
router.get('/obtenerArtistas', obtenerArtistas)
router.post('/crearArtista', crearArtista);
router.delete('/eliminarArtista/:id', eliminarArtista)
router.post('/actualizarArtista/:id', actualizarArtista);

export default router