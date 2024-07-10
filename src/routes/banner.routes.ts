import { Router } from "express"
import { crearBanner } from "../controllers/banner/crearBanner"

const router = Router()

router.post('/crearBanner/:id', crearBanner);

export default router