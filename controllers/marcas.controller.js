import * as marcaDAO from '../DAO/marcas.DAO.js'

const marcaController = {};

marcaController.createMarca = async (req,res) => {
    const {nombre_marca} = req.body;

    if(!nombre_marca){
        return res.status(400).json({message:'El campo "nombre marca" es requerido'})
    }
    try {
        const nuevaMarca = await marcaDAO.createMarcaDAO(req.body);
        return res.status(201).json(nuevaMarca);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el estado', error: error.message || error })
    }
};

marcaController.getMarcas = async(req,res) => {
    try {
        const marcas = await marcaDAO.getMarcasDAO()
        res.status(200).json(marcas)
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({message:'error al obtenerlas'})
    }
};

marcaController.getMarca = async(req,res) => {
    const {id} = req.params
    try {
        const marcaBuscada = await marcaDAO.getMarcaDAO(id)
        res.status(200).json(marcaBuscada)
    } catch (error) {
        res.status(500).json({message:'error al obtener la marca'})
    }
};

marcaController.deleteMarca = async(req,res) => {
    const {id} = req.params
    try {
        const marcaEliminada = await marcaDAO.deleteMarcaDAO(id)
        res.status(200).json(marcaEliminada)
    } catch (error) {
        res.status(500).json({message:'error al eliminar la marca'})
    }
};

marcaController.updateMarca = async(req,res) => {
    const {id} = req.params;
    const {nombre_marca} = req.body

    if(!nombre_marca){
        return res.status(400).json({message: 'El campo "nombre marca" es requerido. '});
    }

    try {
        const idInt = parseInt(id);
        if(isNaN(idInt)){
            return res.status(400).json({messaje: 'El ID proporcionado no es valido'});
        }
        const marcaExistente = await marcaDAO.getMarcaDAO(id);
        if(!marcaExistente){
            return res.status(400).json({message: 'La marca no existe'});
        }
        const marcaActualizada = await marcaDAO.updateMarcaDAO(idInt, {nombre_marca});
        return res.status(200).json(marcaActualizada);
    } catch (error) {
        return res.status(500).json({message:'error al actualizar la marca', error});
    }
};

export default marcaController;
