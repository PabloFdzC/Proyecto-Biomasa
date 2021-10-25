EXEC [dbo].[CreateTipoUsuario] 'Administrador'
EXEC [dbo].[CreateTipoUsuario] 'Comprador'
EXEC [dbo].[CreateTipoUsuario] 'Vendedor'

--SELECT * FROM [dbo].[TipoUsuario]

EXEC [dbo].[RegistrarUsuario] 1, 'Administrador', '88888888', 'admin@admin.com', '1234'

EXEC [dbo].[CreateUnidad] 'Tonelada'
EXEC [dbo].[CreateUnidad] 'Metro cúbico'

EXEC [dbo].[CreateEtiqueta] 'Liquido'
EXEC [dbo].[CreateEtiqueta] 'Residuo'
EXEC [dbo].[CreateEtiqueta] 'Solido'
EXEC [dbo].[CreateEtiqueta] 'Leñoso'
EXEC [dbo].[CreateEtiqueta] 'Herbáceo'
