import { Router } from "express"
import { crearImagenPlayList } from "../controllers/imagenPlayList/crearImagenPlayList";
import { eliminarFotoPlayList } from "../controllers/imagenPlayList/eliminarFotoPlayList";


const router = Router()

router.post('/crearFotoPlayList/:id', crearImagenPlayList);
router.delete('/eliminarFotoPlayList/:id', eliminarFotoPlayList);

export default router