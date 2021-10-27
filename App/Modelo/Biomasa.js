class Biomasa{

  #id = -1;
  #idCompra = -1;
  #nombre = "";
  #descripcion = "";
  #precio = 0.0;
  #cantidad = 0;
  #unidad = "";
  #etiquetas = [];
  #usuario = null;

  constructor(id, nombre, descripcion, precio, cantidad, unidad, etiquetas, usuario, idCompra){

    this.#id = id;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#precio = precio;
    this.#cantidad = cantidad;
    this.#unidad = unidad;
    this.#etiquetas = etiquetas;
    this.#usuario = usuario;
    this.#idCompra = idCompra;
  }

  getId(){
    return this.#id;
  }

  getIdCompra(){
    return this.#idCompra;
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

  setIdCompra(idCompra){
    this.#idCompra = idCompra;
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

  convertirAVista(){
    var obj = {
      nombre:this.#nombre,
      descripcion:this.#descripcion,
      precio:this.#precio,
      cantidad:this.#cantidad
    }
    var a = [];
    if(Array.isArray(this.#etiquetas)){
      for(let e of this.#etiquetas){
        a.push(e.convertirAVista());
      }
    }
    obj.etiquetas = a;
    return obj;
  }

}

module.exports = Biomasa;