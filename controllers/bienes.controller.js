import * as bienDAO from '../DAO/bienes.DAO.js';

const bienController = {};

bienController.createBien = async (req, res) => {
    const { numero_consecutivo, subcuenta_armonizada, codigo_partida_especifica, codificación_gasto, numero_inventario, tipo_posesion, nombre_bien, estatus_bien, id_usuario, fecha_resguardo, id_area, area_responsable, area_presupuestal, id_marca, id_modelo, serie, id_estado, factura_documento, fecha_adquisicion, costo, documento_propiedad, fecha_documento, tipo_alta, recurso_origen, status_legal_documento, caracteristicas, comentario, motivo_no_asignado } = req.body;

    if (!numero_consecutivo || !subcuenta_armonizada || !codigo_partida_especifica || !codificación_gasto || !numero_inventario || !tipo_posesion || !nombre_bien || !estatus_bien || !id_usuario || !fecha_resguardo || !id_area || !area_responsable || !area_presupuestal || !id_marca || !id_modelo || !serie || !id_estado || !factura_documento || !fecha_adquisicion || !costo || !documento_propiedad || !fecha_documento || !tipo_alta || !recurso_origen || !status_legal_documento || !caracteristicas) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const nuevoBien = await bienDAO.createBienDAO(req.body);
        return res.status(201).json(nuevoBien);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el bien', error: error.message || error });
    }
};

bienController.getBienes = async (req, res) => {
    try {
        const bienes = await bienDAO.getBienesDAO();
        res.status(200).json(bienes);
    } catch (error) {
        console.error('Error al obtener los bienes:', error);
        res.status(500).json({ message: 'Error al obtener los bienes' });
    }
};

bienController.getBien = async (req, res) => {
    const { id } = req.params;

    try {
        const bienBuscado = await bienDAO.getBienDAO(id);
        if (!bienBuscado) {
            return res.status(404).json({ message: 'Bien no encontrado' });
        }
        res.status(200).json(bienBuscado);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el bien' });
    }
};

bienController.updateBien = async (req, res) => {
    const { id } = req.params;

    const { numero_consecutivo, subcuenta_armonizada, codigo_partida_especifica, codificación_gasto, numero_inventario, tipo_posesion, nombre_bien, estatus_bien, id_usuario, fecha_resguardo, id_area, area_responsable, area_presupuestal, id_marca, id_modelo, serie, id_estado, factura_documento, fecha_adquisicion, costo, documento_propiedad, fecha_documento, tipo_alta, recurso_origen, status_legal_documento, caracteristicas, comentario, motivo_no_asignado } = req.body;

    if (!numero_consecutivo && !subcuenta_armonizada && !codigo_partida_especifica && !codificación_gasto && !numero_inventario && !tipo_posesion && !nombre_bien && !estatus_bien && !id_usuario && !fecha_resguardo && !id_area && !area_responsable && !area_presupuestal && !id_marca && !id_modelo && !serie && !id_estado && !factura_documento && !fecha_adquisicion && !costo && !documento_propiedad && !fecha_documento && !tipo_alta && !recurso_origen && !status_legal_documento && !caracteristicas) {
        return res.status(400).json({ message: 'Debes proporcionar al menos un campo para actualizar' });
    }

    try {
        const bienActualizado = await bienDAO.updateBienDAO(id, req.body);
        return res.status(200).json(bienActualizado);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el bien', error: error.message || error });
    }
};

bienController.deleteBien = async (req, res) => {
    const { id } = req.params;

    try {
        const bienEliminado = await bienDAO.deleteBienDAO(id);
        if (!bienEliminado) {
            return res.status(404).json({ message: 'Bien no encontrado' });
        }
        res.status(200).json({ message: 'Bien eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el bien' });
    }
};

export default bienController;
