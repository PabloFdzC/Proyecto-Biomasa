class NuevoAdministrador {
  async registrar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/agregarAdministrador', 'POST', i, "Cuenta creada con éxito");
  }
}