EXEC [dbo].[CreateTipoUsuario] 'Administrador'
EXEC [dbo].[CreateTipoUsuario] 'Comprador'
EXEC [dbo].[CreateTipoUsuario] 'Vendedor'

--SELECT * FROM [dbo].[TipoUsuario]

EXEC [dbo].[RegistrarUsuario] 1, 'Administrador', '88888888', 'admin@admin.com', '1234'

EXEC [dbo].[CreateUnidad] 'Tonelada'
EXEC [dbo].[CreateUnidad] 'Metro cúbico'
EXEC [dbo].[CreateUnidad] 'Kilogramos'


EXEC [dbo].[CreateEtiqueta] 'Líquido'
EXEC [dbo].[CreateEtiqueta] 'Residuo'
EXEC [dbo].[CreateEtiqueta] 'Sólido'
EXEC [dbo].[CreateEtiqueta] 'Leñoso'
EXEC [dbo].[CreateEtiqueta] 'Herbáceo'
EXEC [dbo].[CreateEtiqueta] 'Humedo'
EXEC [dbo].[CreateEtiqueta] 'Seco'