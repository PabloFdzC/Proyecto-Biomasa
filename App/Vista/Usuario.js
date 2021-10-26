class Usuario{
  async modificar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarUsuario', 'POST', i, "Datos modificados con éxito");
  }

  async mostrar(){
    return await Utilidades.ajaxCall('/mostrarUsuario', 'GET', {});
  }

  async eliminar(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/eliminarUsuario', 'POST', i, "Usuario eliminado con éxito");
  }
}