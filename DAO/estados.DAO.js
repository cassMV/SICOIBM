import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEstadoDAO = async (estado) =>{
    try {
        const estadoCreado = await prisma.estados.create({
            data:{
                descripcion_estado : estado.descripcion_estado,
            },
        });
        return estadoCreado;
    } catch (error) {
        console.error('Error al crear el estado:', error);
        throw error;
    }
};

export const getEstadosDAO = async () => {
    return await prisma.estados.findMany()
};

export const getEstadoDAO = async (id) => {
    return await prisma.estados.findMany({where:{
        id_estado:parseInt(id)
    }})
};

export const deleteEstadoDAO = async (id) => {
    return await prisma.estados.delete({where:{
        id_estado:parseInt(id)
    }})
};

export const updateEstadoDAO = async (id,data) => {
    try {
        const estadoActualizado = await prisma.estados.update({where:{
            id_estado:parseInt(id)},
            data,
        })
        return estadoActualizado;
    } catch (error) {
        console.error('error al acrtualizar el estado', error);
        throw error; 
    }
};





