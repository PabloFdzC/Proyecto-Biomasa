OperacionesBiomasa = require('./OperacionesBiomasa.js');
OperacionesEtiqueta = require('./OperacionesEtiqueta.js');
OperacionesUsuario = require('./OperacionesUsuario.js');
OperacionesTipoUsuario = require('./OperacionesTipoUsuario.js');
OperacionesUnidad = require('./OperacionesUnidad.js');
OperacionesNavegacion = require('./OperacionesNavegacion.js');

class SngOperaciones{
  static #instance = null;
  #operacionesBiomasa = null;
  #operacionesEtiqueta = null;
  #operacionesUsuario = null;
  #operacionesTipoUsuario = null;
  #operacionesNavegacion = null;
  #operacionesUnidad = null;

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

  getOperacionesTipoUsuario(){
    if(this.#operacionesTipoUsuario == null){
      this.#operacionesTipoUsuario = OperacionesTipoUsuario;
    }
    return this.#operacionesTipoUsuario;
  }

  getOperacionesUnidad(){
    if(this.#operacionesUnidad == null){
      this.#operacionesUnidad = OperacionesUnidad;
    }
    return this.#operacionesUnidad;
  }

  getOperacionesNavegacion(){
    if(this.#operacionesNavegacion == null){
      this.#operacionesNavegacion = OperacionesNavegacion;
    }
    return this.#operacionesNavegacion;
  }

}

module.exports = SngOperaciones;