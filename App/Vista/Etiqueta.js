class Etiqueta{
  
  async agregar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/agregarEtiqueta', 'POST', i, "Etiqueta creado con éxito");
  }

  async modificar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarEtiqueta', 'POST', i, "Etiqueta modificado con éxito");
  }

  async eliminar(nombreEtiqueta){
    var d = JSON.stringify({nombreEtiqueta});
    return await Utilidades.ajaxCall('/eliminarEtiqueta', 'POST', d, "Etiqueta eliminado con éxito");
  }

  async mostrar(esLista){
    return await Utilidades.ajaxCall('/mostrarEtiquetas?esLista='+esLista, 'GET', {});
  }
}