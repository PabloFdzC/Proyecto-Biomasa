const Usuario = require("./../Modelo/Usuario.js");
const SngConexion = require("./SngConexion.js");

class ControladorUsuario{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = SngConexion.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexion();
  }

  // Las funciones que no tienen comentarios son prácticamente
  // copiar y pegar lo que hay en ControladorBiomasa

  async agregar(elem){
    
  }

  // Este depende de cómo lo vamos a hacer porque creo que no
  // mostramos a todos los usuarios entonces elem puede ser
  // solo {Id: string que hay que convertir a número}. A parte de
  // eso es bastante parecido al que está en ControladorBiomasa
  async mostrar(elem){
    
  }

  async modificar(elem){
    
  }

  async eliminar(elem){
    
  }

  // Hay que ver como es r para poder mandar los datos correctos
  async iniciarSesion(elem){
    var r = await this.#conexionBaseDatos.query('ingresar', elem);
    if(r.Id && r.TipoUsuario){
      var usuario = {Id: r.Id, TipoUsuario: r.TipoUsuario};
      return usuario;
    } else {
      throw {code: "ER_LOGIN"};
    }
  }


}

module.exports = ControladorUsuario;