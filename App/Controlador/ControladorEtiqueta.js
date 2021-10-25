const Etiqueta = require("../Modelo/NombreId.js");
const SngConexion = require("./SngConexion.js");

class ControladorEtiqueta{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = SngConexion.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexion();
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query('CreateEtiqueta', elem);
    return r;
  }

  // Devolver una lista con los objetos Etiqueta
  // elem puede ser {Id: string que hay que convertir a número
  // entero, EsLista: string con true o false} en este caso solo
  // se busca una etiqueta y preferiblemente se devuelve solo un
  // objeto Etiqueta en una lista. Sino solo viene EsLista y entonces
  // se buscan en la base todas las etiquetas, aquí EsLista no es relevante
  async mostrar(elem){
    var r
    if(elem.Id){
      r = await this.#conexionBaseDatos.query('ReadEtiqueta', elem);
    } else {
      r = await this.#conexionBaseDatos.query('GetEtiquetas', {});
    }
    var datos = [];
    for(var e of r.recordset){
      datos.push(this.convertirAObjeto(e));
    }
    return datos; 
  }

  async modificar(elem){
    var r = await this.#conexionBaseDatos.query('UpdateEtiqueta', elem);
    return r; 
  }

  async eliminar(elem){
    var r = await this.#conexionBaseDatos.query('DeleteEtiqueta', elem);
    return r; 
  }

  convertirAObjeto(elem){
    return new Etiqueta(elem.Id, elem.Nombre);
  }

}

module.exports = ControladorEtiqueta;