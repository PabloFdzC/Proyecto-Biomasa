const Biomasa = require("./../Modelo/Biomasa.js");
const SngConexion = require("./SngConexion.js");

class ControladorBiomasa{
  #conexionBaseDatos = null;
  #ctrlEtiqueta = null;
  #ctrlUsuario = null;
  #ctrlUnidad = null;
  
  constructor(ctrlEtiqueta, ctrlUsuario, ctrlUnidad){
    let cnxSng = SngConexion.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexion();
    this.#ctrlEtiqueta = ctrlEtiqueta;
    this.#ctrlUsuario = ctrlUsuario;
    this.#ctrlUnidad = ctrlUnidad;
  }

  async agregar(elem){
    var etiquetas = elem.Etiquetas;
    delete elem.Etiquetas;
    var r = await this.#conexionBaseDatos.query('CreateBiomasa', elem);
    for(let e of etiquetas){
      var r2 = await this.#conexionBaseDatos.query('CreateBiomasaXEtiqueta', {
        IdEtiqueta:e,
        IdBiomasa:r.recordset[0].Id
      });
    }
    return r;
  }

  async mostrar(elem){
    var r;
    if(elem.Id){
      r = await this.#conexionBaseDatos.query('ReadBiomasa', elem);
    } else if(elem.IdUsuario){
      r = await this.#conexionBaseDatos.query('GetBiomasaUsuario', elem);
    } else if(elem.Parametro){
      r = await this.#conexionBaseDatos.query('BuscarBiomasa', elem);
    } else {
      r = await this.#conexionBaseDatos.query('GetBiomasa', {});
    }
    var datos = [];
    for(let e of r.recordset){
      var etiquetas = [];
      if(!e.Id && elem.Id){
        e.Id = elem.Id;
      }
      var r2 = await this.#conexionBaseDatos.query('GetEtiquetasEnBiomasa', {IdBiomasa:e.Id});
      for(let e2 of r2.recordset){
        let etiqueta = this.#ctrlEtiqueta.convertirAObjeto(e2);
        etiquetas.push(etiqueta);
      }
      e.Etiquetas = etiquetas;
      e.Usuario = (await this.#ctrlUsuario.mostrar({Id:e.IdUsuario}))[0];
      e.Unidad = (await this.#ctrlUnidad.mostrar({Id:e.IdUnidad}))[0];
      datos.push(this.convertirAObjeto(e));
    }
    return datos; 
  }

  async modificar(elem){
    var etiquetas = elem.Etiquetas;
    delete elem.Etiquetas;
    var etiquetasE = elem.EtiquetasE;
    delete elem.EtiquetasE;
    var r = await this.#conexionBaseDatos.query('UpdateBiomasa', elem);
    for(let e of etiquetas){
      let r2 = await this.#conexionBaseDatos.query('CreateBiomasaXEtiqueta', {
        IdEtiqueta:e,
        IdBiomasa:elem.Id
      });
    }
    for(let e of etiquetasE){
      let r2 = await this.#conexionBaseDatos.query('DeleteBiomasaXEtiqueta', { //Borrar pensarlo mejor
        IdEtiqueta:e,
        IdBiomasa:elem.Id
      });
    }
    return r; 
  }

  async eliminar(elem){
    var r = await this.#conexionBaseDatos.query('DeleteBiomasa', elem);
    return r; 
  }

  convertirAObjeto(elem){
    return new Biomasa(elem.Id, elem.Nombre, elem.Descripcion, elem.Precio,
      elem.Cantidad, elem.Unidad, elem.Etiquetas, elem.Usuario);
  }

}

module.exports = ControladorBiomasa;