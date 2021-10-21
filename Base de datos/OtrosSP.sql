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
				SELECT [Id] FROM [dbo].[Usuario] WHERE [Email] = @Email AND [Contrasenia] = @Contrasenia
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
----------------Por hacer----------------
IF OBJECT_ID('[dbo].[ComprarBiomasa]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[ComprarBiomasa]
END 
GO
CREATE PROC [dbo].[ComprarBiomasa]
	@Email VARCHAR(32),
	@Contrasenia VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		IF EXISTS (SELECT [Id] FROM [dbo].[Usuario] WHERE [Email] = @Email AND [Contrasenia] = @Contrasenia)
			BEGIN
				SELECT [Id] FROM [dbo].[Usuario] WHERE [Email] = @Email AND [Contrasenia] = @Contrasenia
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
----------------------------------------------------------------
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
		SELECT B.[Id], US.Nombre, UN.Nombre, B.Nombre, B.Descripcion, B.Precio, B.Cantidad
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
----------------Por terminar----------------
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
		SELECT B.[Id], US.Nombre, UN.Nombre, B.Nombre, B.Descripcion, B.Precio, B.Cantidad
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
--------------------------------------------------------------------------------
IF OBJECT_ID('[dbo].[GetEtiquetas]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[GetEtiquetas]
END 
GO
CREATE PROC [dbo].[GetEtiquetas]
	@IdBiomasa INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT E.Nombre
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