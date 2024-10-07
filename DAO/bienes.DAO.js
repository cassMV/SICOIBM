import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBienDAO = async (bien) => {
    try {
        const bienCreado = await prisma.bienes.create({
            data: {
                numero_consecutivo: bien.numero_consecutivo,
                subcuenta_armonizada: bien.subcuenta_armonizada,
                codigo_partida_especifica: bien.codigo_partida_especifica,
                codificacion_gasto: bien.codificación_gasto,
                numero_inventario: bien.numero_inventario,
                tipo_posesion: bien.tipo_posesion,
                nombre_bien: bien.nombre_bien,
                estatus_bien: bien.estatus_bien,
                id_usuario: bien.id_usuario,
                fecha_resguardo: bien.fecha_resguardo,
                id_area: bien.id_area,
                area_responsable: bien.area_responsable,
                area_presupuestal: bien.area_presupuestal,
                id_marca: bien.id_marca,
                id_modelo: bien.id_modelo,
                serie: bien.serie,
                id_estado: bien.id_estado,
                factura_documento: bien.factura_documento,
                fecha_adquisicion: bien.fecha_adquisicion,
                costo: bien.costo,
                documento_propiedad: bien.documento_propiedad,
                fecha_documento: bien.fecha_documento,
                tipo_alta: bien.tipo_alta,
                recurso_origen: bien.recurso_origen,
                status_legal_documento: bien.status_legal_documento,
                caracteristicas: bien.caracteristicas,
                comentario: bien.comentario,
                motivo_no_asignado: bien.motivo_no_asignado,
            },
        });
        return bienCreado;
    } catch (error) {
        console.error('Error al crear el bien:', error);
        throw error;
    }
};

export const getBienesDAO = async () => {
    try {
        return await prisma.bienes.findMany();
    } catch (error) {
        console.error('Error al obtener los bienes:', error);
        throw error;
    }
};

export const getBienDAO = async (id) => {
    try {
        return await prisma.bienes.findUnique({
            where: {
                numero_consecutivo: parseInt(id),
            },
        });
    } catch (error) {
        console.error('Error al obtener el bien:', error);
        throw error;
    }
};

export const updateBienDAO = async (id, data) => {
    try {
        const bienActualizado = await prisma.bienes.update({
            where: {
                numero_consecutivo: parseInt(id),
            },
            data,
        });
        return bienActualizado;
    } catch (error) {
        console.error('Error al actualizar el bien:', error);
        throw error;
    }
};

export const deleteBienDAO = async (id) => {
    try {
        return await prisma.bienes.delete({
            where: {
                numero_consecutivo: parseInt(id),
            },
        });
    } catch (error) {
        console.error('Error al eliminar el bien:', error);
        throw error;
    }
};
