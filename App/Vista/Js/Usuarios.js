$('body').ready(function(){
  var usuario = new Usuario();
  var actual;

  const cargarUsuario = async function(){
    try{
      var res = await usuario.mostrar({MiUsuario:true});
      if(res){
        $('#usuarios').empty();
        $('#usuarios').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  $('body').on('click', '.eliminarUsuario', async function(event){
    let val = $(this).attr('value');
    try{
      let info = new FormData();
      info.append('Id', parseInt(val));
      let r = await usuario.eliminar(info);
      if(r){
        const card = $(this).parent().parent().parent().parent().parent().parent();
        card.remove();
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  });
  
  cargarUsuario();
});