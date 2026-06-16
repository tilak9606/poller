import {Router} from "express";
import {getCurrentUser} from "./controller.js";

const router = Router();

router.get("/me", getCurrentUser); 

export default router;