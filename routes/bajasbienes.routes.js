import {Router} from "express";
import bajasbienesController from "../controllers/bajasbienes.controller.js";

const router = Router();

router.post('/create-bajasbienes',bajasbienesController.createBaja)
router.get('/get-bajasbienes',bajasbienesController.getBajasBienes)
router.get('/get-bajabien/:id',bajasbienesController.getBajaBien)
router.delete('/delete-bajabien/:id',bajasbienesController.deleteBaja)
router.put('/update-bajabien/:id',bajasbienesController.updateBaja)

export default router;



