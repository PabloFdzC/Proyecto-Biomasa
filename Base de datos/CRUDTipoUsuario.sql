USE [BiomasaAP];
GO

IF OBJECT_ID('[dbo].[CreateTipoUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[CreateTipoUsuario] 
END 
GO
CREATE PROC [dbo].[CreateTipoUsuario] 
    @Nombre VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		INSERT INTO [dbo].[TipoUsuario]([Nombre])
		SELECT @Nombre
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[ReadTipoUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[ReadTipoUsuario] 
END 
GO
CREATE PROC [dbo].[ReadTipoUsuario] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT [Nombre]
		FROM [dbo].[TipoUsuario]
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[UpdateTipoUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[UpdateTipoUsuario] 
END 
GO
CREATE PROC [dbo].[UpdateTipoUsuario] 
    @Id INT,
	@Nombre VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		UPDATE [dbo].[TipoUsuario]
		SET [Nombre] = @Nombre
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[DeleteTipoUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[DeleteTipoUsuario] 
END 
GO
CREATE PROC [dbo].[DeleteTipoUsuario] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		DELETE FROM [dbo].[TipoUsuario]
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO