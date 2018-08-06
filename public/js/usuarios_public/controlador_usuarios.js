'use strict'
mostrarListaUsuarios();

let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatosUsuario);

const elementoImagen = document.querySelector('#txtImagen');
let inputNombre = document.querySelector('#txtNombre');
let inputPrimerApellido = document.querySelector('#txtPrimerApellido');
let inputSegundoApellido = document.querySelector('#txtSegundoApellido');
let inputCedula = document.querySelector('#txtCedula');
let inputFecha = document.querySelector('#dateFecha');
let inputCorreo = document.querySelector('#txtCorreo');
let inputTelefono = document.querySelector('#txtTelefono');
let inputDireccion = document.querySelector('#txtDireccion');
let inputProvincia = document.querySelector('#sltProvincia')
let inputCanton = document.querySelector('#sltCanton')
let inputDistrito = document.querySelector('#sltDistrito')
let inputRol = document.querySelector('#txtRol');

let regexSoloLetras = /^[A-Za-z]*\s()[A-Za-z]*$/;
let regexSoloNumeros = /^[0-9]+$/;
let regexCorreo = /^[a-zA-Z0-9._]+@ucenfotec.ac.cr+$/;
let regexCedula = /^[1-9]-?\d{4}-?\d{4}$/;

let dHoy = new Date();

let sNombre = '';
let sPrimerApellido = '';
let sSegundoApellido = '';
let nCedula = 0;
let dFecha = '';
let sCorreo = '';
let nTelefono = 0;
let sDireccion = '';
let sProvincia = '';
let sCanton = '';
let sDistrito = '';
let sRol = '';


let inputBuscar = document.querySelector('#txtBusqueda');
let popup;

// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaUsuarios(busqueda);
});


// Listar
function mostrarListaUsuarios(paBuscar) {
    let listaUsuarios = obtenerLista_Usuarios();
    let tbody = document.querySelector('#tblUsuarios tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {
        if ((listaUsuarios[i]['nombre_usuario'].toLowerCase().includes(paBuscar.toLowerCase()))) {
            let fila = tbody.insertRow();
            let celdaFoto = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaRol = fila.insertCell();
            let celdaVerMas = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            let imagen = document.createElement('img');
                imagen.src = listaUsuarios[i]['foto_usuario'];
                imagen.classList.add('imageSettings');
                celdaFoto.appendChild(imagen);

            //    Esto separa el nombre de los apellidos
            let sNombre = listaUsuarios[i]['nombre_usuario'];
            let sPrimerApellido = listaUsuarios[i]['primer_apellido_usuario'];
            let sSegundoApellido = listaUsuarios[i]['segundo_apellido_usuario'];
        
            let nombreSpan = crearSpan(sNombre + ' ' + sPrimerApellido + ' ' + sSegundoApellido);
            let rolSpan = crearSpan(listaUsuarios[i]['rol_usuario']);

            celdaNombre.appendChild(nombreSpan);
            celdaRol.appendChild(rolSpan);

            //Este es el boton de ver mas info
            let botonVerMas = document.createElement('button');
            botonVerMas.classList.add('boton-ver-mas');
            botonVerMas.innerHTML = "Ver mas informacion";
            celdaVerMas.appendChild(botonVerMas);


            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');
            celdaOpciones.appendChild(botonEditar);



            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');


            celdaOpciones.appendChild(botonEliminar);
            // Este es el boton de eliminar



            // Este es el boton de asociar
            let botonAsociar = document.createElement('span');
            botonAsociar.classList.add('fas');
            botonAsociar.classList.add('fa-link');
            celdaOpciones.appendChild(botonAsociar);

        }
    };
};

// Funcion que recibe un parametro y crea un span con ese texto.
function crearSpan(pInfo) {
    let nuevoSpan = document.createElement('span');
    nuevoSpan.textContent = pInfo;
    return nuevoSpan;
}


// Registrar
// Registrar
// Registrar

function obtenerDatosUsuario() {
    let infoUsuario = [];
    sNombre = inputNombre.value;
    sPrimerApellido = inputPrimerApellido.value;
    sSegundoApellido = inputSegundoApellido.value;
    nCedula = inputCedula.value;
    dFecha = inputFecha.value;
    sCorreo = inputCorreo.value;
    nTelefono = inputTelefono.value;
    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;
    sRol = inputRol.value;

    let bError = false;
    bError = validarUsuario();
    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su usuario, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'el usuario se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoUsuario.push(imagenUrl, sNombre, sPrimerApellido, sSegundoApellido, nCedula, dFecha, sCorreo, nTelefono, sDireccion, sProvincia, sDistrito, sCanton, sRol);
        registrar_Usuarios(infoUsuario);
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        limpiarFormulario();
    }
};

function validarUsuario() {
    let bError = false;
    sNombre = inputNombre.value;
    sPrimerApellido = inputPrimerApellido.value;
    sSegundoApellido = inputSegundoApellido.value;
    nCedula = Number(inputCedula.value);
    dFecha = new Date(inputFecha.value);
    let dHoy = new Date();
    sCorreo = inputCorreo.value;
    nTelefono = Number(inputTelefono.value);
    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;
    sRol = inputRol.value;

    // Validacion contra blancos
    let arregloInputs = document.querySelectorAll('input:required');
    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    };

    

    return bError;
};

function limpiarFormulario() {
    inputNombre.value = "";
    inputPrimerApellido.value = "";
    inputSegundoApellido.value = "";
    inputCedula.value = 0;
    inputFecha.value = "";
    inputCorreo.value = "";
    inputTelefono.value = 0;
    inputDireccion.value = "";
    inputProvincia.value = "";
    inputCanton.value = "";
    inputDistrito.value = "";
    inputRol.value = "";
};

// Display formulario registrar
let botonAgregar = document.querySelector('#btnAgregar');
botonAgregar.addEventListener('click', function () {
    popup = document.querySelector('#sct_registrar');
    popup.style.display = "block";
});

// Esto es para que se salga del formulario si toca fuera del contenido
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
        limpiarFormulario();
    }
}
function clean() {
    popup.style.display = "none";
    limpiarFormulario();
}
function reload() {
    location.reload();
}
// Esto es para que despliegue el formulario