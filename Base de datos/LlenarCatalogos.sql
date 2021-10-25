EXEC [dbo].[CreateTipoUsuario] 'Administrador'
EXEC [dbo].[CreateTipoUsuario] 'Comprador'
EXEC [dbo].[CreateTipoUsuario] 'Vendedor'

EXEC [dbo].[CreateUnidad] 'Toneladas'
EXEC [dbo].[CreateUnidad] 'Kilogramos'
EXEC [dbo].[CreateUnidad] 'Metros cubicos'

EXEC [dbo].[CreateEtiqueta] 'Liquido'
EXEC [dbo].[CreateEtiqueta] 'Residuos'
EXEC [dbo].[CreateEtiqueta] 'Solido'
EXEC [dbo].[CreateEtiqueta] 'Humedo'
EXEC [dbo].[CreateEtiqueta] 'Seco'

SELECT * FROM [dbo].[TipoUsuario]
SELECT * FROM [dbo].[Unidad]
SELECT * FROM [dbo].[Etiqueta]
