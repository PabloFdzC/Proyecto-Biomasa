USE [BiomasaAP];
GO

IF OBJECT_ID('[dbo].[RegistrarUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[RegistrarUsuario] 
END 
GO
CREATE PROC [dbo].[RegistrarUsuario] 
    @IdTipoUsuario INT,
	@Nombre VARCHAR(32),
	@Telefono VARCHAR(16),
	@Email VARCHAR(32),
	@Contrasenia VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		IF NOT EXISTS (SELECT [Id] FROM [dbo].[Usuario] WHERE [Email] = @Email)
			BEGIN
				EXEC [dbo].[CreateUsuario] @IdTipoUsuario, @Nombre, @Telefono, @Email, @Contrasenia
				SELECT @@identity
			END
		ELSE
			BEGIN
				SELECT -2
			END
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[InicioSesion]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[InicioSesion]
END 
GO
CREATE PROC [dbo].[InicioSesion]
	@Email VARCHAR(32),
	@Contrasenia VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		IF EXISTS (SELECT [Id] FROM [dbo].[Usuario] WHERE [Email] = @Email AND [Contrasenia] = @Contrasenia)
			BEGIN
				SELECT US.[Id], TU.[Nombre] TipoUsuario FROM [dbo].[Usuario] US
				INNER JOIN [dbo].[TipoUsuario] TU ON US.[IdTipoUsuario] = TU.Id
				WHERE [Email] = @Email AND [Contrasenia] = @Contrasenia
			END
		ELSE
			BEGIN
				SELECT -2
			END
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[ComprarBiomasa]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[ComprarBiomasa]
END 
GO
CREATE PROC [dbo].[ComprarBiomasa]
	@IdBiomasa INT,
	@IdUsuario INT,
	@Cantidad INT,
	@Precio MONEY
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		IF ((SELECT [Cantidad] FROM [dbo].[Biomasa] WHERE [Id] = @IdBiomasa) > @Cantidad)
			BEGIN
				EXEC [dbo].[CreateCompras] @IdBiomasa, @IdUsuario, @Cantidad, @Precio

				UPDATE [dbo].[Biomasa]
				SET [Cantidad] = [Cantidad] - @Cantidad
				WHERE [Id] = @IdBiomasa
			END
		ELSE
			BEGIN
				SELECT -2
			END
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[GetBiomasa]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[GetBiomasa]
END 
GO
CREATE PROC [dbo].[GetBiomasa]
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT B.[Id], US.Nombre NombreUsuario, US.Id IdUsuario, UN.Id IdUnidad, UN.Nombre Unidad, B.Nombre, B.Descripcion, B.Precio, B.Cantidad
		FROM [dbo].[Biomasa] B
		INNER JOIN [dbo].[Usuario] US ON B.[IdUsuario] = US.Id
		INNER JOIN [dbo].[Unidad] UN ON B.IdUnidad = UN.Id
		WHERE B.[Activo] = 1 AND US.Activo = 1
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[BuscarBiomasa]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[BuscarBiomasa]
END 
GO
CREATE PROC [dbo].[BuscarBiomasa]
	@Parametro VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT B.[Id], US.Nombre NombreUsuario, US.Id IdUsuario, UN.Id IdUnidad, UN.Nombre Unidad, B.Nombre, B.Descripcion, B.Precio, B.Cantidad
		FROM [dbo].[Biomasa] B
		INNER JOIN [dbo].[Usuario] US ON B.[IdUsuario] = US.Id
		INNER JOIN [dbo].[Unidad] UN ON B.IdUnidad = UN.Id
		INNER JOIN [dbo].[BiomasaXEtiqueta] BE ON B.Id = BE.IdBiomasa
		INNER JOIN [dbo].[Etiqueta] E ON BE.IdEtiqueta = E.Id
		WHERE B.[Activo] = 1 AND US.Activo = 1
			AND ((B.Nombre LIKE '%'+ @Parametro +'%') 
			OR (US.Nombre LIKE '%'+ @Parametro +'%') 
			OR (UN.Nombre LIKE '%'+ @Parametro +'%') 
			OR (E.Nombre LIKE '%'+ @Parametro +'%'))
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[GetEtiquetas]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[GetEtiquetas]
END 
GO
CREATE PROC [dbo].[GetEtiquetas]
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT Id, Nombre
		FROM [dbo].[Etiqueta]
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[GetEtiquetasEnBiomasa]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[GetEtiquetasEnBiomasa]
END 
GO
CREATE PROC [dbo].[GetEtiquetasEnBiomasa]
	@IdBiomasa INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT E.Id, E.Nombre
		FROM [dbo].[BiomasaXEtiqueta] BE
		INNER JOIN [dbo].[Biomasa] B ON BE.IdBiomasa = B.Id
		INNER JOIN [dbo].[Etiqueta] E ON BE.IdEtiqueta = E.Id
		WHERE B.[Activo] = 1 AND BE.IdBiomasa = @IdBiomasa
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[GetBiomasaUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[GetBiomasaUsuario]
END 
GO
CREATE PROC [dbo].[GetBiomasaUsuario]
	@IdUsuario INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT B.[Id], US.Nombre NombreUsuario, US.Id IdUsuario, UN.Id IdUnidad, UN.Nombre Unidad, B.Nombre, B.Descripcion, B.Precio, B.Cantidad
		FROM [dbo].[Biomasa] B
		INNER JOIN [dbo].[Usuario] US ON B.[IdUsuario] = US.Id
		INNER JOIN [dbo].[Unidad] UN ON B.IdUnidad = UN.Id
		WHERE B.[Activo] = 1 
			AND US.Activo = 1 
			AND B.[IdUsuario] = @IdUsuario
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[GetUnidades]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[GetUnidades]
END 
GO
CREATE PROC [dbo].[GetUnidades]
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT Id, Nombre
		FROM [dbo].[Unidad]
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[GetComprasVendedor]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[GetComprasVendedor]
END 
GO
CREATE PROC [dbo].[GetComprasVendedor]
	@IdUsuario INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT B.Nombre, C.[Cantidad], C.[Precio], U.Nombre NombreUsuario, U.Telefono, U.Email, C.Id IdCompra
		FROM [dbo].[Compras] C
		INNER JOIN Biomasa B ON C.[IdBiomasa] = B.[Id]
		INNER JOIN Usuario U ON U.[Id] = C.[IdUsuario]
		WHERE B.[IdUsuario] = @IdUsuario
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[GetTipoUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[GetTipoUsuario]
END 
GO
CREATE PROC [dbo].[GetTipoUsuario]
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT Id, Nombre
		FROM [dbo].[TipoUsuario]
		WHERE Id != 1 AND Nombre != 'Administrador'
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[GetUsuarios]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[GetUsuarios]
END 
GO
CREATE PROC [dbo].[GetUsuarios]
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT Id, Nombre
		FROM [dbo].[Usuario]
		WHERE Activo = 1
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO