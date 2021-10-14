const { Router} = require('express');
const SngControlador = require('./SngControlador.js');
const OperacionesEtiqueta = Router({caseSensitive:true});
const ctrlSng = SngControlador.getInstance();
const ctrlEtiq = ctrlSng.getControladorEtiqueta();

OperacionesEtiqueta.post('/agregarEtiqueta', async function(req, res){
  try{
    var contrasenna = await ctrlEtiq.agregar(req.body);
    res.send({contrasenna});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear la etiqueta");
    else
      res.send("Algo salió mal");
  }
});

OperacionesEtiqueta.post('/modificarEtiqueta', async function(req, res){
  try{
    var r = await ctrlEtiq.modificar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesEtiqueta.post('/eliminarEtiqueta', async function(req, res){
  try{
    var r = await ctrlEtiq.eliminar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesEtiqueta.get('/mostrarEtiqueta', async function(req, res){
    try{
        var lista = await ctrlEtiq.mostrar(req.query);
        res.render('EtiquetaLista.ejs', {lista});
    }catch(err){
      console.log(err);
      res.status(400);
      res.send("Algo salió mal");
    }
  });

module.exports = OperacionesEtiqueta;