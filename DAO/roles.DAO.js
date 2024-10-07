import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createRolDAO = async (rol) => {
    try {
        const rolCreado = await prisma.roles.create({
            data:{
                nombre_rol: rol.nombre_rol,
                descripcion: rol.descripcion,
            },
        });
        return rolCreado;
    } catch (error) {
        console.error('Error al crear el rol:', error);
        throw error;
    }
};

export const getRolesDAO = async () => {
    return await prisma.roles.findMany()
};

export const getRolDAO = async (id) => {
    return await prisma.roles.findMany({where:{
        id_rol:parseInt(id)
    }})
};

export const deleteRolDAO = async (id) => {
    return await prisma.roles.delete({where:{
        id_rol:parseInt(id)
    }})
};

export const updateRolDAO = async (id, data) => {
    try {
        const rolActualizado = await prisma.roles.update({where:{
            id_rol:parseInt(id)},
            data,
        })
        return rolActualizado;
    } catch (error) {
        console.error('error al actualizar el rol', error);
        throw error;
    }
};