import { Router } from "express"
import { crearUsuario } from "../controllers/usuario/crearUsuario"
import { obtenerUsuarios } from "../controllers/usuario/obtenerUsuario";
import { obtenerUsuarioId } from "../controllers/usuario/obtenerUsuarioId";
import { actualizarUsuario } from "../controllers/usuario/actualizarUsuario";
import { eliminarUsuario } from "../controllers/usuario/eliminarUsuario";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.get('/obtenerUsuarios', authMiddleware, obtenerUsuarios);
router.get('/obtenerUsuario/:id', authMiddleware, obtenerUsuarioId);
router.post('/crearUsuario', authMiddleware, crearUsuario);
router.put('/actualizarUsuario/:id', authMiddleware, actualizarUsuario);
router.delete('/eliminarUsuario/:id', authMiddleware, eliminarUsuario);

export default router