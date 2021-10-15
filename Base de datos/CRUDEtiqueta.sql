USE [BiomasaAP];
GO

IF OBJECT_ID('[dbo].[CreateEtiqueta]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[CreateEtiqueta] 
END 
GO
CREATE PROC [dbo].[CreateEtiqueta] 
    @Nombre VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		INSERT INTO [dbo].[Etiqueta]([Nombre])
		SELECT @Nombre
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[ReadEtiqueta]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[ReadEtiqueta] 
END 
GO
CREATE PROC [dbo].[ReadEtiqueta] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT [Nombre]
		FROM [dbo].[Etiqueta]
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[UpdateEtiqueta]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[UpdateEtiqueta] 
END 
GO
CREATE PROC [dbo].[UpdateEtiqueta] 
    @Id INT,
	@Nombre VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		UPDATE [dbo].[Etiqueta]
		SET [Nombre] = @Nombre
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[DeleteEtiqueta]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[DeleteEtiqueta] 
END 
GO
CREATE PROC [dbo].[DeleteEtiqueta] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		DELETE FROM [dbo].[Etiqueta]
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO