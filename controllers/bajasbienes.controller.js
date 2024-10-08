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

bajaBienController.getBajasBienes = async (req, res) => {
    try {
        const bajas = await bajaBienDAO.getBajasBienesDAO();
        return res.status(200).json(bajas);
    } catch (error) {
        console.error('Error al obtener las bajas de bienes:', error);
        return res.status(500).json({ message: 'Error al obtener las bajas de bienes' });
    }
};

bajaBienController.getBajaBien = async (req, res) => {
    const { id } = req.params;
    try {
        const baja = await bajaBienDAO.getBajaBienDAO(id);
        if (!baja) {
            return res.status(404).json({ message: 'Baja de bien no encontrada' });
        }
        return res.status(200).json(baja);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la baja de bien', error: error.message || error });
    }
};

bajaBienController.deleteBaja = async (req, res) => {
    const { id } = req.params;
    try {
        const bajaEliminada = await bajaBienDAO.deleteBajaBienDAO(id);
        return res.status(200).json(bajaEliminada);
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la baja de bien', error: error.message || error });
    }
};

bajaBienController.updateBaja = async (req, res) => {
    const { id } = req.params;
    const { id_bien, fecha_baja, motivo_baja, especificacion_motivo } = req.body;

    if (!id_bien && !fecha_baja && !motivo_baja && !especificacion_motivo) {
        return res.status(400).json({ message: 'Debes proporcionar al menos un campo para actualizar: id_bien, fecha_baja, motivo_baja, especificacion_motivo' });
    }

    try {
        const idInt = parseInt(id);
        if (isNaN(idInt)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        const bajaExistente = await bajaBienDAO.getBajaBienDAO(idInt);
        if (!bajaExistente) {
            return res.status(404).json({ message: 'La baja de bien no existe' });
        }

        const bajaActualizada = await bajaBienDAO.updateBajaBienDAO(idInt, { id_bien, fecha_baja, motivo_baja, especificacion_motivo });
        return res.status(200).json(bajaActualizada);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la baja de bien', error: error.message || error });
    }
};

export default bajaBienController;