import * as usuarioDAO from '../DAO/usuarios.DAO.js'

const usuarioController = {};

usuarioController.createUsuario = async (req, res) => {
    const { nombre, apellidos, correo_electronico, password_hash, rfc, numero_contacto, id_rol } = req.body;

    if (!nombre || !apellidos || !correo_electronico || !password_hash || !rfc || !numero_contacto || !id_rol) {
        return res.status(400).json({message: 'Todos los campos son requeridos' });
    }
    try {
        const nuevoUsuario = await usuarioDAO.createUsuarioDAO(req.body);
        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el usuario', error: error.message || error 
        });
    }
};

usuarioController.getUsuarios = async(req,res) => {
    try {
        const usuarios = await usuarioDAO.getUsuariosDAO()
        res.status(200).json(usuarios)
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({message:'error al obtenerlos'})
    }
};

usuarioController.getUsuario = async(req,res) => {
    const {id} = req.params
    try {
        const usuarioBuscado = await usuarioDAO.getUsuarioDAO(id)
        res.status(200).json(usuarioBuscado)
    } catch (error) {
        res.status(500).json({message:'error al obtener el usuario'})
    }
};

usuarioController.deleteUsuario = async(req,res) => {
    const {id} = req.params
    try {
        const usuarioEliminado = await usuarioDAO.deleteUsuarioDAO(id)
        res.status(200).json(usuarioEliminado)
    } catch (error) {
        res.status(500).json({message:'error al eliminar el usuario'})
    }
};

usuarioController.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, correo_electronico, password_hash, rfc, numero_contacto, id_rol } = req.body;

    if (!nombre && !apellidos && !correo_electronico && !password_hash && !rfc && !numero_contacto && !id_rol) {
        return res.status(400).json({ message: 'Debes proporcionar al menos uno de los siguientes campos para actualizar: nombre, apellidos, correo_electronico, password_hash, rfc, numero_contacto, id_rol' });
    }

    try {
        const idInt = parseInt(id);
        if (isNaN(idInt)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        const usuarioExistente = await usuarioDAO.getUsuarioDAO(idInt);
        if (!usuarioExistente) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        const usuarioActualizado = await usuarioDAO.updateUsuarioDAO(idInt, {
            nombre, 
            apellidos, 
            correo_electronico, 
            password_hash, 
            rfc, 
            numero_contacto,
            id_rol
        });
        return res.status(200).json(usuarioActualizado);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message || error });
    }
};

export default usuarioController;