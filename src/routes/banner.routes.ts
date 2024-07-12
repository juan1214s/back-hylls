import { Router } from "express"
import { crearBanner } from "../controllers/banner/crearBanner"
import { eliminarBanner } from "../controllers/banner/eliminarBanner";

const router = Router()

router.post('/crearBanner/:id', crearBanner);
router.delete('/eliminarBanner/:id', eliminarBanner);

export default router