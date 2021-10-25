class Unidad{
  
  async agregar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/agregarUnidad', 'POST', i, "Unidad creada con éxito");
  }

  async modificar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarUnidad', 'POST', i, "Unidad modificada con éxito");
  }

  async eliminar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/eliminarUnidad', 'POST', i, "Unidad eliminada con éxito");
  }

  async mostrar(datos){
    var s = Utilidades.objetoAParametrosGet(datos);
    return await Utilidades.ajaxCall('/mostrarUnidad'+s, 'GET', {});
  }
}