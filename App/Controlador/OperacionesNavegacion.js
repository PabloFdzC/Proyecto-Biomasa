const { Router} = require('express');
const navigation = Router({caseSensitive:true});

navigation.get('/', function (req, res) {
  res.redirect('/IniciarSesion');
});

navigation.get('/IniciarSesion', function (req, res) {
  req.session.email = null;
  res.render('IniciarSesion-Registrarse.ejs');
});

navigation.get('/ComprarBiomasa', function (req, res) {
  if(req.session.email){
    res.render('ComprarBiomasa.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/MiBiomasa', function (req, res) {
  if(req.session.email){
    res.render('MiBiomasa.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

module.exports = navigation;