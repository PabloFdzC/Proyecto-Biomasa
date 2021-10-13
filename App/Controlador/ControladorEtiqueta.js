const Etiqueta = require("./../Modelo/Etiqueta.js");
const SngConexion = require("./SngConexion.js");

class ControladorEtiqueta{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = SngConexion.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexion();
  }

  // Las funciones que no tienen comentarios son prácticamente
  // copiar y pegar lo que hay en ControladorBiomasa

  async agregar(elem){
    
  }

  // Devolver una lista con los objetos Biomasa
  // elem puede ser {Id: string que hay que convertir a número
  // entero, EsLista: string con true o false} en este caso solo
  // se busca una etiqueta y preferiblemente se devuelve solo un
  // objeto Etiqueta en una lista. Sino solo viene EsLista y entonces
  // se buscan en la base todas las etiquetas, aquí EsLista no es relevante
  async mostrar(elem){
    
  }

  async modificar(elem){
    
  }

  async eliminar(elem){
    
  }


}

module.exports = ControladorEtiqueta;