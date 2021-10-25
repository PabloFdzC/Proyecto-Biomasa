$('body').ready(function(){
  var esModificar = false;
  var actual = "";
  var listaDatos = [];
  var modal = new bootstrap.Modal(document.getElementById('modalSimple'));


  const limpiarModal = function(){
    $('#formSimple').removeClass('was-validated');
    $('#nombre').val("");
    esModificar = false;
  };

  cargar = async function(){
    try{
      var res = await ventana.mostrar(false);
      if(res){
        $('#elementos').empty();
        $('#elementos').append(res.html);
        listaDatos = res.datos;
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  $('body').on('click', '.activaModal', function(event){
    actual = $(this).attr('value');
    if(actual == "CREAR"){
      esModificar = false;
      $('#agregarModificar').empty();
      $('#agregarModificar').append("Agregar "+nombreV);
    } else {
      esModificar = true;
      $('#agregarModificar').empty();
      $('#agregarModificar').append("Modificar "+nombreV);
      actual = parseInt(actual);
      for(var e of listaDatos){
        if(e.id === actual){
          $('#nombre').val(e.nombre);
        }
      }
    }
  });

  $('body').on('click', '.elimina', async function(event){
    let val = $(this).attr('value');
    try{
      let info = new FormData();
      info.append('Id', parseInt(val));
      let r = await ventana.eliminar(info);
      if(r){
        const card = $(this).parent().parent().parent().parent().parent().parent();
        card.remove();
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  });
  
  $('#formSimple').submit(async function(event){
    event.preventDefault();
    let form = $('#formSimple')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      let r;
      try{
        if(esModificar){
          info.append('Id', actual);
          r = await ventana.modificar(info);
        }else {
          r = await ventana.agregar(info);
        }
        modal.hide();
        cargar();
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });

  $('#modalSimple').on('hidden.bs.modal', function (e) {
    limpiarModal();
  });

  cargar();

});