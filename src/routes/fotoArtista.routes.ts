import { Router } from "express"
import { crearFotoArtista } from "../controllers/fotoArtista/crearFotoArtista";
import { eliminarFotoArtista } from "../controllers/fotoArtista/eliminarFotoArtista";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.post('/crearFotoArtista/:id', authMiddleware, crearFotoArtista);
router.delete('/eliminarFotoArtista/:id', authMiddleware, eliminarFotoArtista);

export default router