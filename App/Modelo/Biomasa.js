class Biomasa{

  #id = -1;
  #nombre = "";
  #descripcion = "";
  #precio = 0.0;
  #cantidad = 0;
  #unidad = "";
  #etiquetas = [];
  #usuario = null;

  constructor(id, nombre, descripcion, precio, cantidad, unidad, etiquetas, usuario){

    this.#id = id;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#precio = precio;
    this.#cantidad = cantidad;
    this.#unidad = unidad;
    this.#etiquetas = etiquetas;
    this.#usuario = usuario;
  }

  getId(){
    return this.#id;
  }

  getNombre(){
    return this.#nombre;
  }

  getDescripcion(){
    return this.#descripcion;
  }

  getPrecio(){
    return this.#precio;
  }

  getCantidad(){
    return this.#cantidad;
  }

  getUnidad(){
    return this.#unidad;
  }
  
  getEtiquetas(){
    return this.#etiquetas;
  }
  
  getUsuario(){
    return this.#usuario;
  }

  setNombre(nombre){
    this.#nombre = nombre;
  }

  setDescripcion(descripcion){
    this.#descripcion =descripcion;
  }

  setPrecio(precio){
    this.#precio=precio;
  }

  setCantidad(cantidad){
    this.#cantidad=cantidad;
  }

  setEtiquetas(etiquetas){
    this.#etiquetas=etiquetas;
  }

  setUsuario(usuario){
    this.#usuario=usuario;
  }

}

module.exports = Biomasa;