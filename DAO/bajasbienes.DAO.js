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