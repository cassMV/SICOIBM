// controllers/areas.controller.js
import * as areaDAO from '../DAO/areas.DAO.js';

const areaController = {};

areaController.createArea = async (req, res) => {
    const { nombre_area } = req.body;
  
    if (!nombre_area) {
      return res.status(400).json({ message: 'El campo "nombre_area" es requerido.' });
    }
  
    try {
      const nuevaArea = await areaDAO.createAreaDAO(req.body);
      return res.status(201).json(nuevaArea);
    } catch (error) {
      if (error.code === 'P2002') { // Manejo específico de error para violación de restricción única
        return res.status(409).json({ message: `El área con el nombre "${nombre_area}" ya existe.` });
      }
      return res.status(500).json({ message: 'Error al crear el área', error });
    }
};

areaController.getAreas = async (req,res)=>{
    try {
        const areas = await areaDAO.getAreasDAO()
        res.status(200).json(areas)
    } catch (error) {
        res.status(500).json({message: 'error al obtenerlos'})
    }
};

areaController.getArea = async (req, res)=>{
    const {id} = req.params
    try {
        const areaBuscada = await areaDAO.getAreaDAO(id)
        res.status(200).json(areaBuscada)
    } catch (error) {
        res.status(500).json({message: 'error al obtener el area'})
    }
};

areaController.deleteAreas = async (req, res) => {
    const {id} = req.params
    try {
        const areaEliminada = await areaDAO.deteleAreaDAO(id)
        res.status(200).json(areaEliminada)
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el area'})
    }
};

areaController.updateArea = async (req, res) => {
    const { id } = req.params; // Extraer el ID de los parámetros
    const { nombre_area } = req.body; // Extraer los datos que quieres actualizar

    if (!nombre_area) {
        return res.status(400).json({ message: 'El campo "nombre_area" es requerido.' });
    }

    try {
        // Convertir id a número
        const idInt = parseInt(id);

        // Verificar si el ID es válido
        if (isNaN(idInt)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido.' });
        }

        // Verificar si el área existe
        const areaExistente = await areaDAO.getAreaDAO(id);
        if (!areaExistente) {
            return res.status(404).json({ message: 'El área no existe.' });
        }

        // Actualizar el área
        const areaActualizada = await areaDAO.updateAreaDAO(idInt, { nombre_area });
        return res.status(200).json(areaActualizada); // Retorna el área actualizada
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el área', error });
    }
};
  

export default areaController;
