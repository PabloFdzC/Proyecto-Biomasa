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