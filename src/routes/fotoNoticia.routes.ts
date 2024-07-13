import { Router } from "express"
import { crearFotoNoticia } from "../controllers/fotoNoticia/crearFotoNoticia";
import { eliminarFotoNoticia } from "../controllers/fotoNoticia/eliminarFotoNoticia";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.post('/crearFotoNoticia/:id', authMiddleware, crearFotoNoticia);
router.delete('/eliminarFotoNoticia/:id', authMiddleware, eliminarFotoNoticia);

export default router