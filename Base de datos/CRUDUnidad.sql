USE [BiomasaAP];
GO

IF OBJECT_ID('[dbo].[CreateUnidad]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[CreateUnidad] 
END 
GO
CREATE PROC [dbo].[CreateUnidad] 
    @Nombre VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		INSERT INTO [dbo].[Unidad]([Nombre])
		SELECT @Nombre
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[ReadUnidad]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[ReadUnidad] 
END 
GO
CREATE PROC [dbo].[ReadUnidad] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT [Nombre]
		FROM [dbo].[Unidad]
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[UpdateUnidad]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[UpdateUnidad] 
END 
GO
CREATE PROC [dbo].[UpdateUnidad] 
    @Id INT,
	@Nombre VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		UPDATE [dbo].[Unidad]
		SET [Nombre] = @Nombre
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[DeleteUnidad]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[DeleteUnidad] 
END 
GO
CREATE PROC [dbo].[DeleteUnidad] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		DELETE FROM [dbo].[Unidad]
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO