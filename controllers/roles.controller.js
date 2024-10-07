import * as rolDAO from '../DAO/roles.DAO.js'

const rolController = {};

rolController.createRol = async (req,res) => {
    const {nombre_rol, descripcion} = req.body;

    if(!nombre_rol){
        return res.status(400).json({message:'El campo "nombre rol" es requerido.'});
    }
    if(!descripcion){
        return res.status(400).json({message:'El campo "descripcion" es requerido'})
    }

    try {
        const nuevoRol = await rolDAO.createRolDAO(req.body);
        return res.status(201).json(nuevoRol);
    } catch (error) {
        if(error.code === 'P2002'){
            return res.status(409).json({message: `El rol con el nombre "${nombre_rol}" ya existe.`})
        }
        return res.status(500).json({ message: 'Error al crear el rol', error: error.message || error })
    }
};

rolController.getRoles = async (req,res) => {
    try {
        const roles = await rolDAO.getRolesDAO()
        res.status(200).json(roles)
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({message:'error al obtenerlos'})
    }
};

rolController.getRol = async (req,res) => {
    const {id} = req.params
    try {
        const rolBuscado = await rolDAO.getRolDAO(id)
        res.status(200).json(rolBuscado)
    } catch (error) {
        res.status(500).json({message:'error al obtener el rol'})
    }
};

rolController.deleteRoles = async (req,res) =>{
    const {id} = req.params 
    try {
        const rolEliminado = await rolDAO.deleteRolDAO(id)
        res.status(200).json(rolEliminado)
    } catch (error) {
        res.status(500).json({message:'error al eliminar el rol'})
    }
}

rolController.updateRol = async (req,res) =>{
    const {id} = req.params;
    const {nombre_rol, descripcion} = req.body;

    if(!nombre_rol || !descripcion){
        return res.status(400).json({message: 'Los campos "nombre_rol" y "descripcion" son requeridos.'});
    }

    try {
        const idInt = parseInt(id);
        if (isNaN(idInt)){
            return res.status(400).json({messaje: 'El ID proporcionado no es valido'});
        }
        const rolExistente = await rolDAO.getRolDAO(id);
        if(!rolExistente){
            return res.status(400).json({message: 'El rol no existe'});
        }
        const rolActualizado = await rolDAO.updateRolDAO(idInt, {nombre_rol, descripcion});
        return res.status(200).json(rolActualizado);
    } catch (error) {
        return res.status(500).json({message:'error al actualizar el rol', error});
    }
};

export default rolController;
