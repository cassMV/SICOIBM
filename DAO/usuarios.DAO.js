import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUsuarioDAO = async (usuario) =>{
    try {
        const usuarioCreado = await prisma.usuarios.create({
            data:{
                nombre : usuario.nombre,
                apellidos : usuario.apellidos,
                correo_electronico :usuario.correo_electronico,
                password_hash : usuario.password_hash,
                rfc : usuario.rfc,
                numero_contacto : usuario.numero_contacto,
                id_rol : usuario.id_rol,
            },
        });
        return usuarioCreado;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

export const getUsuariosDAO = async () => {
    return await prisma.usuarios.findMany()
};

export const getUsuarioDAO = async (id) => {
    return await prisma.usuarios.findMany({where:{
        id_usuario:parseInt(id)
    }})
};

export const deleteUsuarioDAO = async (id) => {
    return await prisma.usuarios.delete({where:{
        id_usuario:parseInt(id)
    }})
};

export const updateUsuarioDAO = async (id,data) => {
    try {
        const usuarioActualizado = await prisma.usuarios.update({where:{
            id_usuario:parseInt(id)},
            data,
        })
        return usuarioActualizado;
    } catch (error) {
        console.error('error al acrtualizar el usuario', error);
        throw error; 
    }
};