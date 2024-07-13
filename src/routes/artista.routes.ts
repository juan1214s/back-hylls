import { Router } from "express"
import { crearArtista } from "../controllers/artista/crearArtista.controller"
import { obtenerArtistas } from "../controllers/artista/obtenerArtistas";
import { eliminarArtista } from "../controllers/artista/eliminarArtista";
import { obtenerArtistaId } from "../controllers/artista/obtenerArtistaId";
import { actualizarArtista } from "../controllers/artista/actualizarArtista";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.get('/obtenerArtista/:id', obtenerArtistaId)
router.get('/obtenerArtistas', obtenerArtistas)
router.post('/crearArtista', authMiddleware, crearArtista);
router.delete('/eliminarArtista/:id', authMiddleware, eliminarArtista)
router.put('/actualizarArtista/:id', authMiddleware, actualizarArtista);

export default router