import { Router } from "express"
import { crearBannerMobil } from "../controllers/bannerMobil/crearBannerMobil";
import { eliminarBannerMobil } from "../controllers/bannerMobil/eliminarBannerMobil";

const router = Router()

router.post('/crearBannerMobil/:id', crearBannerMobil);
router.delete('/eliminarBannerMobil/:id', eliminarBannerMobil);

export default router