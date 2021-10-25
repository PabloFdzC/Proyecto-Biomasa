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
  if(req.session.Id){
    res.render('ComprarBiomasa.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/MiBiomasa', function (req, res) {
  if(req.session.Id){
    res.render('MiBiomasa.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/TipoUsuario', function (req, res) {
  if(req.session.Id){
    if(req.session.TipoUsuario === "Administrador"){
      res.render('VentanaCardsSimple.ejs', 
      {
        ventana:"TIPOUSUARIO",
        tituloLista: "Tipos de usuario",
        tituloAM: "tipo de usuario"
      });
    }
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Etiquetas', function (req, res) {
  if(req.session.Id){
    if(req.session.TipoUsuario === "Administrador"){
      res.render('VentanaCardsSimple.ejs', 
      {
        ventana:"ETIQUETAS",
        tituloLista: "Etiquetas",
        tituloAM: "etiqueta"
      });
    }
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Unidades', function (req, res) {
  if(req.session.Id){
    if(req.session.TipoUsuario === "Administrador"){
      res.render('VentanaCardsSimple.ejs', 
      {
        ventana:"UNIDADES",
        tituloLista: "Unidad",
        tituloAM: "unidad"
      });
    }
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Usuarios', function (req, res) {
  if(req.session.Id){
    if(req.session.TipoUsuario === "Administrador"){
      res.render('Usuarios.ejs', {ventana:"USUARIOS",});
    }
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/SesionIniciada', function (req, res) {
  if(req.session.Id){
    switch(req.session.TipoUsuario){
      case "Administrador":
        res.redirect('/Usuarios');
        break;
      case "Comprador":
        res.redirect('/ComprarBiomasa');
        break;
      case "Vendedor":
        res.redirect('/MiBiomasa');
        break;
    }
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Perfil', async function (req, res) {
  if(req.session.Id){
    var u = await ctrlUs.mostrar({Id:req.session.Id});
    res.render('Perfil.ejs', {
      tipo: req.session.TipoUsuario,
      usuario:u[0]
    });
  } else {
    res.redirect('/IniciarSesion');
  }
});

module.exports = navigation;