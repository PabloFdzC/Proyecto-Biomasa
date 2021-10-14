$('body').ready(function(){
  var biomasa = new Biomasa();
  var etiqueta = new Etiqueta();
  var esModificar = false;
  var listaEtiquetas = [];
  var listaEtiquetasA = [];
  var listaEtiquetasE = [];
  var modalAgregarModificar = new bootstrap.Modal(document.getElementById('modalAgregarModificar'));

  const cargarEtiquetas = async function(){
    try{
      var res = await etiqueta.mostrar({EsLista:true});
      if(res){
        $('#annadirEtiqueta').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  const cargarBiomasa = async function(){
    try{
      var res = await biomasa.mostrar({MiBiomasa:true});
      if(res){
        $('#biomasas').empty();
        $('#biomasas').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  const insertaEtiquetaHtml = function(val){
    if(val != "" && !listaEtiquetasA.includes(val) && !listaEtiquetas.includes(val)){
      if(esModificar){
        listaEtiquetasA.push(val);
      }else{
        listaEtiquetas.push(val);
      }
      $('#etiquetasEscogidos').append(`
      <div class="etiqueta ps-3 pe-3 pt-2 pb-2 text-center m-1" title="`+val+`" id="`+val+`">
        `+val+`
      </div>`);
    }
  };

  const limpiarModal = function(){
    $('#formClase').removeClass('was-validated');
    $('#nombre').val("");
    $('#cantidad').val("");
    $('#precio').val("");
    $('#descripcion').val("");
    $('#annadirEtiqueta').val("");
    $('#etiquetasEscogidos').empty();
    listaEtiquetas = [];
  };

  $('body').on('click', '.activaModal', async function(event){
    listaEtiquetas = [];
    var val = $(this).attr('value');
    if(val == "AGREGAR"){
      esModificar = false;
      $('#agregarModificar').empty();
      $('#agregarModificar').append("Agregar biomasa");
    } else {
      $('#agregarModificar').empty();
      $('#agregarModificar').append("Modificar biomasa");
      let biom = await biomasa.mostrar({Id:val});
      if(biom){
        $('#nombre').val(biom.nombre);
        $('#cantidad').val(biom.cantidad);
        $('#precio').val(biom.precio);
        $('#descripcion').val(biom.descripcion);
        for(let s of biom.etiquetas){
          insertaEtiquetaHtml(s);
        }
        esModificar = true;
      }
      
    }
  });

  $('body').on('click', '.eliminarBiomasa', async function(event){
    let val = $(this).attr('value');
    try{
      let r = await biomasa.eliminar(val);
      if(r){
        const card = $(this).parent().parent().parent().parent().parent().parent();
        card.remove();
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  });

  $('#modalAgregarModificar').on('hidden.bs.modal', function (e) {
    limpiarModal();
  });

  $('#formBiomasa').submit(async function(event){
    event.preventDefault();
    let form = $('#formBiomasa')[0];
    let pasa = listaEtiquetas.length > 0 && (listaEtiquetas.length > listaEtiquetasE.length || listaEtiquetasA.length > 0);
    if(!pasa){
      muestraMensaje("Fallo", "Debe haber por lo menos 1 etiqueta");
    }
    if(form.checkValidity() && pasa){
      let info = new FormData(form);
      var r;
      try{
        if(esModificar)
          r = await biomasa.modificar(info, listaEtiquetasA, listaEtiquetasE);
        else{
          r = await biomasa.agregar(info, listaEtiquetas);
        }
        cargarBiomasa();
        modalAgregarModificar.hide();
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });

  $('#formBiomasa').on('click', '.etiqueta', function(){
    let val = $(this).attr('id');
    if(esModificar){
      if(listaEtiquetasE.length+1 === listaEtiquetas.length && listaEtiquetasA.length === 0){
        muestraMensaje('Fallo', 'Debe existir al menos 1 etiqueta');
      }else{
        listaEtiquetasE.push(val);
        $(this).remove();
      }
    } else {
      let i = listaEtiquetas.indexOf(val);
      if (i > -1) {
        listaEtiquetas.splice(i, 1);
        $(this).remove();
      }
    }
  });

  $('#annadeEtiqueta').on('click', function(event){
    let val = $('#annadirEtiqueta').children("option:selected").val();
    insertaEtiquetaHtml(val);
  });

  cargarEtiquetas();
  cargarBiomasa();
});