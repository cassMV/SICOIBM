import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createAreaDAO = async (area) => {
    try {
      const areaCreada = await prisma.areas.create({
        data: {
          nombre_area: area.nombre_area,
        },
      });
      return areaCreada;
    } catch (error) {
        console.log(error)
        throw error; // Asegúrate de lanzar el error
    }
};

export const getAreasDAO = async () => {
    return await prisma.areas.findMany()
};

export const getAreaDAO = async (id) => {
    return await prisma.areas.findMany({where:{
        id_area:parseInt(id)
    }})
};

export const deteleAreaDAO = async (id) => {
    return await prisma.areas.delete({where:{
        id_area:parseInt(id)
    }})
};

export const updateAreaDAO = async (id, data) => {
    try {
        const areaActualizada = await prisma.areas.update({where: { 
            id_area:parseInt(id) },
            data,
        });
        return areaActualizada;
    } catch (error) {
        console.error('Error al actualizar el área:', error);
        throw error; // Lanza el error para que pueda ser manejado en el controlador
    }
};

  
