-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS InventarioCentroJusticia;
USE InventarioCentroJusticia;

-- Tabla para clasificar marcas de los bienes
CREATE TABLE Marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre_marca VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla para clasificar modelos de los bienes
CREATE TABLE Modelos (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_modelo VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla para clasificar el estado de los bienes
CREATE TABLE Estados (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    descripcion_estado ENUM('Bueno', 'Regular', 'Malo') NOT NULL
);

-- Tabla para clasificar las áreas del centro
CREATE TABLE Areas (
    id_area INT AUTO_INCREMENT PRIMARY KEY,
    nombre_area VARCHAR(255) NOT NULL UNIQUE
);

-- Tabla de roles para definir privilegios de los usuarios
CREATE TABLE Roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- Tabla de usuarios desglosada
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rfc VARCHAR(13) NOT NULL UNIQUE,
    numero_empleado VARCHAR(20) NOT NULL,  -- Nuevo campo para el número de empleado
    numero_contacto VARCHAR(15),
    id_rol INT,  -- Referencia al rol del usuario
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
);


-- Tabla de bienes muebles con referencia a usuarios
CREATE TABLE Bienes (
    id_bien INT AUTO_INCREMENT PRIMARY KEY,
    numero_consecutivo INT NOT NULL UNIQUE,
    subcuenta_armonizada VARCHAR(100),
    codigo_partida_especifica VARCHAR(100),
    codificacion_gasto VARCHAR(100),
    numero_inventario VARCHAR(50),
    tipo_posesion ENUM('Inventariado', 'No inventariado') NOT NULL,
    nombre_bien VARCHAR(255) NOT NULL,
    estatus_bien ENUM('Propuesto para baja', 'Posible reparación', 'Por asignar'),
    id_usuario INT,  -- Referencia al usuario que registró el bien
    fecha_resguardo DATE,
    id_area INT,
    area_responsable VARCHAR(255),
    area_presupuestal VARCHAR(255),
    id_marca INT,
    id_modelo INT,
    serie VARCHAR(100),
    id_estado INT,
    factura_documento VARCHAR(255),
    fecha_adquisicion DATE,
    costo DECIMAL(10, 2),
    documento_propiedad VARCHAR(255),
    fecha_documento DATE,
    tipo_alta VARCHAR(100),
    recurso_origen VARCHAR(100),
    status_legal_documento VARCHAR(255),
    caracteristicas TEXT,
    comentario TEXT,
    motivo_no_asignado TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_marca) REFERENCES Marcas(id_marca),
    FOREIGN KEY (id_modelo) REFERENCES Modelos(id_modelo),
    FOREIGN KEY (id_area) REFERENCES Areas(id_area),
    FOREIGN KEY (id_estado) REFERENCES Estados(id_estado)
);

-- Tabla de auditorías y cambios en los bienes (por si los mueven de lugar)
CREATE TABLE AuditoriaBienes (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_bien INT,
    fecha_auditoria DATE NOT NULL,
    id_area_anterior INT,
    id_area_nueva INT,
    comentario TEXT,
    FOREIGN KEY (id_bien) REFERENCES Bienes(id_bien),
    FOREIGN KEY (id_area_anterior) REFERENCES Areas(id_area),
    FOREIGN KEY (id_area_nueva) REFERENCES Areas(id_area)
);

-- Tabla de bajas de bienes
CREATE TABLE BajasBienes (
    id_baja INT AUTO_INCREMENT PRIMARY KEY,
    id_bien INT,
    fecha_baja DATE NOT NULL,
    motivo_baja TEXT NOT NULL,
    especificacion_motivo VARCHAR(255),
    FOREIGN KEY (id_bien) REFERENCES Bienes(id_bien)
);
