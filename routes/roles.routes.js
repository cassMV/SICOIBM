import { Router } from "express";
import rolController from "../controllers/roles.controller.js";

const router = Router()

router.post('/create-roles',rolController.createRol)
router.get('/get-roles',rolController.getRoles)
router.get('/get-rol/:id',rolController.getRol)
router.delete('/delete-rol/:id',rolController.deleteRoles)
router.put('/update-rol/:id',rolController.updateRol)

export default router;