OperacionesBiomasa = require('./OperacionesBiomasa.js');
OperacionesEtiqueta = require('./OperacionesEtiqueta.js');
OperacionesUsuario = require('./OperacionesUsuario.js');
OperacionesNavegacion = require('./OperacionesNavegacion.js');

class SngOperaciones{
  static #instance = null;
  #operacionesBiomasa = null;
  #operacionesEtiqueta = null;
  #operacionesUsuario = null;
  #operacionesNavegacion = null;

  constructor(){}
  
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new SngOperaciones();
    }
    return this.#instance;
  }

  getOperacionesBiomasa(){
    if(this.#operacionesBiomasa == null){
      this.#operacionesBiomasa = OperacionesBiomasa;
    }
    return this.#operacionesBiomasa;
  }

  getOperacionesEtiqueta(){
    if(this.#operacionesEtiqueta == null){
      this.#operacionesEtiqueta = OperacionesEtiqueta;
    }
    return this.#operacionesEtiqueta;
  }

  getOperacionesUsuario(){
    if(this.#operacionesUsuario == null){
      this.#operacionesUsuario = OperacionesUsuario;
    }
    return this.#operacionesUsuario;
  }

  getOperacionesNavegacion(){
    if(this.#operacionesNavegacion == null){
      this.#operacionesNavegacion = OperacionesNavegacion;
    }
    return this.#operacionesNavegacion;
  }

}

module.exports = SngOperaciones;