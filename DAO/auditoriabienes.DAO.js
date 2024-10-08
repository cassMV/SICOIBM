import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAuditoriaBienDAO = async (auditoriaBien) => {
    try {
        const auditoriaCreada = await prisma.auditoriabienes.create({
            data: {
                id_bien: auditoriaBien.id_bien,
                fecha_auditoria: auditoriaBien.fecha_auditoria,
                id_area_anterior: auditoriaBien.id_area_anterior,
                id_area_nueva: auditoriaBien.id_area_nueva,
                comentario: auditoriaBien.comentario,
            },
        });
        return auditoriaCreada;
    } catch (error) {
        console.error('Error al crear la auditoría del bien:', error);
        throw error;
    }
};

export const getAuditoriasBienesDAO = async () => {
    return await prisma.auditoriabienes.findMany();
};

export const getAuditoriaBienDAO = async (id) => {
    return await prisma.auditoriabienes.findMany({
        where: {
            id_auditoria: parseInt(id),
        },
    });
};

export const deleteAuditoriaBienDAO = async (id) => {
    return await prisma.auditoriabienes.delete({
        where: {
            id_auditoria: parseInt(id),
        },
    });
};

export const updateAuditoriaBienDAO = async (id, data) => {
    try {
        const auditoriaActualizada = await prisma.auditoriabienes.update({
            where: {
                id_auditoria: parseInt(id),
            },
            data,
        });
        return auditoriaActualizada;
    } catch (error) {
        console.error('Error al actualizar la auditoría del bien:', error);
        throw error;
    }
};
