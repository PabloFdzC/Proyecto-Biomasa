--DROP DATABASE IF EXISTS [BiomasaAP]

--CREATE DATABASE [BiomasaAP]

--USE [BiomasaAP];
--GO

CREATE TABLE TipoUsuario(
	  [Id]					INT NOT NULL IDENTITY(1,1),
	  [Nombre]				VARCHAR(32) NOT NULL,
	  PRIMARY KEY CLUSTERED ([ID] ASC)
);

CREATE TABLE Unidad(
	  [Id]					INT NOT NULL IDENTITY(1,1),
	  [Nombre]				VARCHAR(32) NOT NULL,
	  PRIMARY KEY CLUSTERED ([ID] ASC)
);

CREATE TABLE Etiqueta(
	  [Id]					INT NOT NULL IDENTITY(1,1),
	  [Nombre]				VARCHAR(32) NOT NULL,
	  PRIMARY KEY CLUSTERED ([ID] ASC)
);

CREATE TABLE Usuario(
	  [Id]					INT NOT NULL IDENTITY(1,1),
	  [IdTipoUsuario]		INT NOT NULL,
	  [Nombre]				VARCHAR(32) NOT NULL,
	  [Telefono]			VARCHAR(16) NOT NULL,
	  [Email]				VARCHAR(32) NOT NULL,
	  [Contrasenia]			VARCHAR(32) NOT NULL,
	  [Activo]				BIT NOT NULL,
	  PRIMARY KEY CLUSTERED ([ID] ASC),
	  FOREIGN KEY ([IdTipoUsuario]) REFERENCES [dbo].[TipoUsuario] ([ID])
);

CREATE TABLE Biomasa(
	  [Id]					INT NOT NULL IDENTITY(1,1),
	  [IdUsuario]			INT NOT NULL,
	  [IdUnidad]			INT NOT NULL,
	  [Nombre]				VARCHAR(32) NOT NULL,
	  [Descripcion]			VARCHAR(256) NOT NULL,
	  [Precio]				MONEY NOT NULL,
	  [Cantidad]			INT NOT NULL,
	  [Activo]				BIT NOT NULL,
	  PRIMARY KEY CLUSTERED ([ID] ASC),
	  FOREIGN KEY ([IdUsuario]) REFERENCES [dbo].[Usuario] ([ID]),
	  FOREIGN KEY ([IdUnidad]) REFERENCES [dbo].[Unidad] ([ID])
);

CREATE TABLE BiomasaXEtiqueta(
	  [Id]					INT NOT NULL IDENTITY(1,1),
	  [IdBiomasa]			INT NOT NULL,
	  [IdEtiqueta]			INT NOT NULL,
	  PRIMARY KEY CLUSTERED ([ID] ASC),
	  FOREIGN KEY ([IdBiomasa]) REFERENCES [dbo].[Biomasa] ([ID]),
	  FOREIGN KEY ([IdEtiqueta]) REFERENCES [dbo].[Etiqueta] ([ID])
);

CREATE TABLE Compras(
	  [Id]					INT NOT NULL IDENTITY(1,1),
	  [IdBiomasa]			INT NOT NULL,
	  [IdUsuario]			INT NOT NULL,
	  [Cantidad]			INT NOT NULL,
	  [Precio]				MONEY NOT NULL
);

--DELETE FROM [dbo].[TipoUsuario];
--DBCC CHECKIDENT([TipoUsuario], RESEED, 0)
--SELECT * FROM [dbo].[TipoUsuario]

--DELETE FROM [dbo].[Unidad];
--DBCC CHECKIDENT([Unidad], RESEED, 0)
--SELECT * FROM [dbo].[Unidad]

--DELETE FROM [dbo].[Etiqueta];
--DBCC CHECKIDENT([Etiqueta], RESEED, 0)
--SELECT * FROM [dbo].[Etiqueta]

--DELETE FROM [dbo].[Usuario];
--DBCC CHECKIDENT([Usuario], RESEED, 0)
--SELECT * FROM [dbo].[Usuario]

--DELETE FROM [dbo].[Biomasa];
--DBCC CHECKIDENT([Biomasa], RESEED, 0)
--SELECT * FROM [dbo].[Biomasa]

--DELETE FROM [dbo].[BiomasaXEtiqueta];
--DBCC CHECKIDENT([BiomasaXEtiqueta], RESEED, 0)
--SELECT * FROM [dbo].[BiomasaXEtiqueta]

--DELETE FROM [dbo].[Compras];
--DBCC CHECKIDENT([Compras], RESEED, 0)
--SELECT * FROM [dbo].[Compras]