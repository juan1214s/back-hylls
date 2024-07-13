import { Router } from "express"
import { apiEmail } from "../controllers/email/apiEmail";


const router = Router()

router.post('/Email', apiEmail);


export default router