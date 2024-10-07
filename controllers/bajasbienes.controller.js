import * as bajaBienDAO from '../DAO/bajasbienes.DAO.js'

const bajaBienController = {};

bajaBienController.createBaja = async (req,res) => {
    const {id_bien, fecha_baja, motivo_baja, especificacion_motivo} = req.body;

    if(!id_bien || !fecha_baja || !motivo_baja || !especificacion_motivo){
        return res.status(400).json({message:'Todos los campos son requeridos: id_bien, fecha_baja, motivo_bajo, especificacion_motivo'});
    }
    try {
        const nuevaBaja = await bajaBienDAO.createBajasBienesDAO(req.body);
        return res.status(201).json(nuevaBaja);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la baja', error: error.message || error })
    }
};