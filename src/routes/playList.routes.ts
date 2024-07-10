import { Router } from "express"
import { crearPlayList } from "../controllers/playList/crearPlayList"
import { obtenerPlayLis } from "../controllers/playList/obtenerPlayList";
import { eliminarPlayLists } from "../controllers/playList/eliminarPlayList";
import { obtenerPlaylistId } from "../controllers/playList/obtenerPlayListId";
import { actualizarPlayList } from "../controllers/playList/actualizarPlayList";

const router = Router()

router.get('/obtenerPlayList', obtenerPlayLis);
router.get('/obtenerPlayListId/:id', obtenerPlaylistId);
router.post('/crearPlaylist', crearPlayList);
router.delete('/eliminarPlaylist/:id', eliminarPlayLists);
router.put('/actualizarPlaylist/:id', actualizarPlayList);

export default router