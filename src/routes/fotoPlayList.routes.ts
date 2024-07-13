import { Router } from "express"
import { crearImagenPlayList } from "../controllers/imagenPlayList/crearImagenPlayList";
import { eliminarFotoPlayList } from "../controllers/imagenPlayList/eliminarFotoPlayList";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.post('/crearFotoPlayList/:id', authMiddleware, crearImagenPlayList);
router.delete('/eliminarFotoPlayList/:id', authMiddleware, eliminarFotoPlayList);

export default router