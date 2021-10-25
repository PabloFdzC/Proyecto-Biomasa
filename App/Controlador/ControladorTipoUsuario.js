const TipoUsuario = require("../Modelo/NombreId.js");
const SngConexion = require("./SngConexion.js");

class ControladorTipoUsuario{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = SngConexion.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexion();
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query('CreateTipoUsuario', elem);
    return r;
  }

  async mostrar(elem){
    var r;
    if(elem.Id){
      r = await this.#conexionBaseDatos.query('ReadTipoUsuario', elem);
    } else {
      r = await this.#conexionBaseDatos.query('GetTipoUsuario', {});
    }
    var datos = [];
    for(var e of r.recordset){
      datos.push(this.convertirAObjeto(e));
    }
    return datos; 
  }

  async modificar(elem){
    var r = await this.#conexionBaseDatos.query('UpdateTipoUsuario', elem);
    return r; 
  }

  async eliminar(elem){
    var r = await this.#conexionBaseDatos.query('DeleteTipoUsuario', elem);
    return r; 
  }

  convertirAObjeto(elem){
    return new TipoUsuario(elem.Id, elem.Nombre);
  }

}

module.exports = ControladorTipoUsuario;