$('body').ready(function(){
  var ini = new IniciarSesion();
  var reg = new Registrarse();
  var tU = new TipoUsuario();

  const muestraIniciarSesion = function (){
    $('#cardCont').css("width", "27rem");
    $('#Registrarse').addClass('esconde');
    $('#IniciarSesion').removeClass('esconde');
  }
  
  const muestraRegistrarse = function(){
    $('#cardCont').css("width", "40rem");
    $('#Registrarse').removeClass('esconde');
    $('#IniciarSesion').addClass('esconde');
  }

  const cargarTipoUsuario = async function (){
    try{
      var res = await tU.mostrar({EsLista:true});
      if(res){
        $('#TipoUsuario').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  }

  $('#formIniciarSesion').submit(async function(event){
    event.preventDefault();
    let form = $('#formIniciarSesion')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        await ini.iniciarSesion(info);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });

  $('#formRegistrarse').submit(async function(event){
    event.preventDefault();
    let form = $('#formRegistrarse')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        info.delete("CContrasenia");
        await reg.registrar(info);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });

  muestraIniciarSesion();
  cargarTipoUsuario();
  $('#cardB').on('click', '.irRegistrarse',muestraRegistrarse);
  $('#cardB').on('click', '.irInicioSesion',muestraIniciarSesion);
});
