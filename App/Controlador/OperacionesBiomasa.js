const { Router} = require('express');
const SngControlador = require('./SngControlador.js');
const OperacionesBiomasa = Router({caseSensitive:true});
const ctrlSng = SngControlador.getInstance();
const ctrlBiom = ctrlSng.getControladorBiomasa();

OperacionesBiomasa.post('/nuevaBiomasa', async function(req, res){
  try{
    var contrasenna = await ctrlBiom.agregar(req.body);
    res.send({contrasenna});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear la biomasa");
    else
      res.send("Algo salió mal");
  }
});

OperacionesBiomasa.post('/modificarBiomasa', async function(req, res){
  try{
    //req.body.email = req.session.email;
    var r = await ctrlBiom.modificar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesBiomasa.post('/eliminarBiomasa', async function(req, res){
  try{
    //req.body.email = req.session.email;
    var r = await ctrlBiom.eliminar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesBiomasa.get('/mostrarBiomasa', async function(req, res){
    try{
        var resultado = await ctrlBiom.mostrar();
        res.render('Biomasas.ejs', {resultado});
    }catch(err){
      console.log(err);
      res.status(400);
      res.send("Algo salió mal");
    }
  });

module.exports = OperacionesBiomasa;