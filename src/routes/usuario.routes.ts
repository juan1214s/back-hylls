import { Router } from "express"
import { crearUsuario } from "../controllers/usuario/crearUsuario"
import { obtenerUsuarios } from "../controllers/usuario/obtenerUsuario";
import { obtenerUsuarioId } from "../controllers/usuario/obtenerUsuarioId";
import { actualizarUsuario } from "../controllers/usuario/actualizarUsuario";
import { eliminarUsuario } from "../controllers/usuario/eliminarUsuario";

const router = Router()

router.get('/obtenerUsuarios', obtenerUsuarios);
router.get('/obtenerUsuario/:id', obtenerUsuarioId);
router.post('/crearUsuario', crearUsuario);
router.put('/actualizarUsuario/:id', actualizarUsuario);
router.delete('/eliminarUsuario/:id', eliminarUsuario);

export default router