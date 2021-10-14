const { Router} = require('express');
const SngControlador = require('./SngControlador.js');
const OperacionesUsuario = Router({caseSensitive:true});
const ctrlSng = SngControlador.getInstance();
const ctrlUs = ctrlSng.getControladorUsuario();

OperacionesUsuario.post('/agregarUsuario', async function(req, res){
  try{
    var r = await ctrlUs.agregar(req.body);
    res.send("Ok");
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el usuario");
    else
      res.send("Algo salió mal");
  }
});

OperacionesUsuario.post('/modificarUsuario', async function(req, res){
  try{
    req.body.Id = req.session.Id;
    var r = await ctrlUs.modificar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesUsuario.post('/modificarUsuarioContrasenna', async function(req, res){
    try{
      req.body.Id = req.session.Id;
      var r = await ctrlUs.modificarContrasenna(req.body);
      res.send(r);
    }catch(err){
      console.log(err);
      res.status(400);
      res.send("Algo salió mal");
    }
  });

OperacionesUsuario.post('/eliminarUsuario', async function(req, res){
  try{
    var r = await ctrlUs.eliminar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesUsuario.get('/mostrarUsuario', async function(req, res){
  try{
      var resultado = await ctrlUs.mostrar();
      res.render('Usuarios.ejs', {resultado});
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesUsuario.post('/ingresar', async function(req, res){
  try{
    var usuario = await ctrlUs.ingresar(req.body);
    req.session.Id = usuario.Id;
    req.session.TipoUsuario = usuario.TipoUsuario;
    res.send(usuario);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == "ER_LOGIN")
      res.send("Email o contraseña incorrecta");
    else
      res.send("Algo salió mal");
  }
});


module.exports = OperacionesUsuario;