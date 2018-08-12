'use strict';

let windowLocation = window.location.href;
let listaUsuarios = obtenerLista_Usuarios();

// Inicio iniciar sesion
let inputCorreo = document.querySelector('#txtCorreo');
let inputContrasenna = document.querySelector('#txtContrasenna');
let botonIngresar = document.querySelector('#btnIngresar');
botonIngresar.addEventListener('click', obtenerDatosInicio);

let sCorreo = "";
let sContrasenna = "";

function obtenerDatosInicio() {
    localStorage.clear();
    sCorreo = inputCorreo.value;
    sContrasenna = inputContrasenna.value;

    // validar pequenno
    if (sCorreo == "") {
        inputCorreo.classList.add('errorInput');
    } else {
        inputCorreo.classList.remove('errorInput');
    }
    if (sContrasenna == "") {
        inputContrasenna.classList.add('errorInput');
    } else {
        inputContrasenna.classList.remove('errorInput');
    }
    // validar pequenno

    let bError = false;
    bError = verificarCredenciales(sCorreo, sContrasenna);
    if (bError) {
        swal({
            title: 'No se pudo iniciar sesión',
            text: 'Verifique que el correo y la contraseña estén bien escritos',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        /*localStorage.getItem('firstLog');
        checkFirstLog(firstLog);*/
        accionRol(localStorage.getItem('rolUsuario'));
        
    }
}
// ssotom@ucenfotec.ac.cr
// 121000
function verificarCredenciales(sCorreo, sContrasenna) {

    let bError = true;
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (sCorreo === listaUsuarios[i]['correo_usuario']) {
            if (sContrasenna == listaUsuarios[i]['contrasenna_usuario']) {

                let nombreCompleto = listaUsuarios[i]['nombre_usuario']+' '+listaUsuarios[i]['primer_apellido_usuario']+' '+listaUsuarios[i]['segundo_apellido_usuario']
                localStorage.setItem('idUsuario', listaUsuarios[i]['_id']);
                localStorage.setItem('rolUsuario', listaUsuarios[i]['rol_usuario']);
                localStorage.setItem('contrasennaUsuario', sContrasenna);
                localStorage.setItem('firstLog', listaUsuarios[i]['first_log'])
                localStorage.setItem('nombreCompletoUsuario', nombreCompleto);


                inputContrasenna.classList.remove('errorInput');
                bError = false;
                break;
            }
        }
    }
    return bError;
}
function accionRol(psRol) {
    switch (psRol) {
        case 'Administrador':
            window.location.href = "../html/dashboard/dashboard_usuarios.html";
            break;
        case 'Rector':
            window.location.href = "../html/dashboard/dashboard_usuarios.html";
            break;
        case 'Decanatura':
            window.location.href = "../html/dashboard/dashboard_usuarios.html";
            break;
        case 'Asistente de decanatura':
            window.location.href = "../html/dashboard/dashboard_usuarios.html";
            break;
        case 'Profesor':
            window.location.href = "../html/dashboard/dashboard_bitacora.html";
            break;
        case 'Asistente':
            window.location.href = "../html/dashboard/dashboard_bitacora.html";
            break;

    }
}

/*function checkFirstLog() {
    if(firstLog){
        
    }
}*/

// Contrasenna visible o no
let botonVer = document.querySelector('#btnVerContrasenna');
botonVer.addEventListener('click', function () {
    let isOpen = botonVer.classList.contains('fa-eye');
    if (isOpen) {
        botonVer.classList.remove('fa-eye');
        botonVer.classList.add('fa-eye-slash');
        inputContrasenna.type = 'password';
    } else {
        botonVer.classList.remove('fa-eye-slash');
        botonVer.classList.add('fa-eye');
        inputContrasenna.type = 'text';
    }
});

// Fin iniciar sesion

// Inicio formulario
let popup = document.querySelector('.popup-bg');
let botonIniciar = document.querySelector('#btnIniciar');
botonIniciar.addEventListener('click', function () {
    popup.style.display = "block";
});

// Esto es para que se salga del formulario si toca fuera del contenido
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
        inputContrasenna.value = "";
        inputCorreo.value = "";
        inputCorreo.classList.remove('errorInput');
        inputContrasenna.classList.remove('errorInput');
    }
}
// Esto es para que despliegue el formulario