const Conexion = require("./ConexionBaseDatos.js");

class ConexionSng{
  static #instance = null;
  #conexion = null;

  static getInstance(){
    if(this.#instance == null){
      this.#instance = new ConexionSng();
    }
    return this.#instance;
  }

  getConexion(){
    if(this.#conexion == null){
      this.#conexion = new Conexion();
    }
    return this.#conexion;
  }
}

module.exports = ConexionSng;