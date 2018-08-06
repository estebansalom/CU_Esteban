'use strict';

function registrar_Usuarios(paInfoUsuario) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_usuarios',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            foto_usuario: paInfoUsuario[0],
            nombre_usuario: paInfoUsuario[1],
            primer_apellido_usuario: paInfoUsuario[2],
            segundo_apellido_usuario: paInfoUsuario[3],
            cedula_usuario: paInfoUsuario[4],
            fecha_usuario: paInfoUsuario[5],
            correo_usuario: paInfoUsuario[6],
            telefono_usuario: paInfoUsuario[7],
            direccion_usuario: paInfoUsuario[8],
            provincia_usuario: paInfoUsuario[9],
            canton_usuario: paInfoUsuario[10],
            distrito_usuario: paInfoUsuario[11],
            rol_usuario: paInfoUsuario[12],
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function obtenerLista_Usuarios() {
    let listaUsuarios = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_usuarios',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}