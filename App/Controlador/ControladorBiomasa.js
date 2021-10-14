const Biomasa = require("./../Modelo/Biomasa.js");
const SngConexion = require("./SngConexion.js");

class ControladorBiomasa{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = SngConexion.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexion();
  }

  // En todos hay que ver cómo es que r es devuelto por la base de datos

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query('agregarBiomasa', elem);
    return r;
  }

  // Hay que ver como es r y devolver una lista con los objetos Biomasa
  // elem puede ser {Id: string que hay que convertir a número entero}
  //entonces se busca solo uno y preferiblemente se devuelve solo un
  //objeto Biomasa en una lista. O puede ser {MiBiomasa:string que con true o false, Id}
  // entonces dependiendo del valor de MiBiomasa uno hace el select de la base de datos que
  // incluya solo los resultados del usuario si es true y si es false excluye al usuario de
  // los resultados
  async mostrar(elem){
    var r = await this.#conexionBaseDatos.query('mostrarBiomasa', elem);
    return r; 
  }

  async modificar(elem){
    var r = await this.#conexionBaseDatos.query('modificarBiomasa', elem);
    return r; 
  }

  async eliminar(elem){
    var r = await this.#conexionBaseDatos.query('eliminarBiomasa', elem);
    return r; 
  }


}

module.exports = ControladorBiomasa;