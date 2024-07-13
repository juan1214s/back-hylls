import { Router } from "express"
import { crearPlayList } from "../controllers/playList/crearPlayList"
import { obtenerPlayLis } from "../controllers/playList/obtenerPlayList";
import { eliminarPlayLists } from "../controllers/playList/eliminarPlayList";
import { obtenerPlaylistId } from "../controllers/playList/obtenerPlayListId";
import { actualizarPlayList } from "../controllers/playList/actualizarPlayList";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.get('/obtenerPlayList', obtenerPlayLis);
router.get('/obtenerPlayListId/:id', obtenerPlaylistId);
router.post('/crearPlaylist', authMiddleware, crearPlayList);
router.delete('/eliminarPlaylist/:id', authMiddleware, eliminarPlayLists);
router.put('/actualizarPlaylist/:id', authMiddleware, actualizarPlayList);

export default router