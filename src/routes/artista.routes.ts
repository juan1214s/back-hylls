import { Router } from "express"
import { crearArtista } from "../controllers/artista/crearArtista.controller"
import { obtenerArtistas } from "../controllers/artista/obtenerArtistas";
import { eliminarArtista } from "../controllers/artista/eliminarArtista";
import { obtenerArtistaId } from "../controllers/artista/obtenerArtistaId";
import { actualizarArtista } from "../controllers/artista/actualizarArtista";

const router = Router()

router.get('/obtenerArtista/:id', obtenerArtistaId)
router.get('/obtenerArtistas', obtenerArtistas)
router.post('/crearArtista', crearArtista);
router.delete('/eliminarArtista/:id', eliminarArtista)
router.put('/actualizarArtista/:id', actualizarArtista);

export default router