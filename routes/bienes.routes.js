import { Router } from "express";
import bienController from "../controllers/bienes.controller.js";

const router = Router();

router.post('/create-bienes',bienController.createBien)
router.get('/get-bienes',bienController.getBienes)
router.get('/get-bien/:id',bienController.getBien)
router.delete('/delete-bien/:id',bienController.deleteBien)
router.put('/update-bien/:id',bienController.updateBien)

export default router;
