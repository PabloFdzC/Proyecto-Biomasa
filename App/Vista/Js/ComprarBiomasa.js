$('body').ready(function(){
  var biomasa = new Biomasa();
  var actual;
  var precio, precioUs;
  var cantidad, cantidadUs;
  var valido = false;
  var modalComprar = new bootstrap.Modal(
    document.getElementById('modalComprar')
    );

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
    let info = new FormData(form);
    try{
      var res = await biomasa.mostrar({Parametro:info.get("Parametro")});
      llenarListadoBiomasas(res);
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  });

  $('#formComprar').submit(async function(event){
    event.preventDefault();
    let form = $('#formComprar')[0];
    if(form.checkValidity() && cantidadUs > 0 && cantidadUs < cantidad){
      let info = new FormData(form);
      try{
        info.append("IdBiomasa", actual);
        info.append("Precio", precioUs);
        var res = await biomasa.comprar(info);
        modalComprar.hide();
        $('#cant'+actual).empty();
        $('#cant'+actual).append(cantidad - cantidadUs);
      }catch(err){
        console.log(err);
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });

  const limpiarModal = function(){
    $('#Cantidad').removeClass("is-invalid");
    $('#Cantidad').removeClass("is-invalid");
    $('#Cantidad').val("");
    $('#Precio').empty();
    $('#TotalDisponible').empty();
  };

  $('#Cantidad').on('input', function() {
    try{
      let val = $(this).val();
      cantidadUs = parseInt(val);
      valido = cantidad >= cantidadUs;
      if(cantidadUs == 0 || val == ""){
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        $('#invCantidad').empty();
        $('#invCantidad').append("El valor debe ser mayor que 0.");
      } else if(valido){
        $('#Precio').empty();
        precioUs = cantidadUs*precio;
        $('#Precio').append(precioUs);
        $(this).addClass("is-valid");
        $(this).removeClass("is-invalid");
      } else {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        $('#invCantidad').empty();
        $('#invCantidad').append("No se puede comprar más de lo que existe.");
      }
    }catch(err){
      console.log(err);
    }

  });

  $('body').on('click', '.activaModal', async function(event){
    actual = $(this).attr('value');
    try{
      let biom = await biomasa.mostrar({Id:parseInt(actual)});
      if(biom){
        cantidad = biom.cantidad;
        $('#TotalDisponible').append(cantidad);
        precio = biom.precio;
      }
    }catch(err){
      console.log(err);
    }
  });

  $('#modalComprar').on('hidden.bs.modal', function (e) {
    limpiarModal();
  });
  //cargarBiomasa();
});