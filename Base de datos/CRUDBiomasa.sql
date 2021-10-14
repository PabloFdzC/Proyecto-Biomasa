USE [BiomasaAP];
GO

IF OBJECT_ID('[dbo].[CreateBiomasa]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[CreateBiomasa] 
END 
GO
CREATE PROC [dbo].[CreateBiomasa] 
    @IdUsuario INT,
	@IdUnidad INT,
	@Nombre VARCHAR(32),
	@Descripción VARCHAR(256),
	@Precio MONEY,
	@Cantidad INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		INSERT INTO [dbo].[Biomasa]([IdUsuario],
									[IdUnidad],
									[Nombre],
									[Descripcion],
									[Precio],
									[Cantidad],
									[Activo])
		SELECT @IdUsuario,
				@IdUnidad,
				@Nombre,
				@Descripción,
				@Precio,
				@Cantidad,
				1
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[ReadBiomasa]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[ReadBiomasa] 
END 
GO
CREATE PROC [dbo].[ReadBiomasa] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT [IdUsuario], [IdUnidad],[Nombre],[Descripcion],[Precio],[Cantidad],[Activo]
		FROM [dbo].[Biomasa]
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[UpdateBiomasa]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[UpdateBiomasa] 
END 
GO
CREATE PROC [dbo].[UpdateBiomasa] 
    @Id INT,
	@Nombre VARCHAR(32),
	@Descripción VARCHAR(256),
	@Precio MONEY,
	@Cantidad INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		UPDATE [dbo].[Biomasa]
		SET [Nombre] = @Nombre,
			[Descripcion] = @Descripción,
			[Precio] = @Precio,
			[Cantidad] = @Cantidad
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[DeleteBiomasa]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[DeleteBiomasa] 
END 
GO
CREATE PROC [dbo].[DeleteBiomasa] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		UPDATE [dbo].[Biomasa]
		SET [Activo] = 0
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO