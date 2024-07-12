import { Router } from "express"
import { crearFotoAlbum } from "../controllers/fotoAlbum/crearFotoAlbum";
import { eliminarFotoAlbum } from "../controllers/fotoAlbum/eliminarFotoAlbum";

const router = Router()

router.post('/crearFotoAlbum/:id', crearFotoAlbum);
router.delete('/eliminarFotoAlbum/:id', eliminarFotoAlbum);

export default router