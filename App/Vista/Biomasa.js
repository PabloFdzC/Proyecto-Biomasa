class Biomasa{

  async agregar(info, listaEtiquetas){
    info.append("Etiquetas", JSON.stringify(listaEtiquetas));
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/agregarBiomasa', 'POST', i, "Biomasa agregada con éxito");
  }

  async modificar(info, listaEtiquetasA=[], listaEtiquetasE=[]){
    info.append("Etiquetas", JSON.stringify(listaEtiquetasA));
    info.append("EtiquetasE", JSON.stringify(listaEtiquetasE));
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarBiomasa', 'POST', i, "Biomasa modificada con éxito");
  }

  async mostrar(info){
    let s = Utilidades.objetoAParametrosGet(info);
    return await Utilidades.ajaxCall('/mostrarBiomasa'+s, 'GET', {});
  }

  async eliminar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/eliminarBiomasa', 'POST', i, "Se eliminó la biomasa");
  }

  async comprar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/compraBiomasa', 'POST', i, "Biomasa comprada con éxito");
  }

  async mostrarVentasBiomasa(){
    return await Utilidades.ajaxCall('/mostrarVentasBiomasa', 'GET', {});
  }

  async eliminarCompra(){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/eliminarCompra', 'POST', i, "Se eliminó con éxito");
  }
}