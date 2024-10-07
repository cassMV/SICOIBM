import { Router } from "express";
import marcaController from "../controllers/marcas.controller.js"

const router = Router();

router.post('/create-marcas',marcaController.createMarca)
router.get('/get-marcas',marcaController.getMarcas)
router.get('/get-marca/:id',marcaController.getMarca)
router.delete('/delete-marca/:id',marcaController.deleteMarca)
router.put('/update-marca/:id',marcaController.updateMarca)

export default router;