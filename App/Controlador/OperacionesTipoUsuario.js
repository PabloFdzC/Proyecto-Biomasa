const { Router} = require('express');
const SngControlador = require('./SngControlador.js');
const OperacionesTipoUsuario = Router({caseSensitive:true});
const ctrlSng = SngControlador.getInstance();
const ctrlTipoU = ctrlSng.getControladorTipoUsuario();

OperacionesTipoUsuario.post('/agregarTipoUsuario', async function(req, res){
  try{
    if(req.session.TipoUsuario === "Administrador"){
      var r = await ctrlTipoU.agregar(req.body);
      res.send(r);
    } else {
      res.status(400);
      res.send("Solo los administradores pueden realizar esta acción");  
    }
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el tipo de usuario");
    else
      res.send("Algo salió mal");
  }
});

OperacionesTipoUsuario.post('/modificarTipoUsuario', async function(req, res){
  try{
    if(req.session.TipoUsuario === "Administrador"){
      var r = await ctrlTipoU.modificar(req.body);
      res.send(r);
    } else {
      res.status(400);
      res.send("Solo los administradores pueden realizar esta acción");  
    }
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesTipoUsuario.post('/eliminarTipoUsuario', async function(req, res){
  try{
    if(req.session.TipoUsuario === "Administrador"){
      var r = await ctrlTipoU.eliminar(req.body);
      res.send(r);
    } else {
      res.status(400);
      res.send("Solo los administradores pueden realizar esta acción");  
    }
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesTipoUsuario.get('/mostrarTipoUsuario', async function(req, res){
    try{
      var lista = await ctrlTipoU.mostrar(req.query);
      if(req.query.EsLista === "true"){
        res.render('ListaIdNombre.ejs', {lista});
      } else {
        res.render('CardsSimple.ejs', {lista}, function(err, html){
          if(err){
            console.log(err);
            res.status(400);
            res.send("Algo salió mal");      
          } else {
            var l = [];
            for(let s of lista){
              l.push(s.convertirAVista());
            }
            res.send({html, datos:l});
          }
        });
      }
    }catch(err){
      console.log(err);
      res.status(400);
      res.send("Algo salió mal");
    }
  });

module.exports = OperacionesTipoUsuario;