class Biomasa{

  async agregar(info, listaEtiquetas){
    info.append("etiquetas", JSON.stringify(listaEtiquetas));
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/agregarBiomasa', 'POST', i);
  }

  async modificar(info, listaEtiquetasA=[], listaEtiquetasE=[]){
    console.log(listaEtiquetasA);
    console.log(listaEtiquetasE);
    info.append("Etiquetas", JSON.stringify(listaEtiquetasA));
    info.append("EtiquetasE", JSON.stringify(listaEtiquetasE));
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarBiomasa', 'POST', i, "Biomasa modificada con éxito");
  }

  async mostrar(info){
    let s = Utilidades.objetoAParametrosGet(info);
    return await Utilidades.ajaxCall('/mostrarBiomasa'+s, 'GET', {});
  }

  async eliminar(email){
    var d = JSON.stringify({email});
    return await Utilidades.ajaxCall('/eliminarBiomasa', 'POST', d, "Se eliminó la biomasa");
  }

}