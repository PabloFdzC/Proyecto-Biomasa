const mssql = require('mssql');

class ConexionBaseDatos{
  #parametrosConexion = {
    user: 'sa',
    password: 'contrasena',
    server: 'localhost', 
    database: 'BiomasaAP',
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  };

  #conexion = null;
  
  constructor(){
    this.#conexion = mssql.connect(this.#parametrosConexion, function(error){
      if(error){
        console.log('Error');
      } else {
        console.log('Connected');
      }
    });
  }

  async query(procedimiento, params){
    var con = this.#conexion;
    var gt = this.getTipo;
    var csn = this.cambiaStringNull;
    return new Promise(function(resolve, reject){
      var pedido = new mssql.Request();
      var malo = false;
      for(let p in params){
        let tipo = gt(params[p], p);
        if(tipo == null){
          reject({error:"Tipo no valido"});
          malo = true;
          break;
        } else {
          let valor = csn(params[p]);
          pedido.input(p, tipo, valor);
        }
      }
      if(!malo){
        pedido.execute(procedimiento, async function(error, result){
          if(error){
            reject(error);
          }else{
            resolve(result);
          }
        });
      }
    });
  }

  cambiaStringNull(parametro){
    let tipo = typeof parametro;
    if(tipo == "string"){
      if(parametro.trim() == ""){
        return undefined;
      }
    }
    return parametro;
  }

  getTipo(parametro, nombre){
    let tipo = typeof parametro;
    switch(tipo){
      case "string":
        if(nombre == "Descripcion"){
          return mssql.VarChar(256);
        } if(nombre == "Telefno"){
          return mssql.VarChar(16);
        } else {
          return mssql.VarChar(32);
        }
      case "number":
        if(nombre == "Precio"){
          return mssql.Money;
        } else {
          return mssql.Int;
        }
      default:
        return null;
    }
  }
  
}

module.exports = ConexionBaseDatos;