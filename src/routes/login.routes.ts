import { Router } from "express"
import { login } from "../controllers/login/login";


const router = Router()

router.post('/Login', login);


export default router