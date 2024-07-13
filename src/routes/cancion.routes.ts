import { Router } from "express"
import { crearCancion } from "../controllers/canciones_artista/crearCancion";
import { obtenerCanciones } from "../controllers/canciones_artista/obtenerCanciones";
import { obtenerCancionId } from "../controllers/canciones_artista/obtenerCancionId";
import { eliminarCancion } from "../controllers/canciones_artista/eliminarCancion";
import { actualizarCancion } from "../controllers/canciones_artista/actualizarCancion";

const router = Router()

router.get('/obtenerCancionId/:id', obtenerCancionId )
router.get('/obtenerCanciones', obtenerCanciones );
router.post('/crearCancion/:id', crearCancion );
router.delete('/eliminarCancion/:id', eliminarCancion);
router.put('/actualizarCancion/:id', actualizarCancion);

export default router