import { Router } from "express"
import { crearNoticia } from "../controllers/noticias/crearNoticia"

const router = Router()

router.post('/crearNoticia', crearNoticia)

export default router