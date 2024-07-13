import { Router } from "express"
import { crearFotoArtista } from "../controllers/fotoArtista/crearFotoArtista";
import { eliminarFotoArtista } from "../controllers/fotoArtista/eliminarFotoArtista";

const router = Router()

router.post('/crearFotoArtista/:id', crearFotoArtista);
router.delete('/eliminarFotoArtista/:id', eliminarFotoArtista);

export default router