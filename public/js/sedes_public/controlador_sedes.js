
'use strict';
mostrarListaSedes();

let botonRegistrar = document.querySelector("#btnRegistrar");
botonRegistrar.addEventListener('click', obtenerDatosRegistro);
let botonActualizar = document.querySelector("#btnActualizar");
botonActualizar.addEventListener('click', obtenerDatosActualizar);
let popup;

let inputIdSede = document.querySelector('#txtId');
let inputNombre = document.querySelector("#txtNombre");
let inputDirExacta = document.querySelector("#txtDirExacta");
let inputLatitud = document.querySelector("#numLatitud");
let inputLongitud = document.querySelector("#numLongitud");
let inputEstado = document.querySelector("#txtEstado");

let inputNombreActual = document.querySelector("#txtNombreActual");
let inputDirExactaActual = document.querySelector("#txtDirExactaActual");
let inputLatitudActual = document.querySelector("#numLatitudActual");
let inputLongitudActual = document.querySelector("#numLongitudActual");
let inputEstadoActual = document.querySelector("#txtEstadoActual");

let id = '';
let sNombre = '';
let sDirExacta = '';
let sLatitud = 0;
let sLongitud = 0;
let sEstado = '';

let sNombreActual = '';
let sDirExactaActual = '';
let sLatitudActual = 0;
let sLongitudActual = 0;
let sEstadoActual = '';


let regexDirExacta = /^[a-z0-9A-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexCoordenadas = /^[0-9.-]+$/;

// Buscar
// Buscar
// Buscar
let inputBuscar = document.querySelector('#txtBusqueda');

// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaSedes(busqueda);
});


// Listar
function mostrarListaSedes(paBuscar) {
    let listaSedes = obtenerListaSedes();
    let tbody = document.querySelector('#tblSedes tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {
        if ((listaSedes[i]['nombre_sede'].toLowerCase().includes(paBuscar.toLowerCase()))) {
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaDirExacta = fila.insertCell();
            let celdaLatitud = fila.insertCell();
            let celdaLongitud = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaNombre.innerHTML = listaSedes[i]['nombre_sede'];
            celdaDirExacta.innerHTML = listaSedes[i]['dirExacta_sede'];
            celdaLatitud.innerHTML = listaSedes[i]['latitud_sede'];
            celdaLongitud.innerHTML = listaSedes[i]['longitud_sede'];
            celdaEstado.innerHTML = listaSedes[i]['estado_sede'];


            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');
            botonEditar.dataset._id = listaSedes[i]['_id'];
            botonEditar.addEventListener('click', buscar_por_id);
            botonEditar.addEventListener('click', function () {
                ppActualizar.style.display = "block";

                // Agregar esto a los formularios que tengan mucho contenido (hace una animacion de scroll a la parte superior del formulario)
                $(".scroll").animate({ scrollTop: 0 }, "fast");
            });

            celdaOpciones.appendChild(botonEditar);

            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset._id = listaSedes[i]['_id'];
            botonEliminar.addEventListener('click', remover_sede);

            celdaOpciones.appendChild(botonEliminar);

            // Este es el boton de asociar
            let botonAsociar = document.createElement('span');
            botonAsociar.classList.add('fas');
            botonAsociar.classList.add('fa-link');

            celdaOpciones.appendChild(botonAsociar);

            // Icono de editar: <i class="fas fa-cogs"></i>
            // Icono de eliminar: <i class="fas fa-trash-alt"></i>
        }
    }
};


// Registrar
// Registrar
// Registrar
function obtenerDatosRegistro() {
    let infoSede = [];
    let bError = false;

    id = inputIdSede.value;
    sNombre = inputNombre.value;
    sDirExacta = inputDirExacta.value;
    sLatitud = inputLatitud.value;
    sLongitud = inputLongitud.value;
    sEstado = inputEstado.value;

    bError = validarSedes();
    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la sede, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La sede se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoSede.push(id, sNombre, sDirExacta, sLatitud, sLongitud, sEstado);
        registrarSede(infoSede);
        $('.swal2-confirm').click(function () {
        });
        reload();
    }
};


function validarSedes() {
    let bError = false;
    let arregloInputs = [];
    arregloInputs = document.querySelectorAll('#sct_registrar input:required');

    sNombre = inputNombre.value;
    sDirExacta = inputDirExacta.value;
    sLatitud = inputLatitud.value;
    sLongitud = inputLongitud.value;
    sEstado = inputEstado.value;

    // Validacion contra blancos
    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }

        // Validacion para el nombre
        if (regexSoloLetras.test(sNombre) == false) {
            bError = true;
            inputNombre.classList.add('errorInput');
        } else {
            inputNombre.classList.remove('errorInput');
        }

        // Validacion para la longitud
        if (regexCoordenadas.test(sLongitud) == false) {
            bError = true;
            inputLongitud.classList.add('errorInput');
        } else {
            inputLongitud.classList.remove('errorInput');
        }

        // Validacion para la latitud
        if (regexCoordenadas.test(sLatitud) == false) {
            bError = true;
            inputLatitud.classList.add('errorInput');
        } else {
            inputLatitud.classList.remove('errorInput');
        }
    }
    return bError
};

function buscar_por_id() {
    //Binding
    let _id = this.dataset._id;
    let sede = obtener_sede_por_id(_id);

    console.log(sede);

    inputIdSede.value = sede['_id'];
    inputNombreActual.value = sede['nombre_sede'];
    inputDirExactaActual.value = sede['dirExacta_sede'];
    inputLatitudActual.value = sede['latitud_sede'];
    inputLongitudActual.value = sede['longitud_sede'];
    inputEstadoActual.value = sede['estado_sede'];
};

function obtenerDatosActualizar() {
    let infoSedeActual = [];
    let bError = false;


    id = inputIdSede.value;
    sNombreActual = inputNombreActual.value;
    sDirExactaActual = inputDirExactaActual.value;
    sLatitudActual = inputLatitudActual.value;
    sLongitudActual = inputLongitudActual.value;
    sEstadoActual = inputEstadoActual;

    bError = validarSedesActualizar();
    if (bError) {
        swal({
            title: 'Actualización incorrecta',
            text: 'No se pudo actualizar la sede, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Actualización correcta',
            text: 'La sede se actualizó correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoSedeActual.push(id, sNombreActual, sDirExactaActual, sLatitudActual, sLongitudActual, sEstadoActual);
        actualizarSede(infoSedeActual);
        $('.swal2-confirm').click(function () {
        });
        reload();
    }

};

function validarSedesActualizar() {
    let bError = false;
    let arregloInputs = [];
    arregloInputs = document.querySelectorAll('#sct_modificar input:required');

    sNombreActual = inputNombreActual.value;
    sLatitudActual = inputLatitudActual.value;
    sLongitudActual = inputLongitudActual.value;

    // Validacion contra blancos
    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }

        // Validacion para el nombre
        if (regexSoloLetras.test(sNombreActual) == false) {
            bError = true;
            inputNombreActual.classList.add('errorInput');
        } else {
            inputNombreActual.classList.remove('errorInput');
        }

         // Validacion para la latitud
         if (regexCoordenadas.test(sLatitudActual) == false) {
            bError = true;
            inputLatitudActual.classList.add('errorInput');
        } else {
            inputLatitudActual.classList.remove('errorInput');
        }

        // Validacion para la longitud
        if (regexCoordenadas.test(sLongitudActual) == false) {
            bError = true;
            inputLongitudActual.classList.add('errorInput');
        } else {
            inputLongitudActual.classList.remove('errorInput');
        }    
    }
    return bError
};


function remover_sede() {
    let _id = this.dataset._id;
    swal({
        title: 'Está seguro?',
        text: "La sede se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminarSede(_id);
            reload();
            swal(
                'Eliminado!',
                'La sede ha sido eliminado con éxito',
                'success'
            )
        }
    });

};


// Display formulario registrar
let botonAgregar = document.querySelector('#btnAgregar');

let ppRegistrar = document.querySelector('#sct_registrar');
let ppActualizar = document.querySelector('#sct_modificar');

botonAgregar.addEventListener('click', function () {
    ppRegistrar.style.display = "block";
});

window.onclick = function (event) {
    if (event.target == ppRegistrar) {
        ppRegistrar.style.display = "none";
        limpiarFormularioRegistrar();
        // Actualizar en cada caso de uso
    }
    if (event.target == ppActualizar) {
        ppActualizar.style.display = "none";
        limpiarFormularioModificar();
    }

}


function limpiarFormularioRegistrar() {
    inputNombre.value = "";
    inputDirExacta.value = "";
    inputLatitud.value = 0;
    inputLongitud.value = 0;
    inputEstado.value = "";
};

function limpiarFormularioModificar() {
    inputNombreActual.value = "";
    inputDirExactaActual.value = "";
    inputLatitudActual.value = 0;
    inputLongitudActual.value = 0;
    inputEstadoActual.value = "";
};

function reload() {
    mostrarListaSedes();
    limpiarFormularioModificar();
    limpiarFormularioRegistrar();
    ppRegistrar.style.display = "none";
    ppActualizar.style.display = "none";
};
// Esto es para que despliegue el formulario
