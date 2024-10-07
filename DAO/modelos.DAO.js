import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createModeloDAO = async (modelo) =>{
    try {
        const modeloCreado = await prisma.modelos.create({
            data:{
                nombre_modelo : modelo.nombre_modelo,
            },
        });
        return modeloCreado;
    } catch (error) {
        console.error('Error al crear el modelo:', error);
        throw error;
    }
};

export const getModelosDAO = async () => {
    return await prisma.modelos.findMany()
};

export const getModeloDAO = async (id) => {
    return await prisma.modelos.findMany({where:{
        id_modelo:parseInt(id)
    }})
};

export const deleteModeloDAO = async (id) => {
    return await prisma.modelos.delete({where:{
        id_modelo:parseInt(id)
    }})
};

export const updateModeloDAO = async (id,data) => {
    try {
        const modeloActualizado = await prisma.modelos.update({where:{
            id_modelo:parseInt(id)},
            data,
        })
        return modeloActualizado;
    } catch (error) {
        console.error('error al acrtualizar el estado', error);
        throw error; 
    }
};
