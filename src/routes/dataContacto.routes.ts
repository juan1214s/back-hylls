import { Router } from "express"
import { crearContacto } from "../controllers/datos_contacto/crearContacto";
import { obtenerDataContacto } from "../controllers/datos_contacto/obtenerDatosContacto";
import { obtenerContactoId } from "../controllers/datos_contacto/obtenerDatosContactoId";
import { eliminarContacto } from "../controllers/datos_contacto/eliminarDataContacto";

const router = Router()

router.get('/obtenerContacto/:id', obtenerContactoId);
router.get('/obtenerContactos', obtenerDataContacto );
router.post('/crearDatosContacto', crearContacto );
router.delete('/eliminarContacto/:id', eliminarContacto);

export default router