class TipoUsuario{
  
  async agregar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/agregarTipoUsuario', 'POST', i, "Tipo de usuario creado con éxito");
  }

  async modificar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarTipoUsuario', 'POST', i, "Tipo de usuario modificado con éxito");
  }

  async eliminar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/eliminarTipoUsuario', 'POST', i, "Tipo de usuario eliminado con éxito");
  }

  async mostrar(datos){
    var s = Utilidades.objetoAParametrosGet(datos);
    return await Utilidades.ajaxCall('/mostrarTipoUsuario'+s, 'GET', {});
  }
}