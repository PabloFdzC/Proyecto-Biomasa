$('body').ready(function(){
  var biomasa = new Biomasa();

  const cargarBiomasa = async function(){
    try{
      var res = await biomasa.mostrar({MiBiomasa:false});
      if(res){
        $('#biomasas').empty();
        $('#biomasas').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };


  cargarBiomasa();
});