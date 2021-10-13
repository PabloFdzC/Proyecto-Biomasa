const { Router} = require('express');
const SngControlador = require('./SngControlador.js');
const OperacionesBiomasa = Router({caseSensitive:true});
const ctrlSng = SngControlador.getInstance();
const ctrlBiom = ctrlSng.getControladorBiomasa();

OperacionesBiomasa.post('/agregarBiomasa', async function(req, res){
  try{
    req.body.Etiquetas = JSON.parse(req.body.Etiquetas);
    var r = await ctrlBiom.agregar(req.body);
    res.send({r});
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
    req.body.email = req.session.email;
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
    req.body.email = req.session.email;
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
      var lista = await ctrlBiom.mostrar(req.query);
      if(req.query.Id){
        res.send(lista[0].convertirAVista());
      } else {
        res.render('BiomasaCards.ejs', {lista, miBiomasa:req.query.MiBiomasa === "true"});
      }
    }catch(err){
      console.log(err);
      res.status(400);
      res.send("Algo salió mal");
    }
  });

module.exports = OperacionesBiomasa;