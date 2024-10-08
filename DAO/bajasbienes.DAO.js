import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBajasBienesDAO = async (bajaBien) =>{
    try {
        const bajaCreada = await prisma.bajasbienes.create({
            data:{
                id_bien : bajaBien.id_bien,
                fecha_baja : bajaBien.fecha_baja,
                motivo_baja : bajaBien.motivo_baja,
                especificacion_motivo : bajaBien.especificacion_motivo,
            },
        });
        return bajaCreada;
    } catch (error) {
        console.error('Error al crear el modelo:', error);
        throw error;
    }
};

export const getBajasBienesDAO = async () => {
    try {
        return await prisma.bajasbienes.findMany();
    } catch (error) {
        console.error('Error al obtener las bajas de bienes', error);
        throw error;
    }
};

export const getBajaBienDAO = async (id) => {
    try {
        return await prisma.bajasbienes.findMany({
            where: { 
                id_baja:parseInt(id) 
            }});
    } catch (error) {
        console.error('Error al obtener la baja de bien:', error);
        throw error;
    }
};

export const updateBajaBienDAO = async (id, data) => {
    try {
        const bajaActualizada = await prisma.bajasbienes.update({
            where: { id_baja: parseInt(id) },
            data,
        });
        return bajaActualizada;
    } catch (error) {
        console.error('Error al actualizar la baja de bien:', error);
        throw error;
    }
};

export const deleteBajaBienDAO = async (id) => {
    try {
        return await prisma.bajasbienes.delete({
            where: { id_baja: parseInt(id) },
        });
    } catch (error) {
        console.error('Error al eliminar la baja de bien:', error);
        throw error;
    }
};