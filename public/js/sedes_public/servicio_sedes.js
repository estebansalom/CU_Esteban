
'use strict';


function registrarSede(paInfoSede){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_sedes',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: paInfoSede[0],
            nombre_sede : paInfoSede[1],
            dirExacta_sede : paInfoSede[2],
            latitud_sede : paInfoSede[3],
            longitud_sede : paInfoSede[4],
            estado_sede : paInfoSede[5],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       respuesta = response;
      });

      return respuesta;
};

function obtenerListaSedes(){
    let listaSedes = [];
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_sedes',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       listaSedes = response;
      });
    
      peticion.fail(function(response){
        return response;
      });
      return listaSedes;
  
};

function obtener_sede_por_id(pid){
    let sede = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_sede_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid
        }
      });
    
      peticion.done(function(response){
        sede = response;
      });
    
      peticion.fail(function(response){
       
      });

      return sede;
};

function actualizarSede(paInfoSede){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_sede',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: paInfoSede[0],
            nombre_sede : paInfoSede[1],
            dirExacta_sede : paInfoSede[2],
            latitud_sede : paInfoSede[3],
            longitud_sede : paInfoSede[4],
            estado_sede : paInfoSede[5],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

};

function eliminarSede(_pid){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_sede',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: _pid,
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;

};