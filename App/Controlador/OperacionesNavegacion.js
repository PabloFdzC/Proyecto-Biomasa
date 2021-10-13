const { Router} = require('express');
const navigation = Router({caseSensitive:true});
const SngControlador = require('./SngControlador.js');
const ctrlSng = SngControlador.getInstance();
const ctrlUs = ctrlSng.getControladorUsuario();

navigation.get('/', function (req, res) {
  res.redirect('/IniciarSesion');
});

navigation.get('/IniciarSesion', function (req, res) {
  req.session.Id = null;
  res.render('IniciarSesion-Registrarse.ejs');
});

navigation.get('/ComprarBiomasa', function (req, res) {
  //if(req.session.Id){
    res.render('ComprarBiomasa.ejs');
  // } else {
  //   res.redirect('/IniciarSesion');
  // }
});

navigation.get('/MiBiomasa', function (req, res) {
  //if(req.session.Id){
    res.render('MiBiomasa.ejs');
  //} else {
    //res.redirect('/IniciarSesion');
  //}
});

// Hay que esperar a que en el controlador esté bien hecho
navigation.get('/Perfil', async function (req, res) {
  if(req.session.Id){
    var u = await ctrlUs.mostrar({Id:req.session.Id});
    res.render('Perfil.ejs', {
      tipo: req.session.TipoUsuario,
      usuario:u
    });
  } else {
    res.redirect('/IniciarSesion');
  }
});

module.exports = navigation;