const Usuario = require("./../Modelo/Usuario.js");
const SngConexion = require("./SngConexion.js");

class ControladorUsuario{
  #conexionBaseDatos = null;
  #ctrlTipoUsuario = null;
  
  constructor(ctrlTipoUsuario){
    let cnxSng = SngConexion.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexion();
    this.#ctrlTipoUsuario = ctrlTipoUsuario;
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query('RegistrarUsuario', elem);
    return r;
  }

  // Este depende de cómo lo vamos a hacer porque creo que no
  // mostramos a todos los usuarios entonces elem puede ser
  // solo {Id: string que hay que convertir a número}. A parte de
  // eso es bastante parecido al que está en ControladorUsuario
  async mostrar(elem){
    var r;
    if(elem.Id){
      r = await this.#conexionBaseDatos.query('ReadUsuario', elem);
    } else {
      r = await this.#conexionBaseDatos.query('GetUsuarios', {});
    }
    var datos = [];
    for(var e of r.recordset){
      if(elem.Id){
        e.TipoUsuario = this.#ctrlTipoUsuario.mostrar({Id:e.IdTipoUsuario})[0];
      }
      datos.push(this.convertirAObjeto(e));
    }
    return datos; 
  }

  async modificar(elem){
    if(!elem.Nombre){
      elem.Nombre = '';
    }
    if(!elem.Telefono){
      elem.Telefono = '';
    }
    if(!elem.Contrasenia){
      elem.Contrasenia = '';
    }
    var r = await this.#conexionBaseDatos.query('UpdateUsuario', elem);
    return r; 
  }

  async eliminar(elem){
    var r = await this.#conexionBaseDatos.query('DeleteUsuario', elem);
    return r; 
  }

  async iniciarSesion(elem){
    var r = await this.#conexionBaseDatos.query('InicioSesion', elem);
    if(r.recordset[0].Id && r.recordset[0].TipoUsuario){
      var usuario = {
        Id: r.recordset[0].Id,
        TipoUsuario: r.recordset[0].TipoUsuario
      };
      return usuario;
    } else {
      throw {code: "ER_LOGIN"};
    }
  }

  convertirAObjeto(elem){
    return new Usuario(elem.Id, elem.TipoUsuario, elem.Nombre,
      elem.Telefono, elem.Email);
  }

}

module.exports = ControladorUsuario;