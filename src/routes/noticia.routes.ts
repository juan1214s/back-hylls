import { Router } from "express"
import { crearNoticia } from "../controllers/noticias/crearNoticia"
import { eliminarNoticia } from "../controllers/noticias/eliminarNoticia"
import { obtenerNoticiaId } from "../controllers/noticias/obtenerNoticiaId"
import { obtenerNoticias } from "../controllers/noticias/obtenerNoticias"
import { actualizarNoticia } from "../controllers/noticias/actualizarNoticia"
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.get('/obtenerNoticia/:id', obtenerNoticiaId);
router.get('/obtenerNoticias', obtenerNoticias);
router.post('/crearNoticia', authMiddleware, crearNoticia);
router.delete('/eliminarNoticia/:id', authMiddleware, eliminarNoticia);
router.put('/actualizarNoticia/:id', authMiddleware, actualizarNoticia)

export default router