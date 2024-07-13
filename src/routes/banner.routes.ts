import { Router } from "express"
import { crearBanner } from "../controllers/banner/crearBanner"
import { eliminarBanner } from "../controllers/banner/eliminarBanner";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.post('/crearBanner/:id', authMiddleware, crearBanner);
router.delete('/eliminarBanner/:id', authMiddleware, eliminarBanner);

export default router