class Usuario{
  async modificar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarUsuario', 'POST', i, "Datos modificados con éxito");
  }
}