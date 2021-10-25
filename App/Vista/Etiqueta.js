class Etiqueta{
  
  async agregar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/agregarEtiqueta', 'POST', i, "Etiqueta creada con éxito");
  }

  async modificar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarEtiqueta', 'POST', i, "Etiqueta modificada con éxito");
  }

  async eliminar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/eliminarEtiqueta', 'POST', i, "Etiqueta eliminada con éxito");
  }

  async mostrar(datos){
    var s = Utilidades.objetoAParametrosGet(datos);
    return await Utilidades.ajaxCall('/mostrarEtiqueta'+s, 'GET', {});
  }
}