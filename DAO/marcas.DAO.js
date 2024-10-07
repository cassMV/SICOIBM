import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMarcaDAO = async (marca) =>{
    try {
        const marcaCreada = await prisma.marcas.create({
            data: {
                nombre_marca : marca.nombre_marca,
            },
        });
        return marcaCreada;
    } catch (error) {
        console.error('Error al crear la marca:', error);
        throw error; 
    }
};

export const getMarcasDAO = async () => {
    return await prisma.marcas.findMany()
};

export const getMarcaDAO = async (id) => {
    return await prisma.marcas.findMany({where:{
        id_marca:parseInt(id)
    }})
};

export const deleteMarcaDAO = async (id) => {
    return await prisma.marcas.delete({where:{
        id_marca:parseInt(id)
    }})
};

export const updateMarcaDAO = async (id,data) => {
    try {
        const marcaActualizada = await prisma.marcas.update({where:{
            id_marca:parseInt(id)},
            data,
        })
        return marcaActualizada;
    } catch (error) {
        console.error('error al acrtualizar la marca', error);
        throw error; 
    }
};
