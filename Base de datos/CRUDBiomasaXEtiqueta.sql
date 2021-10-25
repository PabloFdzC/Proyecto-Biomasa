USE [BiomasaAP];
GO

IF OBJECT_ID('[dbo].[CreateBiomasaXEtiqueta]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[CreateBiomasaXEtiqueta] 
END 
GO
CREATE PROC [dbo].[CreateBiomasaXEtiqueta] 
    @IdBiomasa INT,
	@IdEtiqueta INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		INSERT INTO [dbo].[BiomasaXEtiqueta]([IdBiomasa],
									[IdEtiqueta])
		SELECT @IdBiomasa,
				@IdEtiqueta
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[ReadBiomasaXEtiqueta]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[ReadBiomasaXEtiqueta] 
END 
GO
CREATE PROC [dbo].[ReadBiomasaXEtiqueta] 
    @Id INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		SELECT [IdBiomasa],[IdEtiqueta]
		FROM [dbo].[BiomasaXEtiqueta]
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[UpdateBiomasaXEtiqueta]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[UpdateBiomasaXEtiqueta] 
END 
GO
CREATE PROC [dbo].[UpdateBiomasaXEtiqueta] 
    @Id INT,
	@IdEtiqueta INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		UPDATE [dbo].[BiomasaXEtiqueta]
		SET [IdEtiqueta] = @IdEtiqueta
		WHERE [Id] = @Id
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO

IF OBJECT_ID('[dbo].[DeleteBiomasaXEtiqueta]') IS NOT NULL
BEGIN 
    DROP PROC [dbo].[DeleteBiomasaXEtiqueta] 
END 
GO
CREATE PROC [dbo].[DeleteBiomasaXEtiqueta] 
    @IdBiomasa INT,
	@IdEtiqueta INT
AS
BEGIN
SET NOCOUNT ON
	BEGIN TRY
		DELETE FROM [dbo].[BiomasaXEtiqueta]
		WHERE [IdBiomasa] = @IdBiomasa AND [IdEtiqueta] = @IdEtiqueta
				
	END TRY

	BEGIN CATCH
		SELECT -1
	END CATCH
SET NOCOUNT OFF
END
GO