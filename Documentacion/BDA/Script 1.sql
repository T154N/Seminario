/*Creacion de tablas*/
USE [master]
GO
/****** Object:  Database [Gestion de Pedidos]    Script Date: 20/8/2024 09:10:32 ******/
/* Seminario Integrador 
3k4 -2024
Grupo 2
*/
CREATE DATABASE [Gestion de Pedidos]
 CONTAINMENT = NONE
 ON  PRIMARY 
 --Reemplazar filename por su local
( NAME = N'Gestion de Pedidos', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Gestion de Pedidos.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Gestion de Pedidos_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Gestion de Pedidos_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Gestion de Pedidos] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Gestion de Pedidos].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Gestion de Pedidos] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET ARITHABORT OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Gestion de Pedidos] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Gestion de Pedidos] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Gestion de Pedidos] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Gestion de Pedidos] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Gestion de Pedidos] SET  MULTI_USER 
GO
ALTER DATABASE [Gestion de Pedidos] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Gestion de Pedidos] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Gestion de Pedidos] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Gestion de Pedidos] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Gestion de Pedidos] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Gestion de Pedidos] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Gestion de Pedidos] SET QUERY_STORE = ON
GO
ALTER DATABASE [Gestion de Pedidos] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Gestion de Pedidos]
GO
/*Creacion de tablas*/
-- Create table 'estado'
CREATE TABLE estado (
    estado_id BIGINT PRIMARY KEY IDENTITY(1,1),
    estado_descripcion NVARCHAR(MAX) NOT NULL,
    estado_observaciones NVARCHAR(MAX),
    estado_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    estado_fecha_modificacion DATETIMEOFFSET,
    estado_fecha_baja DATETIMEOFFSET,
    estado_usuario_alta NVARCHAR(MAX) NOT NULL,
    estado_usuario_modificacion NVARCHAR(MAX),
    estado_usuario_baja NVARCHAR(MAX)
);

/*Insert Estados*/
Insert into estado (estado_descripcion , estado_observaciones ,    estado_usuario_alta )
values 
 ('ACTIVO', 'Este estado representa que el registro esta activo y se debera mostrar en las pantallas.','Admin'),
 ('BAJA', 'Este estado representa que el registro se encuentra eliminado de manera l�gica y no se debera mostrar en las pantallas.','Admin'),
 ('PENDIENTE DE PAGO','Estado para pedidos que aun no se han pagado','Admin'),
 ('SE�ADO','Estado para pedidos en los cuales se recibio un anticipo','Admin'),
 ('PAGADO','Estado para pedidos donde se recibio el total del pago','Admin')
  ;
 
-- Create table 'cliente'
CREATE TABLE cliente (
    cliente_id BIGINT PRIMARY KEY IDENTITY(1,1),
    cliente_nombre NVARCHAR(MAX) NOT NULL,
    cliente_email VARCHAR(2000) NOT NULL  ,
    cliente_telefono NVARCHAR(MAX),
    cliente_estado_id BIGINT NOT NULL,
    cliente_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    cliente_fecha_modificacion DATETIMEOFFSET,
    cliente_fecha_baja DATETIMEOFFSET,
    cliente_usuario_alta NVARCHAR(MAX) NOT NULL,
    cliente_usuario_modificacion NVARCHAR(MAX),
    cliente_usuario_baja NVARCHAR(MAX),
    cliente_observaciones NVARCHAR(MAX),
    FOREIGN KEY (cliente_estado_id) REFERENCES estado (estado_id)
);

ALTER TABLE cliente
    ADD CONSTRAINT cliente_email_unico UNIQUE (cliente_email);

-- Create table 'pais'
CREATE TABLE pais (
    pais_id BIGINT PRIMARY KEY IDENTITY(1,1),
    pais_nombre VARCHAR(2000) NOT NULL,
    pais_estado_id BIGINT NOT NULL,
    pais_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    pais_fecha_modificacion DATETIMEOFFSET,
    pais_fecha_baja DATETIMEOFFSET,
    pais_usuario_alta NVARCHAR(MAX) NOT NULL,
    pais_usuario_modificacion NVARCHAR(MAX),
    pais_usuario_baja NVARCHAR(MAX),
    pais_observaciones NVARCHAR(MAX),
    FOREIGN KEY (pais_estado_id) REFERENCES estado (estado_id),
    CONSTRAINT pais_nombre_unico UNIQUE (pais_nombre)
);
/*Insert Paises*/
Insert into pais (pais_nombre ,pais_estado_id,pais_usuario_alta) values
('ARGENTINA', 1,'Admin'),
('BRASIL',1,'Admin');

-- Create table 'provincia'
CREATE TABLE provincia (
    provincia_id BIGINT PRIMARY KEY IDENTITY(1,1),
    provincia_nombre VARCHAR(2000) NOT NULL,
    provincia_pais_id BIGINT NOT NULL,
    provincia_estado_id BIGINT NOT NULL,
    provincia_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    provincia_fecha_modificacion DATETIMEOFFSET,
    provincia_fecha_baja DATETIMEOFFSET,
    provincia_usuario_alta NVARCHAR(MAX) NOT NULL,
    provincia_usuario_modificacion NVARCHAR(MAX),
    provincia_usuario_baja NVARCHAR(MAX),
    provincia_observaciones NVARCHAR(MAX),
    FOREIGN KEY (provincia_pais_id) REFERENCES pais (pais_id),
    FOREIGN KEY (provincia_estado_id) REFERENCES estado (estado_id),
    CONSTRAINT provincia_nombre_unico UNIQUE (provincia_nombre, provincia_pais_id)
);
/*Insert Provincia*/
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Buenos Aires ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Buenos Aires-GBA ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Capital Federal ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Catamarca ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Chaco ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Chubut ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' C�rdoba ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Corrientes ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Entre R�os ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Formosa ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Jujuy ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' La Pampa ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' La Rioja ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Mendoza ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Misiones ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Neuqu�n ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' R�o Negro ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Salta ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' San Juan ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' San Luis ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Santa Cruz ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Santa Fe ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Santiago del Estero ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Tierra del Fuego ',1,1,'Admin');
insert into provincia (provincia_nombre ,provincia_pais_id ,provincia_estado_id ,provincia_usuario_alta ) values (' Tucum�n ',1,1,'Admin');
update provincia set provincia_nombre = upper(trim(provincia_nombre));
-- Create table 'localidad'
CREATE TABLE localidad (
    localidad_id BIGINT PRIMARY KEY IDENTITY(1,1),
    localidad_nombre VARCHAR(2000) NOT NULL,
    localidad_provincia_id BIGINT NOT NULL,
    localidad_estado_id BIGINT NOT NULL,
    localidad_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    localidad_fecha_modificacion DATETIMEOFFSET,
    localidad_fecha_baja DATETIMEOFFSET,
    localidad_usuario_alta NVARCHAR(MAX) NOT NULL,
    localidad_usuario_modificacion NVARCHAR(MAX),
    localidad_usuario_baja NVARCHAR(MAX),
    localidad_observaciones NVARCHAR(MAX),
    FOREIGN KEY (localidad_provincia_id) REFERENCES provincia (provincia_id),
    FOREIGN KEY (localidad_estado_id) REFERENCES estado (estado_id),
    CONSTRAINT localidad_nombre_unico UNIQUE (localidad_nombre, localidad_provincia_id)
);

/*Insert Localidades*/
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 25 de Mayo ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 3 de febrero ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 25 de Mayo ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 3 de febrero ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' A. Alsina ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' A. Gonz�les Ch�ves ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aguas Verdes ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alberti ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arrecifes ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ayacucho ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Azul ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bah�a Blanca ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Balcarce ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Baradero ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Benito Ju�rez ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Berisso ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bol�var ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bragado ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Brandsen ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Campana ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ca�uelas ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capilla del Se�or ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capit�n Sarmiento ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carapachay ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carhu� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Caril� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carlos Casares ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carlos Tejedor ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carmen de Areco ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carmen de Patagones ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Castelli ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chacabuco ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chascom�s ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chivilcoy ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col�n ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Dorrego ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Pringles ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Rosales ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Su�rez ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Costa Azul ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Costa Chica ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Costa del Este ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Costa Esmeralda ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Daireaux ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Darregueira ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Del Viso ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Dolores ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Don Torcuato ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ensenada ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Escobar ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Exaltaci�n de la Cruz ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Florentino Ameghino ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gar�n ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Alvarado ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Alvear ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Arenales ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Belgrano ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Guido ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Lamadrid ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Las Heras ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Lavalle ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Madariaga ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Pacheco ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Paz ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Pinto ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Pueyrred�n ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Rodr�guez ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Viamonte ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Villegas ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guamin� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guernica ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Hip�lito Yrigoyen ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ing. Maschwitz ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jun�n ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Plata ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laprida ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Flores ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Toninas ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Leandro N. Alem ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lincoln ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lober�a ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lobos ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Cardales ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Toldos ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lucila del Mar ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Luj�n ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Magdalena ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Maip� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mar Chiquita ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mar de Aj� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mar de las Pampas ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mar del Plata ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mar del Tuy� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Marcos Paz ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mercedes ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Miramar ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Hermoso ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Munro ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Navarro ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Necochea ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Olavarr�a ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Partido de la Costa ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pehuaj� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pellegrini ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pergamino ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pig�� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pila ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pilar ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pinamar ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pinar del Sol ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Polvorines ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pte. Per�n ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pu�n ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Punta Indio ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ramallo ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rauch ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rivadavia ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rojas ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Roque P�rez ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saavedra ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saladillo ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salliquel� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salto ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Andr�s de Giles ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Antonio de Areco ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Antonio de Padua ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Bernardo ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Cayetano ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Clemente del Tuy� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Nicol�s ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Pedro ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Vicente ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Teresita ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Suipacha ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tandil ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tapalqu� ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tordillo ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tornquist ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Trenque Lauquen ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tres Lomas ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Gesell ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villarino ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Z�rate ')),1,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('11 de Septiembre ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('20 de Junio ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 25 de Mayo ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Acassuso ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Adrogu� ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldo Bonzi ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' �rea Reserva Cintur�n Ecol�gico ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Avellaneda ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Banfield ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Barrio Parque ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Barrio Santa Teresita ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Beccar ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bella Vista ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Beraz�tegui ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bernal Este ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bernal Oeste ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Billinghurst ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Boulogne ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Burzaco ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carapachay ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Caseros ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Castelar ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Churruca ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ciudad Evita ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ciudad Madero ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ciudadela ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Claypole ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Crucecita ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Muelle Sur ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Don Bosco ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Don Orione ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Jag�el ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Libertador ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Palomar ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Tala ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Tr�bol ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ezeiza ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ezpeleta ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Florencio Varela ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Florida ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Francisco �lvarez ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gerli ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Glew ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gonz�lez Cat�n ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Lamadrid ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Grand Bourg ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gregorio de Laferrere ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guillermo Enrique Hudson ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Haedo ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Hurlingham ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ing. Sourdeaux ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Isidro Casanova ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ituzaing� ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jos� C. Paz ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jos� Ingenieros ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jos� M�rmol ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Lucila ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Reja ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Tablada ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lan�s ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Llavallol ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Loma Hermosa ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lomas de Zamora ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lomas del Mill�n ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lomas del Mirador ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Longchamps ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Polvorines ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Luis Guill�n ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Malvinas Argentinas ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mart�n Coronado ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mart�nez ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Merlo ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ministro Rivadavia ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Chingolo ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Grande ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Moreno ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mor�n ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mu�iz ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Olivos ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pablo Nogu�s ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pablo Podest� ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso del Rey ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pereyra ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pi�eiro ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pl�tanos ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pontevedra ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quilmes ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rafael Calzada ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rafael Castillo ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ramos Mej�a ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ranelagh ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Remedios de Escalada ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' S�enz Pe�a ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Antonio de Padua ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Fernando ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Francisco Solano ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Isidro ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Justo ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Mart�n ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Miguel ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santos Lugares ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sarand� ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sourigues ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tapiales ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Temperley ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tigre ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tortuguitas ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Trist�n Su�rez ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Trujui ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Turdera ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Valent�n Alsina ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vicente L�pez ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Adelina ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Ballester ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Bosch ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Caraza ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Celina ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Centenario ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa de Mayo ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Diamante ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Dom�nico ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Espa�a ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Fiorito ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Guillermina ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Insuperable ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Jos� Le�n Su�rez ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa La Florida ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Luzuriaga ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Martelli ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Obrera ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Progreso ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Raffo ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Sarmiento ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Tesei ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Udaondo ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Virrey del Pino ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Wilde ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' William Morris ')),2,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Agronom�a ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Almagro ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Balvanera ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Barracas ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Belgrano ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Boca ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Boedo ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Caballito ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chacarita ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coghlan ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Colegiales ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Constituci�n ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Flores ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Floresta ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Paternal ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Liniers ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mataderos ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monserrat ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Castro ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nueva Pompeya ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' N��ez ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Palermo ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Parque Avellaneda ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Parque Chacabuco ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Parque Chas ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Parque Patricios ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Puerto Madero ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Recoleta ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Retiro ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saavedra ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Crist�bal ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Nicol�s ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Telmo ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' V�lez S�rsfield ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Versalles ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Crespo ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa del Parque ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Devoto ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Gral. Mitre ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Lugano ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Luro ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Ort�zar ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Pueyrred�n ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Real ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Riachuelo ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Santa Rita ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Soldati ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Urquiza ')),3,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aconquija ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ancasti ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Andalgal� ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Antofagasta ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bel�n ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capay�n ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capital ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 4 ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Corral Quemado ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Alto ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Rodeo ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' F.Mamerto Esqui� ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Fiambal� ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Hualf�n ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Huillapima ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ica�o ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Puerta ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Juntas ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Londres ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Altos ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Varela ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mutqu�n ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pacl�n ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pomano ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pozo de La Piedra ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Puerta de Corral ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Puerta San Jos� ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Recreo ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' SFV de 4 ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Fernando ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Fernando del Valle ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Mar�a ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Rosa ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saujil ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tapso ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tinogasta ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Valle Viejo ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Vil ')),4,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Avi� Tera� ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Barranqueras ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Basail ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Campo Largo ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capital ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capit�n Solari ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Charadai ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Charata ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chorotis ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ciervo Petiso ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cnel. Du Graty ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Ben�tez ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Elisa ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col. Popular ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Colonias Unidas ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Concepci�n ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Corzuela ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Costa Lai ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Sauzalito ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Enrique Uri�n ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Fontana ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Fte. Esperanza ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gancedo ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Capdevila ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Pi�ero ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. San Mart�n ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Vedia ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Hermoso Campo ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' I. del Cerrito ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' JJ Castelli ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Clotilde ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Eduvigis ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Escondida ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Leonesa ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Tigra ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Verde ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laguna Blanca ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laguna Limpia ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lapachito ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Bre�as ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Garcitas ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Palmas ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Frentones ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Machagai ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Makall� ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Margarita Bel�n ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Miraflores ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Misi�n N. Pompeya ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Napenay ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pampa Almir�n ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pampa del Indio ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pampa del Infierno ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pdcia. de La Plaza ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pdcia. Roca ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pdcia. Roque S�enz Pe�a ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pto. Bermejo ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pto. Eva Per�n ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Puero Tirol ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Puerto Vilelas ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quitilipi ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Resistencia ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' S�enz Pe�a ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Samuh� ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Bernardo ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Silvina ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Taco Pozo ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tres Isletas ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa �ngela ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Berthet ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa R. Bermejito ')),5,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Apeleg ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Beleiro ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Epulef ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alto R�o Sengerr ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Buen Pasto ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Camarones ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carrenleuf� ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cholila ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' C. Centinela ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col�n Conhu� ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Comodoro Rivadavia ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Corcovado ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cushamen ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Dique F. Ameghino ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Dolav�n ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Dr. R. Rojas ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Hoyo ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Mait�n ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Epuy�n ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Esquel ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Facundo ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gaim�n ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gan Gan ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gastre ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gdor. Costa ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gualjaina ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' J. de San Mart�n ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lago Blanco ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lago Puelo ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lagunita Salada ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Plumas ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Altares ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso de los Indios ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso del Sapo ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pto. Madryn ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pto. Pir�mides ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rada Tilly ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rawson ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Mayo ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Pico ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sarmiento ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Teca ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Telsen ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Trelew ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Trevelin ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Veintiocho de Julio ')),6,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Achiras ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Adelia Mar�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Agua de Oro ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alcira Gigena ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Santa Mar�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alejandro Roca ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alejo Ledesma ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alicia ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Almafuerte ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alpa Corral ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alta Gracia ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alto Alegre ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alto de Los Quebrachos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Altos de Chipi�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Amboy ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ambul ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ana Zumar�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Anisacate ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arg�ello ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arias ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyito ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Algod�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Cabral ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Los Patos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Asunci�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Atahona ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ausonia ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Avellaneda ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ballesteros ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ballesteros Sud ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Balneario ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ba�ado de Soto ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bell Ville ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bengolea ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Benjam�n Gould ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Berrotaran ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bialet Masa ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bouwer ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Brinkmann ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Buchardo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bulnes ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cabalango ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Calamuchita ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Calch�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Calch�n Oeste ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Calmayo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Camilo Aldao ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Caminiaga ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ca�ada de Luque ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ca�ada de Machado ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ca�ada de R�o Pinto ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ca�ada del Sauce ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Canales ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Candelaria Sud ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capilla de Remedios ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capilla de Sit�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capilla del Carmen ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capilla del Monte ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capital ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capit�n Gral B. O�Higgins ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carnerillo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carril�bo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Casa Grande ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cavanagh ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cerro Colorado ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chaj�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chalacea ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cha�ar Viejo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chancani ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Charbonier ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Charras ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chaz�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chilibroste ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chucul ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chu�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chu�a Huasi ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Churqui Ca�ada ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cienaga Del Coro ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cintra ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Almada ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Anita ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Barge ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Bismarck ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Bremen ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Caroya ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col. Italiana ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cnel. Iturraspe ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col. Las Cuatro Esquinas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Las Pichanas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Marina ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col. Prosperidad ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel San Bartolom� ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col. San Pedro ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Tirolesa ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Vicente Ag�ero ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Videla ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Vignaud ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Waltelina ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Colazo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Comechones ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Conlara ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Copacabana ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Baigorria ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Moldes ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Corral de Bustos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Corralito ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cosqu�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Costa Sacate ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cruz Alta ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cruz de Ca�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cruz del Eje ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cuesta Blanca ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Decano Funes ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Del Campillo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Despe�aderos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Devoto ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Diego de Rojas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Dique Chico ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Ara�ado ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Brete ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Chacho ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Crisp�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Fort�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Manzano ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Rastreador ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Rodeo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El T�o ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Elena ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Embalse ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Esquina ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Estaci�n Gral. Paz ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Estaci�n Ju�rez Celman ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Estancia de Guadalupe ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Estancia Vieja ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Etruria ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Eufrasio Loza ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Falda del Carmen ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Freyre ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Baldissera ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Cabrera ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Deheza ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Fotheringham ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Levalle ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Roca ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guanaco Muerto ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guasapampa ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guatimozina ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gutenberg ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Hernando ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Huanchillas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Huerta Grande ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Huinca Renanco ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Idiaz�bal ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Impira ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Inriville ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Isla Verde ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ital� ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' James Craik ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jes�s Mar�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jovita ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Justiniano Posse ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Km 658 ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' LV Mansilla ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Batea ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Calera ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Carlota ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Carolina ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Cautiva ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Cesira ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Cruz ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Cumbre ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Cumbrecita ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Falda ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Francia ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Granja ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Higuera ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Laguna ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Paisanita ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Palestina ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 12 ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Paquita ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Para ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Paz ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Playa ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Playosa ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Poblaci�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Posta ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Puerta ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Quinta ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Rancherita ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Rinconada ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Serranita ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Tordilla ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laborde ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laboulaye ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laguna Larga ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Acequias ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Albahacas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Arrias ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Bajadas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Caleras ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Calles ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Ca�adas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Gramillas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Higueras ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Isletillas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Coyunturas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Palmas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Pe�as ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Pe�as Sud ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Perdices ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Playas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Rabonas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Saladas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Tapias ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Varas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Varillas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Vertientes ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Leguizam�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Leones ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Cedros ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Cerrillos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Cha�aritos (CE) ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Chanaritos (RS) ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Cisnes ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Cocos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los C�ndores ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Hornillos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Hoyos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los M�stoles ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Molinos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Pozos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Reartes ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Surgentes ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Talares ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Zorros ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lozada ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Luca ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Luque ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Luyaba ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Malague�o ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Malena ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Malvinas Argentinas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Manfredi ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Maquinista Gallini ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Marcos Ju�rez ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Marull ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Matorrales ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mattaldi ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mayu Sumaj ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Media Naranja ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Melo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mendiolaza ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mi Granja ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mina Clavero ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Miramar ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Morrison ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Morteros ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Buey ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mte. Cristo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mte. De Los Gauchos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Le�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Ma�z ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Ralo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nicol�s Bruzone ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' N�tinger ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nono ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nueva 7 ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Obispo Trejo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Olaeta ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Oliva ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Olivares San Nicol�s ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Onagolty ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Oncativo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ordo�ez ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pacheco De Melo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pampayasta N. ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pampayasta S. ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Panaholma ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pascanas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pasco ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso del Durazno ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso Viejo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pilar ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pinc�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Piquill�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Plaza de Mercedes ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Plaza Luxardo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Porte�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Potrero de Garay ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pozo del Molle ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pozo Nuevo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Italiano ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Puesto de Castro ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Punta del Agua ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quebracho Herrado ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quilino ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rafael Garc�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ranqueles ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rayo Cortado ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Reducci�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rinc�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Bamba ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Ceballos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Cuarto ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o de Los Sauces ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Primero ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Segundo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Tercero ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rosales ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rosario del Saladillo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sacanta ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sagrada Familia ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saira ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saladillo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sald�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salsacate ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salsipuedes ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sampacho ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Agust�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Antonio de Arredondo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Antonio de Lit�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Basilio ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Carlos Minas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Clemente ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Esteban ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Francisco ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Ignacio ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Javier ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jer�nimo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Joaqu�n ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� de La Dormida ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� de Las Salinas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Lorenzo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Marcos Sierras ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Marcos Sud ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Pedro ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Pedro N. ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Roque ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Vicente ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Catalina ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Elena ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Eufemia ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Mar�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sarmiento ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saturnino M.Laspiur ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salsa Arriba ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sebasti�n Elcano ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Seeber ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Segunda Usina ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Serrano ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Serrezuela ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Templo de Sgo. ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Silvio Pellico ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Simb�lico ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sinsacate ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Rosa de Calamuchita ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Rosa de R�o Primero ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Suco ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tala Ca�ada ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tala Huasi ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Talaini ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tancacha ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tanti ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tesino ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tinoco ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' T�o Pujio ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Toledo')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Toro Pujio')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tosno')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tosquita')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tr�nsito')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tuclame')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tutti')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ucacha')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Unquillo')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Valle de Anisacate')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Valle Hermoso')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('V�lez Sarfield')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Viamonte')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Vicu�a Mackenna')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Allende')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Amancay')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Ascasubi')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Candelaria N.')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Carlos Paz')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Cerro Azul')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Ciudad de Am�rica')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Ciudad Pque Los Reartes')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Concepci�n del T�o ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Cura Brochero ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa de Las Rosas ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa de Mar�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa de Pocho ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa de Soto ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa del Dique ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa del Prado ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa del Rosario ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa del Totoral ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Dolores ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa El Chancay ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Elisa ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Flor Serrana ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Fontana ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Giardino ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Gral. Belgrano ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Guti�rrez ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Huidobro ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa La Bolsa ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Los Aromos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Los Patos ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Mar�a ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Nueva ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Pque. Santa Ana ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Pque. S�quiman ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Quillinzo ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Rossi ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Rumipal ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa San Esteban ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa San Isidro ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa 21 ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Sarmiento (GR) ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Sarmiento (SA) ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Tulumba ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Valeria ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Yacanto ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Washington ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Wenceslao Escalante ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ycho Cruz Sierras ')),7,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alvear ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bella Vista ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ber�n de Astrada ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bonpland ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ca� Cati ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capital ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chavarr�a ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel C. Pellegrini ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col. Libertad ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Liebig ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Sta Rosa ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Concepci�n ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cruz de Los Milagros ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Curuz�-Cuati� ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Empedrado ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Esquina ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Estaci�n Torrent ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Felipe Yofr� ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Garruchos ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gdor. Agr�nomo ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gdor. Mart�nez ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Goya ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guaviravi ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Herlitzka ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ita-Ibate ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Itat� ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ituzaing� ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jos� Rafael G�mez ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Juan Pujol ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Cruz ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lavalle ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lomas de Vallejos ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Loreto ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mariano I. Loza ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mburucuy� ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mercedes ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mocoret� ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mte. Caseros ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nueve de Julio ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Palmar Grande ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Parada Pucheta ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso de La Patria ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso de Los Libres ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pedro R. Fern�ndez ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Perugorr�a ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Libertador ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ramada Paso ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Riachuelo ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saladas ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Antonio ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Carlos ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Cosme ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Lorenzo ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('20 del Palmar ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Miguel ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Roque ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Ana ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Luc�a ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santo Tom� ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salsa ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tabay ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tapebicu� ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tatacua ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Virasoro ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yapey� ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yatait� Calle ')),8,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alarc�n ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alcaraz ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alcaraz N. ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alcaraz S. ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Asunci�n ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Brasilera ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Elgenfeld ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Grapschental ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Ma. Luisa ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Protestante ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Salto ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea San Antonio (G) ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea San Antonio (P) ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea 19 ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea San Miguel ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea San Rafael ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Spatzenkutter ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Sta. Mar�a ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Sta. Rosa ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aldea Valle Mar�a ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Altamirano Sur ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Antelo ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Antonio Tom�s ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aranguren ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Bar� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Burgos ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Cl� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Corralito ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo del Medio ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Maturrango ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Palo Seco ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Banderas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Basavilbaso ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Betbeder ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bovril ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Caseros ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ceibas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cerrito ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chajar� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chilcas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Clodomiro Ledesma ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Alemana ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Avellaneda ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Avigdor ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Ayu� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cnel. Baylina ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cnel. Carrasco ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Celina ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Cerrito ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Crespo')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Elia')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Ensayo')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Gral. Roca')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. La Argentina')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Merou')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Oficial N�3')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Oficial N�13')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Oficial N�14')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Oficial N�5')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Reffino')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Tunas')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Virar�')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col�n')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Concepci�n del Uruguay')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Concordia')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Conscripto Bernardi')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Costa Grande')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Costa San Antonio')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Costa Uruguay N.')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Costa Uruguay S.')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Crespo')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Crucecitas 3�')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Crucecitas 7�')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Crucecitas 8�')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cuchilla Redonda')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Curtiembre')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Diamante')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Distrito 6�')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Distrito Cha�ar')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Distrito Chiqueros')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Distrito Cuarto')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Distrito Diego L�pez')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Distrito Pajonal')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Distrito Sauce')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Distrito Tala')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Distrito Talitas')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Don Crist�bal 1� Secci�n')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Don Crist�bal 2� Secci�n')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Durazno')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Cimarr�n')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Gramillal')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Palenque')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Pingo')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Quebracho')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Redom�n')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Solar')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Enrique Carbo')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('9')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Espinillo N.')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estaci�n Campos')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estaci�n Escri�a')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estaci�n Lazo')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estaci�n Ra�ces')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estaci�n Yer�a')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estancia Grande')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estancia L�baros')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estancia Racedo')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estancia Sol�')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estancia Yuquer�')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estaquitas')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Faustino M. Parera')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Febre')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Federaci�n')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Federal')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gdor. Echag�e')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gdor. Mansilla')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gilbert')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gonz�lez Calder�n')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gral. Almada')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gral. Alvear')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gral. Campos')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gral. Galarza')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gral. Ram�rez')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gualeguay')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gualeguaych�')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gualeguaycito')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Guardamonte')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hambis')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hasenkamp')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hernandarias')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hern�ndez')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Herrera')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hinojal')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hocker')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ing. Sajaroff')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Irazusta')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Isletas')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' JJ De Urquiza ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jubileo ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Clarita ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Criolla ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Esmeralda ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Florida ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Fraternidad ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Hierra ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Ollita ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Paz ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Picada ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Providencia ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Verbena ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laguna Ben�tez ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Larroque ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Cuevas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Garzas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Guachas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Mercedes ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Moscas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Mulitas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Toscas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laurencena ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Libertador San Mart�n ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Loma Limpia ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Ceibos ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Charr�as ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Conquistadores ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lucas Gonz�lez ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lucas N. ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lucas S. 1� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lucas S. 2� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Maci� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mar�a Grande ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mar�a Grande 2� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' M�danos ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mojones N. ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mojones S. ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mu�eca Molino ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Redondo ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Montoya ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mulas Grandes ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' �ancay ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nogoy� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nueva Escocia ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nueva Vizcaya ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Omb� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Oro Verde ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paran� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pasaje Guayaquil ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pasaje Las Tunas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso de La Arena ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso de La Laguna ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso de Las Piedras ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso Duarte ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pastor Britos ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pedernal ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Perdices ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Picada Ber�n ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Piedras Blancas ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Primer Distrito Cuchilla ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Primero de Mayo ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pronunciamiento ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pto. Algarrobo ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pto. Ibicuy ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Brugo ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Cazes ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Gral. Belgrano ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Liebig ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Puerto Yeru� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Punta del Monte ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quebracho ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quinto Distrito ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ra�ces Oeste ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rinc�n de Nogoy� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rinc�n del Cinto ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rinc�n del Mu�eco ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rinc�n del Gato ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rocamora ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rosario del Tala ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Benito ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Cipriano ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Ernesto ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Gustavo ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jaime ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� de Feliciano ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Justo ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Marcial ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Pedro ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Ram�rez ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Ram�n ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Roque ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Salvador ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San V�ctor ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Ana ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Anita ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Elena ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Luc�a ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Luisa ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salsa de Luna ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salsa Montrull ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salsa Pinto ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salsa Sur ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Segu� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sir Leonard ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sosa ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tabossi ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tezanos Pinto ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ubajay ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Urdinarrain ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vinente de Septiembre ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' V�a ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Victoria ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Clara ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa del Rosario ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Dom�nguez ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Elisa ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Fontana ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Gdor. Etchevehere ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Mantero ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Paranacito ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Urquiza ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villaguay ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Walter Moss ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yacar� ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yeso Oeste ')),9,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Buena Vista ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Clorinda ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Pastoril ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cte. Fontana ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Colorado ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Espinillo ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Estanislao Del Campo ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 10 ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Fort�n Lugones ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Lucio V. Mansilla ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Manuel Belgrano ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Mosconi ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gran Guardia ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Herradura ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ibarreta ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ing. Ju�rez ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laguna Blanca ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cuello Laguna Naick ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laguna Yema ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Lomitas ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Chiriguanos ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mayor V. Villafa�e ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Misi�n San Fco. ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Palo Santo ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Piran� ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pozo del Maza ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Riacho He-He ')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Hilario')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Mart�n II')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Siete Palmas')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Subteniente Per�n')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tres Lagunas')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Dos Trece')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Escolar')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Gral. G�emes')),10,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Abdon Castro Tolay')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Abra Pampa')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Abralaite')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Aguas Calientes')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arrayanal')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Barrios')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Caimancito')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Calilegua')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cangrejillos')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Caspala')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Catu�')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cieneguillas')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Coranzulli')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cusi-Cusi')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Aguilar')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Carmen')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El C�ndor')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Fuerte')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Piquete')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Talar')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fraile Pintado')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hip�lito Yrigoyen')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Huacalera')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Humahuaca')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Esperanza')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Mendieta')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Quiaca')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ledesma')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Libertador Gral. San Martin')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Maimara')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Mina Pirquitas')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Monterrico')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Palma Sola')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Palpal�')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pampa Blanca')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pampichuela')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Perico')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Puesto del Marqu�s')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Puesto Viejo')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pumahuasi')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Purmamarca')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Rinconada')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Rodeitos')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Rosario de R�o Grande')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Antonio')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Francisco')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Pedro')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Rafael')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Salvador')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Santa Ana')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Santa Catalina')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Santa Clara')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Susques')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tilcara')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tres Cruces')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tumbaya')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Valle Grande')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Vinalito')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Volc�n ')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yala ')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yav� ')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yuto ')),11,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Abramo ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Adolfo Van Praet ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Agustoni ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Algarrobo del �guila ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alpachiri ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alta Italia ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Anguil ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arata ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ataliva Roca ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bernardo Larroude ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bernasconi ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Caleuf� ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carro Quemado ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Catril� ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ceballos ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chacharramendi ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Bar�n ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col. Santa Mar�a ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Conhelo ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Hilario Lagos ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cuchillo-C� ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Doblas ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Dorila ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Eduardo Castex ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Embajador Martini ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Falucho ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Acha ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Manuel Campos ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Pico ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guatrach� ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ing. Luiggi ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Intendente Alvear ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jacinto Arauz ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Adela ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Humada ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Maruja ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 12 ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Reforma ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Limay Mahuida ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lonquimay ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Loventuel ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Luan Toro ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Macach�n ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Maisonnave ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mauricio Mayer ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Metileo ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Miguel Can� ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Miguel Riglos ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Nieves ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Parera ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Per� ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pichi-Huinca ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Puelches ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Puel�n ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quehue ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quem� Quem� ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quetrequ�n ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rancul ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Realic� ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Relmo ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rol�n ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rucanelo ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sara ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Espeluzzi ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Isabel ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Rosa ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Teresa ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tel�n ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Toay ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tom�s M. de Anchorena ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Trenel ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Unanue ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Uriburu ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Veinticinco de Mayo ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' V�rtiz ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Victorica ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Mirasol ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Winifreda ')),12,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arauco ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capital ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Castro Barros ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chamical ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chilecito ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel F. Varela ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Famatina ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. AVPe�aloza ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Belgrano ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. JF Quiroga ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Lamadrid ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Ocampo ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. San Mart�n ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Independencia ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rosario Penaloza ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Blas de Los Sauces ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sanagasta ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vinchina ')),13,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capital ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chacras de Coria ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Dorrego ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gllen ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Godoy Cruz ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Alvear ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guymall�n ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jun�n ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Paz ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Heras ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lavalle ')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Luj�n')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Luj�n De Cuyo')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Maip�')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Malarg�e')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Rivadavia')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Carlos')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Mart�n')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Rafael')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Sta. Rosa')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tunuy�n')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tupungato')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Nueva')),14,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Alba Posse')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Almafuerte')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ap�stoles')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arist�bulo Del Valle')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arroyo Del Medio')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Azara')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bdo. De Irigoyen')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bonpland')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ca� Yari')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Campo Grande')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Campo Ram�n')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Campo Viera')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Candelaria')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Capiov�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Caraguatay')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cdte. Guacurar�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cerro Azul')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cerro Cor�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Alberdi')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Aurora')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Delicia')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Polana')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Victoria')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Wanda')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Concepci�n De La Sierra')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Corpus')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Dos Arroyos')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Dos de Mayo')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Alc�zar')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Dorado')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Soberbio')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Esperanza')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('F. Ameghino')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fachinal')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Garuhap�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Garup�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gdor. L�pez')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gdor. Roca')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gral. Alvear')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gral. Urquiza')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Guaran�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('H. Yrigoyen')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Iguaz�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Itacaruar�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Jard�n Am�rica')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Leandro N. Alem')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Libertad')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Loreto')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Los Helechos')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('M�rtires')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('15')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Moj�n Grande')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Montecarlo')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Nueve de Julio')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ober�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Olegario V. Andrade')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Panamb�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Posadas')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Profundidad')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pto. Iguaz�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pto. Leoni')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pto. Piray')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pto. Rico')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ruiz de Montoya')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Antonio')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Ignacio')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Javier')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Jos�')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Mart�n')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Pedro')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Vicente')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Santiago De Liniers')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Santo Pipo')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Sta. Ana')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Sta. Mar�a')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tres Capones')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Veinticinco de Mayo')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Wanda')),15,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Aguada San Roque')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Alumin�')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Andacollo')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('A�elo')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bajada del Agrio')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Barrancas')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Buta Ranquil')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Capital')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Caviahu�')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Centenario')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Chorriaca')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Chos Malal')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cipolletti')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Covunco Abajo')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Coyuco Cochico')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cutral C�')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Cholar')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Huec�')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Sauce')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gua�acos')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Huinganco')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Coloradas')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Lajas')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Ovejas')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Loncopu�')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Los Catutos')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Los Chihuidos')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Los Miches')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Manzano Amargo')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('16')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Octavio Pico')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Paso Aguerre')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pic�n Leuf�')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Piedra del Aguila')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pilo Lil')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Plaza Huincul')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Plottier')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Quili Malal')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ram�n Castro')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Rinc�n de Los Sauces')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Mart�n de Los Andes')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Patricio del Cha�ar')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santo Tom�s ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sauzal Bonito ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Senillosa ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Taquimil�n ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tricao Malal ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Varvarco ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Cur� Leuvu ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa del Nahueve ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa del Puente Pic�n Leuv� ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa El Choc�n ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa La Angostura ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Pehuenia ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Traful ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vista Alegre ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Zapala ')),16,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aguada Cecilio ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aguada de Guerra ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' All�n ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo de La Ventana ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arroyo Los Berros ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bariloche ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Calte. Cordero ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Campo Grande ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Catriel ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cerro Polic�a ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cervantes ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chelforo ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chimpay ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chinchinales ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chipauquil ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Choele Choel ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cinco Saltos ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cipolletti ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Clemente Onelli ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Col�n Conhue ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Comallo ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Comic� ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cona Niyeu ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Belisle ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cubanea ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Darwin ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Dina Huapi ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Bols�n ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Ca�n ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Manso ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Conesa ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Enrique Godoy ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Fern�ndez Oro ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Roca ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guardia Mitre ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ing. Huergo ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ing. Jacobacci ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laguna Blanca ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lamarque ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Grutas ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Menucos ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Luis Beltr�n ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mainqu� ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mamuel Choique ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Maquinchao ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mencu� ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mtro. Ramos Mex�a ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nahuel Niyeu ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Naupa Huen ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' �orquinco ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ojos de Agua ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso de Agua ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Paso Flores ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pe�as Blancas ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pichi Mahuida ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pilcaniyeu ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pomona ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Prahuaniyeu ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rinc�n Treneta ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Chico ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Colorado ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Roca ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Antonio Oeste ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Javier ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sierra Colorada ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sierra Grande ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sierra Pailem�n ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Valcheta ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Valle Azul ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Viedma ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Llanqu�n ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Mascardi ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Regina ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yaminu� ')),17,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' A. Saravia ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aguaray ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Angastaco ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Anim�n� ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cachi ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cafayate ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Campo Quijano ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Campo Santo ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capital ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cerrillos ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chicoana ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Sta. Rosa ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Moldes ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Bordo ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Carril ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Galp�n ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Jard�n ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Potrero ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Quebrachal ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Tala ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Embarcaci�n ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Ballivian ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. G�emes ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Mosconi ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gral. Pizarro ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guachipas ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Hip�lito Yrigoyen ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Iruy� ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Isla De Ca�as ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' JV Gonz�lez ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Caldera ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Candelaria ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Merced ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Poma ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Vi�a ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Lajitas ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Toldos ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Met�n ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Molinos ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nazareno ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Or�n ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Payogasta ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pichanal ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Prof. S. Mazza ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Piedras ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rivadavia Banda Norte ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rivadavia Banda Sur ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rosario de La Frontera ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rosario de Lerma ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saclant�s ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 18 ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Antonio ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Carlos ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� De Met�n ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Ram�n ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Victoria E. ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Victoria O. ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tartagal ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tolar Grande ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Urundel ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vaqueros ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa San Lorenzo ')),18,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Albard�n ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Angaco ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Calingasta ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capital ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Caucete ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chimbas ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Iglesia ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Jachal ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nueve de Julio ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pocito ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rawson ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rivadavia ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' 19 ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Mart�n ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Luc�a ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sarmiento ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ullum ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Valle F�rtil ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Veinticinco de Mayo ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Zonda ')),19,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alto Pelado ')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alto Pencoso ')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Anchore�a ')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arizona ')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bagual ')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Balde ')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Batavia')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Beazley')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Buena Esperanza')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Candelaria')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Capital')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Carolina')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Carpinter�a')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Concar�n')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cortaderas')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Morro')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Trapiche')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Volc�n')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fort�n El Patria')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fortuna')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fraga')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Juan Jorba')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Juan Llerena')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Juana Koslay')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Justo Daract')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Calera')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Florida')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Punilla')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Toma')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Lafinur')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Aguadas')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Chacras')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Lagunas')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Vertientes')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Lavaisse')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Leandro N. Alem')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Los Molles')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Luj�n')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Mercedes')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Merlo')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Naschel')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Navia')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Nogol�')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Nueva Galia')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Papagayos')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Paso Grande')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Potrero de Los Funes')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Quines')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Renca')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Saladillo')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Francisco')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Ger�nimo')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Mart�n')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('San Pablo')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Santa Rosa de Conlara')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Talita')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tilisarao')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Uni�n')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa de La Quebrada')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa de Praga')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa del Carmen')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Gral. Roca')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Larca')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Villa Mercedes')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Zanjitas')),20,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Calafate')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Caleta Olivia')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ca�ad�n Seco')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Comandante Piedrabuena')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Calafate')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Chalt�n')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gdor. Gregores')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hip�lito Yrigoyen')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Jaramillo')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Koluel Kaike')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Heras')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Los Antiguos')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Perito Moreno')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pico Truncado')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pto. Deseado')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pto. San Juli�n')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Pto. 21')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('R�o Cuarto')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('R�o Gallegos')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('R�o Turbio')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Tres Lagos')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Veintiocho De Noviembre')),21,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Aar�n Castellanos')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Acebal')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Aguar� Grande')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Albarellos')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Alcorta')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Aldao')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Alejandra')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('�lvarez')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ambrosetti')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Amen�bar')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ang�lica')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Angeloni')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arequito')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arminda')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Armstrong')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arocena')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arroyo Aguiar')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arroyo Ceibal')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arroyo Leyes')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arroyo Seco')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arruf�')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Arteaga')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ataliva')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Aurelia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Avellaneda')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Barrancas')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bauer Y Sigel')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bella Italia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Berabev�')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Berna')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bernardo de Irigoyen')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bigand')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bombal')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bouquet')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Bustinza')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cabal')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cacique Ariacaiquin')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cafferata')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Calchaqu�')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Campo Andino')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Campo Piaggio')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ca�ada de G�mez')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ca�ada del Ucle')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ca�ada Rica')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ca�ada Rosqu�n')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Candioti')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Capital')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Capit�n Berm�dez')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Capivara')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Carcara��')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Carlos Pellegrini')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Carmen')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Carmen Del Sauce')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Carreras')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Carrizales')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Casalegno')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Casas')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Casilda')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Castelar')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Castellanos')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cayast�')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cayastacito')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Centeno')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cepeda')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ceres')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Chab�s')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cha�ar Ladeado')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Chapuy')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Chovet')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Christophersen')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Classon')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cnel. Arnold')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cnel. Bogado')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cnel. Dominguez')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Cnel. Fraga')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Aldao')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Ana')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Belgrano')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Bicha')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Bigand')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Bossi')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Cavour')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Cello')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Dolores')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Dos Rosas')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Dur�n')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Iturraspe')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Margarita')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Mascias')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Raquel')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. Rosa')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Col. San Jos�')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Constanza')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Coronda')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Correa')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Crispi')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Culul�')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Curupayti')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Desvio Arij�n')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Diaz')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Diego de Alvear')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Egusquiza')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Araz�')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Rab�n')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Sombrerito')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('El Tr�bol')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Elisa')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Elortondo')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Emilia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Empalme San Carlos')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Empalme Villa Constitucion')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Esmeralda')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Esperanza')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estaci�n Alvear')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Estacion Clucellas')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Esteban Rams')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Esther')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Esustolia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Eusebia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Felicia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fidela')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fighiera')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Firmat')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Florencia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fort�n Olmos')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Franck')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fray Luis Beltr�n')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Frontera')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Fuentes')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Funes')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gaboto')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Galisteo')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('G�lvez')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Garabalto')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Garibaldi')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gato Colorado')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gdor. Crespo')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gessler')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Godoy')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Golondrina')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gral. Gelly')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gral. Lagos')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Granadero Baigorria')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Gregoria Perez De Denis')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Grutly')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Guadalupe N.')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('G�deken')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Helvecia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hersilia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hipat�a')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Huanqueros')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hugentobler')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Hughes')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Humberto 1�')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Humboldt')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ibarlucea')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ing. Chanourdie')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Intiyaco')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Ituzaing�')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Jacinto L. Ar�uz')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Josefina')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Juan B. Molina')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Juan de Garay')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Juncal')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Brava')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Cabral')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Camila')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Chispa')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Clara')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Criolla')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Gallareta')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Lucila')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Pelada')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Penca')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Rubia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Sarita')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('La Vanguardia')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Labordeboy')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Laguna Paiva')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Landeta')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Lanteri')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Larrechea')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Avispas')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM('Las Bandurrias')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Garzas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Palmeras ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Parejas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Petacas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Rosas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Toscas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Tunas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lazzarino ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lehmann ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Llambi Campbell ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Logro�o ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Loma Alta ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' L�pez ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Amores ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Card�s ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Laureles ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Molinos ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Quirquinchos ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lucio V. L�pez ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Luis Palacios ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ma. Juana ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ma. Luisa ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ma. Susana ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ma. Teresa ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Maciel ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mayo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Malabrigo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Marcelino Escalada ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Margarita ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Matilde ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mau� ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' M�ximo Paz ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Melincu� ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Miguel Torres ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Mois�s Ville ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monigotes ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monje ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Oscuridad ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Vera ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Montefiore ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Montes de Oca ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Murphy ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' �anducita ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nar� ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nelson ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nicanor E. Molinas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nuevo Torino ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Oliveros ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Palacios ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pav�n ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pav�n Arriba ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pedro G�mez Violonchelo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' P�rez ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Peyrano ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Piamonte ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pilar ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pi�ero ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Plaza Clucellas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Portugalete ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pozo Borrado ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Progreso ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Providencia ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pte. Roca ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Andino ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Esther ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Gral. San Mart�n ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Irigoyen ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Marini ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Mu�oz ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pueblo Uranga ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pujato ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pujato N. ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rafaela ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ramay�n ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ramona ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Reconquista ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Recreo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ricardone ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rivadavia ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rold�n ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Romang ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rosario ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rueda ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rufino ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sa Pereira ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saguier ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Saladero M. Cabal ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Salto Grande ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Agust�n ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Antonio de Obligado ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Bernardo (NJ) ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Bernardo (SJ) ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Carlos Centro ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Carlos N. ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Carlos S. ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Crist�bal ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Eduardo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Eugenio ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Fabi�n ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Fco. de Santa F� ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Genaro ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Genaro N. ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Gregorio ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Guillermo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Javier ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jer�nimo del Sauce ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jer�nimo N. ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jer�nimo S. ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jorge ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� de La Esquina ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� del Rinc�n ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Justo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Lorenzo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Mariano ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Mart�n de Las Escobas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Mart�n N. ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Vicente ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sancti Spititu ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sanford ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santo Domingo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santo Tom� ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santurce ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sargento Cabral ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sarmiento ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sastre ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sauce Viejo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Serodino ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Silva ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Soldini ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Soledad ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sutomayor ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Clara de Buena Vista ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Clara de Saguier ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Isabel ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Margarita ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Mar�a Centro ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Mar�a N. ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Rosa ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Teresa ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Suardi ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sunchales ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Susana ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tacuarend� ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tacural ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tartagal ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Teodelina ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Teobaldo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Timb�es ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Toba ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tortugas ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tostado ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Totoras ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Trail ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Venado Tuerto ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vera ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vera y Pintado ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Videla ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vila ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Amelia ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Ana ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Ca�as ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Constituci�n ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Elo�sa ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Gdor. G�lvez ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Guillermina ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Minetti ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Mugueta ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Ocampo ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa San Jos� ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Saralegui ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Trinidad ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villada ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Virginia ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Carreteador ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Zavalla ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Zen�n Pereira ')),22,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' A�atuya ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' �rraga ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bandera ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bandera Bajada ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Beltr�n ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Brea Pozo ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Campo Gallo ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capital ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Chilca Juliana ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Choya ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Clodomira ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cnel. Alpina ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel Dora ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Coronel El Simbolar Robles ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Bobadal ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Charco ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Moj�n ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Estaci�n Atamisqui ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Estaci�n Simbolar ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Fern�ndez ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Fort�n Inca ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Fr�as ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Garza ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gramilla ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Guardia Escolta ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Herrera ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ica�o ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ing. Forres ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Banda ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Ca�ada ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Laprida ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lavalle ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Loreto ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Jur�es ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los N��ez ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Pirpintos ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Quiroga ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Telares ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lugones ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Malbr�n ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Matara ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Medell�n ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Quemado ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nueva Esperanza ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Nueva Francia ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Palo Negro ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pampa de Los Guanacos ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pinto ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pozo Hondo ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quimil� ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Real Sayana ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sachayoj ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Pedro de Guasay�n ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Selva ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sol de Julio ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sumampa ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Suncho Corral ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Taboada ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tapso ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Termas de R�o Hondo ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tintina ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tomas Young ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vilelas ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Atamisqui ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa La Punta ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Ojo de Agua ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa R�o Hondo ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Salavina ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Uni�n ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Vilmer ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Weisburd ')),23,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Grande ')),24,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tolhuin ')),24,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ushuaia ')),24,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Acheral ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Agua Dulce ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Aguilares ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alderetes ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alpachiri ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Alto Verde ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Amaicha del Valle ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' �mberes ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ancajuli ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Arcadia ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Atahona ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Banda del R�o Sali ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Bella Vista ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Buena Vista ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Burruyac� ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Capit�n C�ceres ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Cevil Redondo ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Choromoro ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ciudacita ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Colalao del Valle ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Colombres ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Concepci�n ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Delf�n Gallo ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Bracho ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Cadillal ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Cercado ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Cha�ar ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Manantial ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Moj�n ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Mollar ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Naranjito ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Naranjo ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Polear ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Puestito ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Sacrificio ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' El Timb� ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Escaba ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Esquina ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Estaci�n Ar�oz ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Famaill� ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gastone ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gdor. Garmendia ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Gdor. Piedrabuena ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Graneros ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Huasa Pampa ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' JB Alberdi ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Cocha ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Esperanza ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Florida ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Ramada ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' La Trinidad ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lamadrid ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Cejas ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Talas ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Las Talitas ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Bulacio ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los G�mez ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Nogales ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Pereyra ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los P�rez ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Puestos ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Ralos ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Sarmientos ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Los Sosa ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Lules ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' M. Garc�a Fern�ndez ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Manuela Pedraza ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Medinas ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monte Bello ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monteagudo ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Monteros ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Padre Monti ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Pampa Mayo ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Quilmes ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Raco ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Ranchillos ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Chico ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Colorado ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' R�o Seco ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Rumi Punco ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Andr�s ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Felipe ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Ignacio ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Javier ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Jos� ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Miguel de 25 ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Pedro ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' San Pedro de Colalao ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Santa Rosa de Leales ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sgto. Moya ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Siete de Abril ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Simoca ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Soldado Maldonado ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Ana ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Cruz ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Sta. Luc�a ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Taco Ralo ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Taf� del Valle ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Taf� Viejo ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Tapia ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Teniente Berdina ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Trancas ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Belgrano ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Benjam�n Araoz ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Chiligasta ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa de Leales ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Villa Quinteros ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Y�nima ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yerba Buena ')),25,1,'Admin');
insert into localidad (localidad_nombre,localidad_provincia_id ,localidad_estado_id ,localidad_usuario_alta) values (UPPER(TRIM(' Yerba Buena (S) ')),25,1,'Admin');

-- Create table 'tipo_domicilio'
CREATE TABLE tipo_domicilio (
    tipo_domicilio_id BIGINT PRIMARY KEY IDENTITY(1,1),
    tipo_domicilio_descripcion NVARCHAR(MAX) NOT NULL,
    tipo_domicilio_estado_id BIGINT NOT NULL,
    tipo_domicilio_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    tipo_domicilio_fecha_modificacion DATETIMEOFFSET,
    tipo_domicilio_fecha_baja DATETIMEOFFSET,
    tipo_domicilio_usuario_alta NVARCHAR(MAX) NOT NULL,
    tipo_domicilio_usuario_modificacion NVARCHAR(MAX),
    tipo_domicilio_usuario_baja NVARCHAR(MAX),
    tipo_domicilio_observaciones NVARCHAR(MAX),
    FOREIGN KEY (tipo_domicilio_estado_id) REFERENCES estado (estado_id)
);


-- Create table 'domicilio'
CREATE TABLE domicilio (
    domicilio_id BIGINT PRIMARY KEY IDENTITY(1,1),
    domicilio_cliente_id BIGINT NOT NULL,
    domicilio_tipo_domicilio_id BIGINT NOT NULL,
    domicilio_direccion NVARCHAR(MAX) NOT NULL,
    domicilio_barrio NVARCHAR(MAX),
    domicilio_ubicacion NVARCHAR(MAX),
    domicilio_localidad_id BIGINT NOT NULL,
    domicilio_estado_id BIGINT NOT NULL,
    domicilio_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    domicilio_fecha_modificacion DATETIMEOFFSET,
    domicilio_fecha_baja DATETIMEOFFSET,
    domicilio_usuario_alta NVARCHAR(MAX) NOT NULL,
    domicilio_usuario_modificacion NVARCHAR(MAX),
    domicilio_usuario_baja NVARCHAR(MAX),
    domicilio_observaciones NVARCHAR(MAX),
    FOREIGN KEY (domicilio_cliente_id) REFERENCES cliente (cliente_id),
    FOREIGN KEY (domicilio_tipo_domicilio_id) REFERENCES tipo_domicilio (tipo_domicilio_id),
    FOREIGN KEY (domicilio_localidad_id) REFERENCES localidad (localidad_id),
    FOREIGN KEY (domicilio_estado_id) REFERENCES estado (estado_id)
);

-- Create table 'medio_pago'
CREATE TABLE medio_pago (
    medio_pago_id BIGINT PRIMARY KEY IDENTITY(1,1),
    medio_pago_descripcion VARCHAR(2000) NOT NULL,
    medio_pago_estado_id BIGINT NOT NULL,
    medio_pago_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    medio_pago_fecha_modificacion DATETIMEOFFSET,
    medio_pago_fecha_baja DATETIMEOFFSET,
    medio_pago_usuario_alta NVARCHAR(MAX) NOT NULL,
    medio_pago_usuario_modificacion NVARCHAR(MAX),
    medio_pago_usuario_baja NVARCHAR(MAX),
    medio_pago_observaciones NVARCHAR(MAX),
    FOREIGN KEY (medio_pago_estado_id) REFERENCES estado (estado_id),
    CONSTRAINT medio_pago_descripcion_unico UNIQUE (medio_pago_descripcion)
);

-- Create table 'producto'
CREATE TABLE producto (
    producto_id BIGINT PRIMARY KEY IDENTITY(1,1),
    producto_nombre NVARCHAR(MAX) NOT NULL,
    producto_descripcion NVARCHAR(MAX),
    producto_estado_id BIGINT NOT NULL,
    producto_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    producto_fecha_modificacion DATETIMEOFFSET,
    producto_fecha_baja DATETIMEOFFSET,
    producto_usuario_alta NVARCHAR(MAX) NOT NULL,
    producto_usuario_modificacion NVARCHAR(MAX),
    producto_usuario_baja NVARCHAR(MAX),
    producto_observaciones NVARCHAR(MAX),
    FOREIGN KEY (producto_estado_id) REFERENCES estado (estado_id)
);

CREATE TABLE producto_precio_historial (
    producto_precio_historial_id BIGINT PRIMARY KEY IDENTITY(1,1),
    producto_precio_historial_producto_id BIGINT NOT NULL,
    producto_precio_historial_precio DECIMAL(10, 2) NOT NULL,
    producto_precio_historial_fecha DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    producto_precio_historial_estado_id BIGINT NOT NULL,
    producto_precio_historial_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    producto_precio_historial_fecha_modificacion DATETIMEOFFSET,
    producto_precio_historial_fecha_baja DATETIMEOFFSET,
    producto_precio_historial_usuario_alta NVARCHAR(MAX) NOT NULL,
    producto_precio_historial_usuario_modificacion NVARCHAR(MAX),
    producto_precio_historial_usuario_baja NVARCHAR(MAX),
    producto_precio_historial_observaciones NVARCHAR(MAX),
    FOREIGN KEY (producto_precio_historial_producto_id) REFERENCES producto (producto_id),
    FOREIGN KEY (producto_precio_historial_estado_id) REFERENCES estado (estado_id)
);

-- Create table 'pedido'
CREATE TABLE pedido (
    pedido_id BIGINT PRIMARY KEY IDENTITY(1,1),
    pedido_cliente_id BIGINT NOT NULL,
    pedido_domicilio_id BIGINT NOT NULL,
    pedido_direccion_entrega NVARCHAR(MAX) NOT NULL,
    pedido_total_productos INT NOT NULL,
    pedido_total_dinero DECIMAL(10, 2) NOT NULL,
    pedido_medio_pago_id BIGINT NOT NULL,
    pedido_estado_id BIGINT NOT NULL,
    pedido_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    pedido_fecha_modificacion DATETIMEOFFSET,
    pedido_fecha_baja DATETIMEOFFSET,
    pedido_usuario_alta NVARCHAR(MAX) NOT NULL,
    pedido_usuario_modificacion NVARCHAR(MAX),
    pedido_usuario_baja NVARCHAR(MAX),
    pedido_observaciones NVARCHAR(MAX),
    FOREIGN KEY (pedido_cliente_id) REFERENCES cliente (cliente_id),
    FOREIGN KEY (pedido_domicilio_id) REFERENCES domicilio (domicilio_id),
    FOREIGN KEY (pedido_medio_pago_id) REFERENCES medio_pago (medio_pago_id),
    FOREIGN KEY (pedido_estado_id) REFERENCES estado (estado_id)
);


-- Create table 'pedido_detalle'
CREATE TABLE pedido_detalle (
    pedido_detalle_id BIGINT  IDENTITY(1,1),
    pedido_detalle_pedido_id BIGINT  ,
    pedido_detalle_producto_id BIGINT NOT NULL,
    pedido_detalle_precio_individual DECIMAL(10, 2) NOT NULL,
    pedido_detalle_cantidad INT NOT NULL,
    pedido_detalle_estado_id BIGINT NOT NULL,
    pedido_detalle_fecha_alta DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    pedido_detalle_fecha_modificacion DATETIMEOFFSET,
    pedido_detalle_fecha_baja DATETIMEOFFSET,
    pedido_detalle_usuario_alta NVARCHAR(MAX) NOT NULL,
    pedido_detalle_usuario_modificacion NVARCHAR(MAX),
    pedido_detalle_usuario_baja NVARCHAR(MAX),
    pedido_detalle_observaciones NVARCHAR(MAX),
	PRIMARY KEY (pedido_detalle_id,pedido_detalle_pedido_id),
    FOREIGN KEY (pedido_detalle_pedido_id) REFERENCES pedido (pedido_id),
    FOREIGN KEY (pedido_detalle_producto_id) REFERENCES producto (producto_id),
    FOREIGN KEY (pedido_detalle_estado_id) REFERENCES estado (estado_id)
);