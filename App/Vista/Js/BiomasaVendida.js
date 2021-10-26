$('body').ready(function(){
  var biomasa = new Biomasa();

  const llenarListadoBiomasas = function(biomasas){
    if(biomasas){
      $('#biomasas').empty();
      $('#biomasas').append(biomasas);
    }
  }

  const cargarBiomasa = async function(){
    try{
      var res = await biomasa.mostrarVentasBiomasa();
      llenarListadoBiomasas(res);
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  cargarBiomasa();
});