import { Router } from "express";
import modeloController from "../controllers/modelos.controller.js";

const router = Router();

router.post('/create-modelos',modeloController.createModelo)
router.get('/get-modelos',modeloController.getModelos)
router.get('/get-modelo/:id',modeloController.getModelo)
router.delete('/delete-modelo/:id',modeloController.deleteModelo)
router.put('/update-modelo/:id',modeloController.updateModelo)


export default router