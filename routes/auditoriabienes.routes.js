import { Router } from "express";
import auditoriaController from "../controllers/auditoriabienes.controller.js"

const router = Router();

router.post('/create-auditorias',auditoriaController.createAuditoria)
router.get('/get-auditorias',auditoriaController.getAuditorias)
router.get('/get-auditoria/:id',auditoriaController.getAuditoria)
router.delete('/delete-auditoria/:id',auditoriaController.deleteAuditoria)
router.put('/update-auditoria/:id',auditoriaController.updateAuditoria)

export default router;