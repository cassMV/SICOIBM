import * as estadoDAO from '../DAO/estados.DAO.js'

const estadoController = {};

estadoController.createEstado = async (req,res) => {
    const {descripcion_estado} = req.body;

    if(!descripcion_estado){
        return res.status(400).json({message:'El campo "descripcion estado" es requerido'});
    }
    try {
        const nuevoEstado = await estadoDAO.createEstadoDAO(req.body);
        return res.status(201).json(nuevoEstado);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el estado', error: error.message || error })
    }
};

estadoController.getEstados = async(req,res) => {
    try {
        const estados = await estadoDAO.getEstadosDAO()
        res.status(200).json(estados)
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({message:'error al obtenerlos'})
    }
};

estadoController.getEstado = async(req,res) => {
    const {id} = req.params
    try {
        const estadoBuscado = await estadoDAO.getEstadoDAO(id)
        res.status(200).json(estadoBuscado)
    } catch (error) {
        res.status(500).json({message:'error al obtener el estado'})
    }
};

estadoController.deleteEstado = async(req,res) => {
    const {id} = req.params
    try {
        const estadoEliminado = await estadoDAO.deleteEstadoDAO(id)
        res.status(200).json(estadoEliminado)
    } catch (error) {
        res.status(500).json({message:'error al eliminar el estado'})
    }
};

estadoController.updateEstado = async(req,res) => {
    const {id} = req.params;
    const {descripcion_estado} = req.body

    if(!descripcion_estado){
        return res.status(400).json({message: 'El campo "descripcion estado" es requerido. '});
    }

    try {
        const idInt = parseInt(id);
        if(isNaN(idInt)){
            return res.status(400).json({messaje: 'El ID proporcionado no es valido'});
        }
        const estadoExistente = await estadoDAO.getEstadoDAO(id);
        if(!estadoExistente){
            return res.status(400).json({message: 'El estado no existe'});
        }
        const estadoActualizado = await estadoDAO.updateEstadoDAO(idInt, {descripcion_estado});
        return res.status(200).json(estadoActualizado);
    } catch (error) {
        return res.status(500).json({message:'error al actualizar el estado', error});
    }
};

export default estadoController; 