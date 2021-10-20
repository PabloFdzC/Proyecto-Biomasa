USE [BiomasaAP];
GO

IF OBJECT_ID('[dbo].[CreateCompras]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[CreateCompras] 
END 
GO
CREATE PROC [dbo].[CreateCompras] 
    @IdBiomasa INT,
	@IdUsuario INT,
	@Cantidad INT,
	@Precio MONEY
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		INSERT INTO [dbo].[Compras]([IdBiomasa],
									[IdUsuario],
									[Cantidad],
									[Precio])
		SELECT @IdBiomasa,
				@IdUsuario,
				@Cantidad,
				@Precio
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[ReadCompras]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[ReadCompras] 
END 
GO
CREATE PROC [dbo].[ReadCompras] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT B.Nombre,U.Nombre,C.[Cantidad],C.[Precio]
		FROM [dbo].[Compras] C
		INNER JOIN [dbo].[Biomasa] B ON C.IdBiomasa = B.Id
		INNER JOIN [dbo].[Unidad] U ON C.IdUsuario = U.Id
		WHERE C.[Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[UpdateCompras]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[UpdateCompras] 
END 
GO
CREATE PROC [dbo].[UpdateCompras] 
    @Id INT,
	@Cantidad INT,
	@Precio MONEY
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		UPDATE [dbo].[Compras]
		SET [Cantidad] = @Cantidad,
			[Precio] = @Precio
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[DeleteCompras]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[DeleteCompras] 
END 
GO
CREATE PROC [dbo].[DeleteCompras] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		DELETE FROM [dbo].[Compras]
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO