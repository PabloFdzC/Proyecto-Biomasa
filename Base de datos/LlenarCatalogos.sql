--EXEC [dbo].[CreateTipoUsuario] 'Administrador'
--EXEC [dbo].[CreateTipoUsuario] 'Comprador'
--EXEC [dbo].[CreateTipoUsuario] 'Vendedor'

--SELECT * FROM [dbo].[TipoUsuario]

EXEC [dbo].[CreateUnidad] 'Toneladas'

EXEC [dbo].[CreateEtiqueta] 'Liquido'
EXEC [dbo].[CreateEtiqueta] 'Residuos'
EXEC [dbo].[CreateEtiqueta] 'Solido'
