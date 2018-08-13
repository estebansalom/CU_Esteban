﻿'use strict';

window.onload = function(){
    let infoUsuario = obtener_usuario_por_id(localStorage.getItem('idUsuario'));

    let firstLog = infoUsuario['first_log'];
    if(firstLog){
        swal({
            title: 'Bienvenido a Asistentes Cenfotec',
            text: 'Por favor, cambie su contraseña.',
            type: 'info',
            confirmButtonText: 'Entendido'
        });
        $('.swal2-confirm').click(function () {
            // Aca va la funcion donde aparece lo de cambiar la contrasenna
            actualizarFirstLog(infoUsuario['_id']);
            cambiarFormulario();
            obtenerContrasennaActual();
        });
    }
};


let rolActual = localStorage.getItem('rolUsuario');
leerRolOpciones();
imprimirInfoPerfil();
let inputContrasennaActual = document.querySelector('#txtNuevaContrasenna');
let inputConfirmacion = document.querySelector('#txtConfirmacion');
let inputIdContrasenna = document.querySelector('#txtIdContrasenna');
let botonObtenerContrasenna = document.querySelector('#btnContrasenna');

let sContrasenna = '';
let sConfirmacion = '';
let sId = '';


// Para menu Opciones
$('#btnOpciones').click(function () {
    if ($('#menuOpciones').css('display') === 'none') {
        $('#menuOpciones').slideDown('250');
    }
});
$('#menuOpciones, header nav>div').mouseleave(function () {
    $('#menuOpciones').slideUp('250');
});

// Para menu reportes
$('#btnReportes').click(function () {
    if ($('#menuReportes').css('display') === 'none') {
        $('#menuReportes').slideDown('250');
    }
});
$('#menuReportes, header nav>div').mouseleave(function () {
    $('#menuReportes').slideUp('250');
});

// Para menu beca
$('#btnBeca').click(function () {
    if ($('#menuBeca').css('display') === 'none') {
        $('#menuBeca').slideDown('250');
    }
});
$('#menuBeca, header nav>div').mouseleave(function () {
    $('#menuBeca').slideUp('250');
});

// Para cerrar sesion
let botonCerrar = document.querySelector('#btnCerrarSesion');
botonCerrar.addEventListener('click', cerrarSesion);
function cerrarSesion() {
    swal({
        title: '¿Seguro que desea cerrar sesión?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            window.localStorage.clear();
            window.location.href = "../../html/landing_page.html";
        }
    })

}

// Desplegar el boton de opciones con las opciones que correopnden
function leerRolOpciones() {

    // En el primer espacio va el nombre de la opcion y en el segundo la ruta

    // Estas son las opciones comunes por rol
    let opcionSede = ['Sedes', '../../html/dashboard/dashboard_sedes.html'];
    let opcionCarreras = ['Carreras', '../../html/dashboard/dashboard_carrera.html'];
    let opcionCursos = ['Cursos', '#'];
    let opcionGrupos = ['Grupos', '#'];
    let opcionLaboratorios = ['Laboratorios', '#'];
    let opcionUsuarios = ['Usuarios', '../../html/dashboard/dashboard_usuarios.html'];
    let opcionPeriodos = ['Períodos', '../../html/dashboard/dashboard_periodos.html'];
    let opcionBitacora = ['Bitácora', '../../html/dashboard/dashboard_bitacora.html'];
    let opcionSolicitud = ['Solicitud', '#'];

    let opcionesAdministrador = [];
    opcionesAdministrador.push(opcionSede, opcionCarreras, opcionCursos, opcionGrupos, opcionLaboratorios, opcionUsuarios, opcionPeriodos, opcionBitacora, opcionSolicitud);

    let opcionesRectoria = [];
    opcionesRectoria.push(opcionSede, opcionCarreras, opcionCursos, opcionGrupos, opcionLaboratorios, opcionUsuarios, opcionPeriodos, opcionBitacora);
    let opcionesDecanatura = [];
    opcionesDecanatura.push(opcionSede, opcionCarreras, opcionCursos, opcionGrupos, opcionLaboratorios, opcionUsuarios, opcionPeriodos, opcionBitacora)
    let opcionesAsistenteDecanatura = [];
    opcionesAsistenteDecanatura.push(opcionSede, opcionCarreras, opcionCursos, opcionGrupos, opcionLaboratorios, opcionUsuarios, opcionPeriodos, opcionSolicitud)
    let opcionesProfesor = [];
    opcionesProfesor.push(opcionBitacora, opcionSolicitud);

    // Estas son las opciones por rol de reportes
    let opcionGraficoComparativo = ['Gráfico de horas comparativo contra promedio de horas de asistencia', '#'];
    let opcionReporteCursos = ['Reporte de cursos', '#'];
    let opcionGraficoCostos = ['Gráfico de costos de asistencias', '#'];
    let opcionGraficoHorasAsistencia = ['Gráfico cantidad de horas de asistencia', '#'];
    let opcionGraficoTotalHoras = ['Gráfico del total de horas de asistencia', '#'];

    let opRepSuperior = [];
    opRepSuperior.push(opcionGraficoCostos, opcionReporteCursos);
    let opRepProfesor = [];
    opRepProfesor.push(opcionGraficoHorasAsistencia, opcionGraficoTotalHoras, opcionGraficoComparativo);
    let opRepAsistente = [];
    opRepAsistente.push(opcionGraficoHorasAsistencia, opcionGraficoTotalHoras);

    let opcionPorcentajeBeca = ['Porcentaje de actual', '#'];
    let opcionInformacionBeca = ['Información de beca', '#'];
    let opcionModificarBeca = ['Modificar información de beca', '#'];

    let opBecaSuperior = [];
    opBecaSuperior.push(opcionInformacionBeca, opcionModificarBeca);
    let opBecaDecAsist = [];
    opBecaDecAsist.push(opcionInformacionBeca);
    let opBecAsist = [];
    opBecAsist.push(opcionPorcentajeBeca);

    switch (rolActual) {
        case 'Administrador':
            imprimirOpciones(opcionesAdministrador);
            imprimirOpcionesBeca(opBecaSuperior);
            imprimirOpcionesReportes(opRepSuperior);
            break;
        case 'Rector':
            imprimirOpciones(opcionesRectoria);
            imprimirOpcionesBeca(opBecaSuperior);
            imprimirOpcionesReportes(opRepSuperior);
            break;
        case 'Decanatura':
            imprimirOpciones(opcionesDecanatura);
            imprimirOpcionesBeca(opBecaSuperior);
            imprimirOpcionesReportes(opRepSuperior);
            break;
        case 'Asistente de decanatura':
            imprimirOpciones(opcionesAsistenteDecanatura);
            imprimirOpcionesBeca(opBecaDecAsist);
            imprimirOpcionesReportes(opRepSuperior);
            break;
        case 'Profesor':
            imprimirOpciones(opcionesProfesor);
            imprimirOpcionesBeca(opBecaDecAsist);
            imprimirOpcionesReportes(opRepProfesor);
            break;
        case 'Asistente':
            quitarBotonOpciones();
            imprimirOpcionesBeca(opBecAsist);
            imprimirOpcionesReportes(opRepAsistente);
            break;
    }
}

function imprimirOpciones(paOpciones) {
    let menu = document.querySelector('#menuOpciones');
    for (let i = 0; i < paOpciones.length; i++) {
        let newLi = document.createElement('li');
        let newA = document.createElement('a');
        newA.href = paOpciones[i][1];
        newA.textContent = paOpciones[i][0];
        newLi.appendChild(newA);
        menu.appendChild(newLi);
    }
}
function imprimirOpcionesReportes(paOpciones) {
    let menu = document.querySelector('#menuReportes');
    for (let i = 0; i < paOpciones.length; i++) {
        let newLi = document.createElement('li');
        let newA = document.createElement('a');
        newA.href = paOpciones[i][1];
        newA.textContent = paOpciones[i][0];
        newLi.appendChild(newA);
        menu.appendChild(newLi);
    }
}
function quitarBotonOpciones() {
    let divOpciones = document.querySelector('#divOpciones');
    divOpciones.style.display = "none";
}

function imprimirOpcionesBeca(paOpciones) {
    let menu = document.querySelector('#menuBeca');
    for (let i = 0; i < paOpciones.length; i++) {
        let newLi = document.createElement('li');
        let newA = document.createElement('a');
        newA.href = paOpciones[i][1];
        newA.textContent = paOpciones[i][0];
        newLi.appendChild(newA);
        menu.appendChild(newLi);
    }
}

function imprimirInfoPerfil() {
    let fotoPerfil = document.querySelector('#img');
    let nombrePerfil = document.querySelector('#nombrePerfil');
    let perfilInfo = document.querySelector('.perfil-info');
    let infoUsuarioActual = obtener_usuario_por_id(localStorage.getItem('idUsuario'));

    fotoPerfil.style.backgroundImage = "url('" + infoUsuarioActual['foto_usuario'] + "')";

    nombrePerfil.innerHTML = '';
    let nombreCompleto = infoUsuarioActual['nombre_usuario'] + " " + infoUsuarioActual['primer_apellido_usuario'] + " " + infoUsuarioActual['segundo_apellido_usuario'];
    nombrePerfil.innerHTML = nombreCompleto;

    perfilInfo.innerHTML = '';
    perfilInfo.appendChild(createTextElement('Cédula:', 'h2'));
    perfilInfo.appendChild(createTextElement(infoUsuarioActual['cedula_usuario'], 'h2'));
    perfilInfo.appendChild(createTextElement('Correo:', 'h2'));
    perfilInfo.appendChild(createTextElement(infoUsuarioActual['correo_usuario'], 'h2'));
    perfilInfo.appendChild(createTextElement('Teléfono:', 'h2'));
    perfilInfo.appendChild(createTextElement(infoUsuarioActual['telefono_usuario'], 'h2'));
    perfilInfo.appendChild(createTextElement('Dirección exacta:', 'h2'));
    perfilInfo.appendChild(createTextElement(infoUsuarioActual['direccion_usuario'], 'h2'));
    let divEspacio = document.createElement('div');
    perfilInfo.appendChild(divEspacio);
    let botonCambioForm = document.createElement('button');
    botonCambioForm.classList.add('boton-cambio-contrasenna');
    botonCambioForm.innerHTML = "Cambiar contraseña";
    botonCambioForm.addEventListener('click', obtenerContrasennaActual)
    botonCambioForm.addEventListener('click', cambiarFormulario);
    perfilInfo.appendChild(botonCambioForm);
}


function createTextElement(text, element) {
    let newH2 = document.createElement(element);
    newH2.textContent = text;
    return newH2
}

function cambiarFormulario() {
    let ppPerfil = document.querySelector('#sct_perfil');
    ppPerfil.style.display = "none";
    let ppContrasenna = document.querySelector('#sct_contrasenna');
    ppContrasenna.style.display = "block";

}

//cambio de contrase;a
function obtenerContrasennaActual() {
    let infoUsuarioActual = obtener_usuario_por_id(localStorage.getItem('idUsuario'));
    
    inputContrasennaActual.value = infoUsuarioActual['contrasenna_usuario'];
    botonObtenerContrasenna.addEventListener('click', obtenerNuevaContrasenna)
};

function obtenerNuevaContrasenna() {
    let infoContrasenna = [];
    let infoUsuario = obtener_usuario_por_id(localStorage.getItem('idUsuario'));
    let id = infoUsuario['_id'];
    sContrasenna = inputContrasennaActual.value;
    sConfirmacion = inputConfirmacion.value;
    // validar pequenno
    if (sContrasenna == "") {
        inputContrasennaActual.classList.add('errorInput');
    } else {
        inputContrasennaActual.classList.remove('errorInput');
    }
    if (sConfirmacion == "") {
        inputConfirmacion.classList.add('errorInput');
    } else {
        inputConfirmacion.classList.remove('errorInput');
    }
    // validar pequenno

    let bError = false;
    bError = verificarContrasenna(sContrasenna, sConfirmacion);
    if (bError) {
        swal({
            title: 'No se pudo cambiar la contrase;a',
            text: 'Verifique que la contraseña sea igual a la confirmacion',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Actualización correcta',
            text: 'El usuario se actualizó correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoContrasenna.push(id, sContrasenna);
        actualizarContrasenna(infoContrasenna);
        $('.swal2-confirm').click(function () {
            let ppContrasenna = document.querySelector('#sct_contrasenna');
    ppContrasenna.style.display = "none";
            reload();
        });
    }
}

function verificarContrasenna(sContrasenna, sConfirmacion) {

    let bError = true;

        if (sContrasenna == sConfirmacion){
            inputContrasennaActual.classList.remove('errorInput');
            inputConfirmacion.classList.remove('errorInput');
            bError = false;
        }
    return bError;
};



// style.backgroundImage = "url('" + getImgUrl(listaEntrenador[i]['foto_entrenador']) + "')";
let ppPerfil = document.querySelector('#sct_perfil');
let botonPerfil = document.querySelector('#btnPerfil');
botonPerfil.addEventListener('click', imprimirInfoPerfil);
botonPerfil.addEventListener('click', function () {
    ppPerfil.style.display = "block";
    window.onclick = function (event) {
        if (event.target == ppPerfil) {
            ppPerfil.style.display = "none";
        }
    }
});


