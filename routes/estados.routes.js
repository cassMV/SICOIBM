import { Router } from "express";
import estadoController from "../controllers/estados.controller.js";

const router = Router();

router.post('/create-estados',estadoController.createEstado)
router.get('/get-estados',estadoController.getEstados)
router.get('/get-estado/:id',estadoController.getEstado)
router.delete('/delete-estado/:id',estadoController.deleteEstado)
router.put('/update-estado/:id',estadoController.updateEstado)

export default router;