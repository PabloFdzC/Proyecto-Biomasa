const { Router} = require('express');
const SngControlador = require('./SngControlador.js');
const OperacionesUnidad = Router({caseSensitive:true});
const ctrlSng = SngControlador.getInstance();
const ctrlTipoU = ctrlSng.getControladorUnidad();

OperacionesUnidad.post('/agregarUnidad', async function(req, res){
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

OperacionesUnidad.post('/modificarUnidad', async function(req, res){
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

OperacionesUnidad.post('/eliminarUnidad', async function(req, res){
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

OperacionesUnidad.get('/mostrarUnidad', async function(req, res){
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

module.exports = OperacionesUnidad;