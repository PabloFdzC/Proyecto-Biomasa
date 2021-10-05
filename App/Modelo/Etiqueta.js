class Etiqueta{

  #id = -1;
  #nombre = "";
  
  constructor(id, nombre){
    this.id = id;
    this.nombre = nombre;
  }

  getId(){
    return this.#id;
  }
  
  getNombre(){
    return this.nombre;
  }
  
  setNombre(nombre){
    this.nombre = nombre;
  }
  
  }
  
module.exports = Etiqueta;