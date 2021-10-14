const mssql = require('mssql');

class ConexionBaseDatos{
  #parametrosConexion = {
    user: 'admin',
    password: '1234',
    server: 'localhost', 
    database: 'Biomasa'
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

  async query(procedimiento, params = {}){
    var con = this.#conexion;
    var gt = this.getTipo;
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
          pedido.input(p, tipo, params[p]);
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

  getTipo(parametro, nombre){
    let tipo = typeof parametro;
    switch(tipo){
      case "string":
        if(nombre === "Descripcion"){
          return mssql.VarChar(256);
        } else {
          return mssql.VarChar(32);
        }
      case "number":
        if(Number.isInteger(parametro)){
          return mssql.Int;
        } else {
          return mssql.Money;
        }
      default:
        return null;
    }
  }
  
}

module.exports = ConexionBaseDatos;