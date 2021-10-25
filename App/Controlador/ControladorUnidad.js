const Unidad = require("../Modelo/NombreId.js");
const SngConexion = require("./SngConexion.js");

class ControladorUnidad{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = SngConexion.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexion();
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query('CreateUnidad', elem);
    return r;
  }

  async mostrar(elem){
    var r;
    if(elem.Id){
      r = await this.#conexionBaseDatos.query('ReadUnidad', elem);
    } else {
      r = await this.#conexionBaseDatos.query('GetUnidades', {});
    }
    var datos = [];
    for(var e of r.recordset){
      datos.push(this.convertirAObjeto(e));
    }
    return datos; 
  }

  async modificar(elem){
    var r = await this.#conexionBaseDatos.query('UpdateUnidad', elem);
    return r; 
  }

  async eliminar(elem){
    var r = await this.#conexionBaseDatos.query('DeleteUnidad', elem);
    return r; 
  }

  convertirAObjeto(elem){
    return new Unidad(elem.Id, elem.Nombre);
  }

}

module.exports = ControladorUnidad;