import { Router } from "express"
import { crearFotoAlbum } from "../controllers/fotoAlbum/crearFotoAlbum";
import { eliminarFotoAlbum } from "../controllers/fotoAlbum/eliminarFotoAlbum";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.post('/crearFotoAlbum/:id', authMiddleware, crearFotoAlbum);
router.delete('/eliminarFotoAlbum/:id', authMiddleware, eliminarFotoAlbum);

export default router