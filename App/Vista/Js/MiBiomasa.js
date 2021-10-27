$('body').ready(function(){
  var biomasa = new Biomasa();
  var etiqueta = new Etiqueta();
  var unidad = new Unidad();
  var actual;
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

  const cargarUnidades = async function(){
    try{
      var res = await unidad.mostrar({EsLista:true});
      if(res){
        $('#Unidad').append(res);
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

  const insertaEtiquetaHtml = function(val, text){
    if(val != ""){
      val = parseInt(val);
      let metido = false;
      if(esModificar){
        if(listaEtiquetas.includes(val)){
          let iLE = listaEtiquetasE.indexOf(val);
          if(iLE > -1){
            listaEtiquetasE.splice(iLE, 1);
            metido = true;
          }
        } else if(!listaEtiquetasA.includes(val)){
          listaEtiquetasA.push(val);
          metido = true;
        }
      }else{
        if(!listaEtiquetas.includes(val)){
          listaEtiquetas.push(val);
          metido = true;
        }
      }
      if(metido){
        $('#etiquetasEscogidos').append(`
        <div class="etiqueta ps-3 pe-3 pt-2 pb-2 text-center m-1" title="`+val+`" id="`+val+`">
          `+text+`
        </div>`);
      }
    }
  };

  const limpiarModal = function(){
    $('#formBiomasa').removeClass('was-validated');
    $('#Nombre').val("");
    $('#Cantidad').val("");
    $('#Precio').val("");
    $('#Descripcion').val("");
    $('#etiquetasEscogidos').empty();
    listaEtiquetas = [];
  };

  $('body').on('click', '.activaModal', async function(event){
    listaEtiquetas = [];
    actual = $(this).attr('value');
    if(actual == "AGREGAR"){
      esModificar = false;
      $('#agregarModificar').empty();
      $('#agregarModificar').append("Agregar biomasa");
    } else {
      $('#agregarModificar').empty();
      $('#agregarModificar').append("Modificar biomasa");
      try{
        let biom = await biomasa.mostrar({Id:parseInt(actual)});
        if(biom){
          $('#Nombre').val(biom.nombre);
          $('#Cantidad').val(biom.cantidad);
          $('#Precio').val(biom.precio);
          $('#Descripcion').val(biom.descripcion);
          for(let e of biom.etiquetas){
            insertaEtiquetaHtml(e.id, e.nombre);
          }
          esModificar = true;
        }
      }catch(err){
        console.log(err);
      }
    }
  });

  $('body').on('click', '.eliminarBiomasa', async function(event){
    let val = $(this).attr('value');
    try{
      let info = new FormData();
      info.append('Id', parseInt(val));
      let r = await biomasa.eliminar(info);
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
        let IdUnidad = $('#Unidad').children("option:selected").val();
        info.append('IdUnidad', IdUnidad);
        if(esModificar){
          info.append('Id', actual);
          r = await biomasa.modificar(info, listaEtiquetasA, listaEtiquetasE);
        }else{
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
    let val = parseInt($(this).attr('id'));
    if(esModificar){
      if(listaEtiquetasE.length+1 === listaEtiquetas.length && listaEtiquetasA.length === 0){
        muestraMensaje('Fallo', 'Debe existir al menos 1 etiqueta');
      }else{
        let i = listaEtiquetasA.indexOf(val);
        if(i > -1){
          listaEtiquetasA.splice(i, 1);
        } else {
          listaEtiquetasE.push(val);
        }
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
    var val = $('#annadirEtiqueta').children("option:selected").val();
    var text = $('#annadirEtiqueta').children("option:selected").text();
    insertaEtiquetaHtml(val, text);
  });
  
  cargarEtiquetas();
  cargarUnidades();
  cargarBiomasa();
});