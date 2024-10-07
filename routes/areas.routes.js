import { Router } from "express";
import areaController from "../controllers/areas.controller.js";

const router = Router()

router.post('/create-area',areaController.createArea)
router.get('/get-areas',areaController.getAreas)
router.get('/get-area/:id',areaController.getArea)
router.delete('/delete-areas/:id',areaController.deleteAreas)
router.put('/put-area/:id',areaController.updateArea)

export default router