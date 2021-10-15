USE [BiomasaAP];
GO

IF OBJECT_ID('[dbo].[CreateUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[CreateUsuario] 
END 
GO
CREATE PROC [dbo].[CreateUsuario] 
    @IdTipoUsuario INT,
	@Nombre VARCHAR(32),
	@Telefono VARCHAR(16),
	@Email VARCHAR(32),
	@Contrasenia VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		INSERT INTO [dbo].[Usuario]([IdTipoUsuario],
									[Nombre],
									[Telefono],
									[Email],
									[Contrasenia],
									[Activo])
		SELECT @IdTipoUsuario,
				@Nombre,
				@Telefono,
				@Email,
				@Contrasenia,
				1
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[ReadUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[ReadUsuario] 
END 
GO
CREATE PROC [dbo].[ReadUsuario] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT TU.[Nombre], U.Nombre, U.Telefono, U.Email, U.Contrasenia, U.Activo
		FROM [dbo].[Usuario] U
		INNER JOIN [dbo].[TipoUsuario] TU
		ON U.IdTipoUsuario = TU.Id
		WHERE U.[Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[UpdateUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[UpdateUsuario] 
END 
GO
CREATE PROC [dbo].[UpdateUsuario] 
    @Id INT,
	@Nombre VARCHAR(32),
	@Telefono VARCHAR(16),
	@Contrasenia VARCHAR(32)
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		UPDATE [dbo].[Usuario]
		SET [Nombre] = @Nombre,
			[Telefono] = @Telefono,
			[Contrasenia] = @Contrasenia
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[DeleteUsuario]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[DeleteUsuario] 
END 
GO
CREATE PROC [dbo].[DeleteUsuario] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		UPDATE [dbo].[Usuario]
		SET [Activo] = 0
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO