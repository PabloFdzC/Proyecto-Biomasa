EXEC [dbo].[RegistrarUsuario] 1, 'admin', '0', 'admin@gmai.com', 'contrasenia'

EXEC [dbo].[RegistrarUsuario] 3, 'Mi Biomasa', '20008888', 'mBiomasa@bio.com', 'biobio24'
EXEC [dbo].[RegistrarUsuario] 2, 'Perez y Hermanos', '20201919', 'perher19@gmai.com', 'perher19'
EXEC [dbo].[RegistrarUsuario] 2, 'Sapateria la Estrella', '24608848', 'zapEstrella@gmai.com', 'estrellas93'
EXEC [dbo].[RegistrarUsuario] 3, 'Siempre Verde', '20608181', 'verde@siempre.cr', 'siempreV48'

EXEC [dbo].[RegistrarUsuario] 3, 'Mi Biomasa', '0', 'mBiomasa@bio.com', 'biobio24'
EXEC [dbo].[RegistrarUsuario] 2, 'Mi Biomasa', '0', 'mBiomasa@bio.com', 'biobio24'
----------------------------------------------------------------------------------------

EXEC [dbo].[InicioSesion] 'admin@gmai.com', 'contrasenia'
EXEC [dbo].[InicioSesion] 'perher19@gmai.com', 'perher19'
EXEC [dbo].[InicioSesion] 'mBiomasa@bio.com', 'biobio24'
EXEC [dbo].[InicioSesion] 'mBiosa@bio.com', 'biobio24'
----------------------------------------------------------------------------------------

--SELECT * FROM [dbo].[Usuario]
SELECT * FROM [dbo].[Biomasa]
SELECT * FROM [dbo].[TipoUsuario]
SELECT * FROM [dbo].[Unidad]
SELECT * FROM [dbo].[Etiqueta]

EXEC [dbo].[CreateBiomasa] 2, 3, 'Mi Biomasa', 'Hecha en casa', 2600, 350
EXEC [dbo].[CreateBiomasa] 2, 1, 'Mi Biomasa 2', 'Hecha en casa', 3200, 51
EXEC [dbo].[CreateBiomasa] 2, 2, 'Mi Biomasa 3', 'Hecha en casa', 1900, 897
EXEC [dbo].[CreateBiomasa] 5, 2, 'Reciduos cosecha', 'Generada apartir de la cosecha', 1600, 852
EXEC [dbo].[CreateBiomasa] 5, 2, 'Cultivo energetico', 'Cultivado para hacer biomasa', 3700, 937
EXEC [dbo].[CreateBiomasa] 2, 3, 'Mi Biomasa', 'Hecha en casa', 2600, 350
EXEC [dbo].[CreateBiomasa] 2, 3, 'Mi Biomasa', 'Hecha en casa', 2600, 350
EXEC [dbo].[CreateBiomasa] 5, 3, 'Otros', 'Varios', 1300, 650
----------------------------------------------------------------------------------------

EXEC [dbo].[GetBiomasa]
EXEC [dbo].[GetBiomasaUsuario] 5
EXEC [dbo].[GetBiomasaUsuario] 2

EXEC [dbo].[GetTipoUsuario]
EXEC [dbo].[GetUnidades]
EXEC [dbo].[GetEtiquetas]