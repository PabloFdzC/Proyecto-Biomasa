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

  $('body').on('click', '.eliminarCompra', async function(event){
    let val = $(this).attr('value');
    try{
      let info = new FormData();
      info.append('Id', parseInt(val));
      let r = await biomasa.eliminarCompra(info);
      if(r){
        const card = $(this).parent().parent().parent().parent().parent().parent();
        card.remove();
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  });

  cargarBiomasa();
});