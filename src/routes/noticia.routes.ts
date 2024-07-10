import { Router } from "express"
import { crearNoticia } from "../controllers/noticias/crearNoticia"
import { eliminarNoticia } from "../controllers/noticias/eliminarNoticia"
import { obtenerNoticiaId } from "../controllers/noticias/obtenerNoticiaId"
import { obtenerNoticias } from "../controllers/noticias/obtenerNoticias"
import { actualizarNoticia } from "../controllers/noticias/actualizarNoticia"

const router = Router()

router.get('/obtenerNoticia/:id', obtenerNoticiaId);
router.get('/obtenerNoticias', obtenerNoticias);
router.post('/crearNoticia', crearNoticia);
router.delete('/eliminarNoticia/:id', eliminarNoticia);
router.put('/actualizarNoticia/:id', actualizarNoticia)

export default router