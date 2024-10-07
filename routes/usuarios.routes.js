import { Router } from "express";
import usuarioController from "../controllers/usuarios.controller.js";

const router = Router();

router.post('/create-usuarios',usuarioController.createUsuario)
router.get('/get-usuarios',usuarioController.getUsuarios)
router.get('/get-usuario/:id',usuarioController.getUsuario)
router.delete('/delete-usuario/:id',usuarioController.deleteUsuario)
router.put('/update-usuario/:id',usuarioController.updateUsuario)

export default router; 