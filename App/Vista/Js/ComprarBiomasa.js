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
      var res = await biomasa.mostrar({MiBiomasa:false});
      llenarListadoBiomasas(res);
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  $('#buscarBiomasa').submit(async function(event){
    event.preventDefault();
    let form = $('#buscarBiomasa')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        var res = await biomasa.mostrar({Parametro:info.get("Parametro")});
        llenarListadoBiomasas(res);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });


  //cargarBiomasa();
});