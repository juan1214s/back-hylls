import { Router } from "express"
import { crearBannerMobil } from "../controllers/bannerMobil/crearBannerMobil";
import { eliminarBannerMobil } from "../controllers/bannerMobil/eliminarBannerMobil";
import { authMiddleware } from "../JWT/authMiddleware";

const router = Router()

router.post('/crearBannerMobil/:id', authMiddleware, crearBannerMobil);
router.delete('/eliminarBannerMobil/:id', authMiddleware, eliminarBannerMobil);

export default router