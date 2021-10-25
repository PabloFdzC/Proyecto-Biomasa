const ControladorBiomasa = require('./ControladorBiomasa.js');
const ControladorEtiqueta = require('./ControladorEtiqueta.js');
const ControladorUsuario = require('./ControladorUsuario.js');
const ControladorTipoUsuario = require('./ControladorTipoUsuario.js');
const ControladorUnidad = require('./ControladorUnidad.js');

class SngControlador{
  static #instance = null;
  #controladorBiomasa = null;
  #controladorEtiqueta = null;
  #controladorUsuario = null;
  #controladorTipoUsuario = null;
  #controladorUnidad = null;

  constructor(){}
  
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new SngControlador();
    }
    return this.#instance;
  }

  getControladorBiomasa(){
    if(this.#controladorBiomasa == null){
      this.#controladorBiomasa = new ControladorBiomasa(
        this.getControladorEtiqueta(),
        this.getControladorUsuario(),
        this.getControladorUnidad()
        );
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
      this.#controladorUsuario = new ControladorUsuario(
        this.getControladorTipoUsuario()
      );
    }
    return this.#controladorUsuario;
  }

  getControladorTipoUsuario(){
    if(this.#controladorTipoUsuario == null){
      this.#controladorTipoUsuario = new ControladorTipoUsuario();
    }
    return this.#controladorTipoUsuario;
  }

  getControladorUnidad(){
    if(this.#controladorUnidad == null){
      this.#controladorUnidad = new ControladorUnidad();
    }
    return this.#controladorUnidad;
  }

}

module.exports = SngControlador;