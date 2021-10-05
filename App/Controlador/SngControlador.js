const ControladorBiomasa = require('./ControladorBiomasa.js');
const ControladorEtiqueta = require('./ControladorEtiqueta.js');
const ControladorUsuario = require('./ControladorUsuario.js');

class SngControlador{
  static #instance = null;
  #controladorBiomasa = null;
  #controladorEtiqueta = null;
  #controladorUsuario = null;

  constructor(){}
  
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new SngControlador();
    }
    return this.#instance;
  }

  getControladorBiomasa(){
    if(this.#controladorBiomasa == null){
      this.#controladorBiomasa = new ControladorBiomasa();
    }
    return this.#controladorBiomasa;
  }

  getControladorEtiqueta(){
    if(this.#controladorEtiqueta == null){
      this.#controladorEtiqueta = new ControladorEtiqueta();
    }
    return this.#controladorEtiqueta;
  }

  getControladorUsuario(){
    if(this.#controladorUsuario == null){
      this.#controladorUsuario = new ControladorUsuario();
    }
    return this.#controladorUsuario;
  }

}

module.exports = SngControlador;