import { Router } from "express"
import { cancionIndividual } from "../controllers/cancionIndividual/crearCancionIndividual";
import { eliminarCancionIndividual } from "../controllers/cancionIndividual/eliminarCancionSingle";
import { actualizarCancionIndividual } from "../controllers/cancionIndividual/actualizarCancionIndividual";
import { obtenerCancionesIndividuales } from "../controllers/cancionIndividual/obtenerCancionesIndividuales";
import { obtenerCancionIndividualId } from "../controllers/cancionIndividual/obtenerCancionIndividualId";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.get('/obtenerCacionIndividual/:id', obtenerCancionIndividualId );
router.get('/obtenerCacionesIndividuales', obtenerCancionesIndividuales );
router.post('/crearCancionIndividual', authMiddleware, cancionIndividual );
router.delete('/eliminarCancionIndividual/:id', authMiddleware, eliminarCancionIndividual );
router.put('/actualizarCancionIndividual/:id', authMiddleware, actualizarCancionIndividual );

export default router