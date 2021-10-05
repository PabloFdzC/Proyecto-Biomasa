class Usuario{

  #id = -1;
  #tipoUsuario = "";
  #nombre = "";
  #telefono = 0;
  #email = "";

  constructor(id, tipoUsuario, nombre, telefono, email){
    this.#id = id;
    this.#tipoUsuario = tipoUsuario;
    this.#nombre = nombre;
    this.#telefono = telefono;
    this.#email = email;

  }

  getId(){
    return this.#id;
  }

  getTipoUsuario(){
    return this.#tipoUsuario;
  }

  getNombre(){
    return this.#nombre;
  }

  getTelefono(){
    return this.#telefono;
  }

  getEmail(){
    return this.#email;
  }


  setNombre(nombre){
    this.#nombre = nombre;
  }
  
  setTelefono(telefono){
    this.#telefono=telefono;
  }

  setEmail(email){
    this.#email=email;
  }

}

module.exports = Usuario;