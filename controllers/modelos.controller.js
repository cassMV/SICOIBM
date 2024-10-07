import * as modeloDAO from '../DAO/modelos.DAO.js'

const modeloController = {};

modeloController.createModelo = async (req,res) => {
    const {nombre_modelo} = req.body;

    if(!nombre_modelo){
        return res.status(400).json({message:'El campo "nombre modelo" es requerido'})
    }
    try {
        const nuevoModelo = await modeloDAO.createModeloDAO(req.body);
        return res.status(201).json(nuevoModelo);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el modelo', error: error.message || error })
    }
};

modeloController.getModelos = async(req,res) => {
    try {
        const modelos = await modeloDAO.getModelosDAO()
        res.status(200).json(modelos)
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({message:'error al obtenerlos'})
    }
};

modeloController.deleteModelo = async(req,res) => {
    const {id} = req.params
    try {
        const modeloEliminado = await modeloDAO.deleteModeloDAO(id)
        res.status(200).json(modeloEliminado)
    } catch (error) {
        res.status(500).json({message:'error al eliminar el estado'})
    }
};

modeloController.getModelo = async(req,res) => {
    const {id} = req.params
    try {
        const modeloBuscado = await modeloDAO.getModeloDAO(id)
        res.status(200).json(modeloBuscado)
    } catch (error) {
        res.status(500).json({message:'error al obtener el estado'})
    }
};

modeloController.updateModelo = async(req,res) => {
    const {id} = req.params;
    const {nombre_modelo} = req.body

    if(!nombre_modelo){
        return res.status(400).json({message: 'El campo "nombre modelo" es requerido. '});
    }

    try {
        const idInt = parseInt(id);
        if(isNaN(idInt)){
            return res.status(400).json({messaje: 'El ID proporcionado no es valido'});
        }
        const modeloExistente = await modeloDAO.getModeloDAO(id);
        if(!modeloExistente){
            return res.status(400).json({message: 'El estado no existe'});
        }
        const modeloActualizado = await modeloDAO.updateModeloDAO(idInt, {nombre_modelo});
        return res.status(200).json(modeloActualizado);
    } catch (error) {
        return res.status(500).json({message:'error al actualizar el modelo', error});
    }
};


export default modeloController;