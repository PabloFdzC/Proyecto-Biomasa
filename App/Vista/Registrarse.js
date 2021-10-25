class Registrarse{

  async registrar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/agregarUsuario', 'POST', i, "Cuenta creada con éxito");
  }

}