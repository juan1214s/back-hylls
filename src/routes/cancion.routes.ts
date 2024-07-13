import { Router } from "express"
import { crearCancion } from "../controllers/canciones_artista/crearCancion";
import { obtenerCanciones } from "../controllers/canciones_artista/obtenerCanciones";
import { obtenerCancionId } from "../controllers/canciones_artista/obtenerCancionId";
import { eliminarCancion } from "../controllers/canciones_artista/eliminarCancion";
import { actualizarCancion } from "../controllers/canciones_artista/actualizarCancion";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.get('/obtenerCancionId/:id', obtenerCancionId )
router.get('/obtenerCanciones', obtenerCanciones );
router.post('/crearCancion/:id', authMiddleware, crearCancion );
router.delete('/eliminarCancion/:id', authMiddleware, eliminarCancion);
router.put('/actualizarCancion/:id', authMiddleware, actualizarCancion);

export default router