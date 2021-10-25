$('body').ready(function(){
  var na = new NuevoAdministrador();
  $('#formNuevoAdmin').submit(async function(event){
    event.preventDefault();
    let form = $('#formNuevoAdmin')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      var r;
      try{
        r = await na.registrar(info);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });
});