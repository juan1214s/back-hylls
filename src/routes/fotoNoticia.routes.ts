import { Router } from "express"
import { crearFotoNoticia } from "../controllers/fotoNoticia/crearFotoNoticia";
import { eliminarFotoNoticia } from "../controllers/fotoNoticia/eliminarFotoNoticia";

const router = Router()

router.post('/crearFotoNoticia/:id', crearFotoNoticia);
router.delete('/eliminarFotoNoticia/:id', eliminarFotoNoticia);

export default router