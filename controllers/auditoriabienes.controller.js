import * as auditoriabienDAO from '../DAO/auditoriabienes.DAO.js'

const auditoriabienController = {};

auditoriabienController.createAuditoria = async (req,res) => {
    const {id_bien, fecha_auditoria, id_area_anterior, id_area_nueva, comentario} = req.body;

    if(!id_bien || !fecha_auditoria || !id_area_anterior || !id_area_nueva){
        return res.status(400).json({message:'Todos los campos son requeridos'});
    }
    try {
        const nuevaAuditoriaBien = await auditoriabienDAO.createAuditoriaBienDAO(req.body);
        return res.status(201).json(nuevaAuditoriaBien);
    } catch (error) {
        return res.status(500).json({message : 'Error al crear la auditoria bien', error : error.message || error});
    }
};

auditoriabienController.getAuditorias = async(req,res) => {
    try {
        const auditorias = await auditoriabienDAO.getAuditoriasBienesDAO();
        res.status(200).json(auditorias)
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({message:'error al obtenerlos'})
    }
};

auditoriabienController.getAuditoria = async(req,res) => {
    const {id} = req.params
    try {
        const auditoriaBuscada = await auditoriabienDAO.getAuditoriaBienDAO(id);
        res.status(200).json(auditoriaBuscada)
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({message: 'error al obtener la auditoria'})
    }
};

auditoriabienController.deleteAuditoria = async(req,res) => {
    const {id} = req.params
    try {
        const auditoriaEliminada = await auditoriabienDAO.deleteAuditoriaBienDAO(id);
        res.status(200).json(auditoriaEliminada)
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({message: 'error al eliminar la auditoria'})
    }
};

auditoriabienController.updateAuditoria = async(req,res) => {
    const {id} = req.params;
    const {id_bien, fecha_auditoria, id_area_anterior, id_area_nueva, comentario} = req.body;

    if(!id_bien && !fecha_auditoria && !id_area_anterior && !id_area_nueva ){
        return res.status(400).json({message: 'Debes proporcionar al menos uno de los campos a actualizar'})
    }

    try {
        const idInt = parseInt(id);
        if(isNaN(idInt)){
            return res.status(400).json({message: 'El id proporcionado no es valido'});
        }
        const auditoriaExistente = await auditoriabienDAO.getAuditoriaBienDAO(idInt);
        if(!auditoriaExistente){
            return res.status(404).json({message: 'El usuario no existe'});
        }
        const auditoriaActualizada = await auditoriabienDAO.updateAuditoriaBienDAO(idInt, {
            id_bien,
            fecha_auditoria,
            id_area_anterior,
            id_area_nueva,
            comentario
        });
        return res.status(200).json(auditoriaActualizada);
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({message: 'error al actualizar la auditoria', error:error.message || error});
    }
}

export default auditoriabienController;

