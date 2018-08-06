
'use strict';
mostrarListaSedes();

let inputBuscar = document.querySelector('#txtBusqueda');

// Buscar
// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaSedes(busqueda);
});

// Listar
// Listar
// Listar
function mostrarListaSedes(paBuscar) {
    let listaSedes = obtenerListaSedes();
    let tbody = document.querySelector('#tblSedes tbody');
    tbody.innerHTML = '';
    if (paBuscar != undefined) {
        for (let i = 0; i < listaSedes.length; i++) {
            if (listaSedes[i]['nombre_sede'].toLowerCase().includes(paBuscar.toLowerCase())) {
                let fila = tbody.insertRow();
                let celdaNombre = fila.insertCell();
                let celdaDirExacta = fila.insertCell();
                let celdaLatitud = fila.insertCell();
                let celdaLongitud = fila.insertCell();
                let celdaOpciones = fila.insertCell();

                celdaNombre.innerHTML = listaSedes[i]['nombre_sede'];
                celdaDirExacta.innerHTML = listaSedes[i]['dirExacta_sede'];
                celdaLatitud.innerHTML = listaSedes[i]['latitud_sede'];
                celdaLongitud.innerHTML = listaSedes[i]['longitud_sede'];


                // Este es el boton de editar
                let botonEditar = document.createElement('span');
                botonEditar.classList.add('fas');
                botonEditar.classList.add('fa-cogs');

                botonEditar.dataset._id = listaSedes[i]['_id'];
                botonEditar.addEventListener('click', buscar_por_id);
                botonEditar.addEventListener('click', function () {
                    popup = document.querySelector('#sct_registrar');
                    popup.style.display = "block";
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
    }
    else {
        for (let i = 0; i < listaSedes.length; i++) {
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaDirExacta = fila.insertCell();
            let celdaLatitud = fila.insertCell();
            let celdaLongitud = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaNombre.innerHTML = listaSedes[i]['nombre_sede'];
            celdaDirExacta.innerHTML = listaSedes[i]['dirExacta_sede'];
            celdaLatitud.innerHTML = listaSedes[i]['latitud_sede'];
            celdaLongitud.innerHTML = listaSedes[i]['longitud_sede'];


            // Este es el boton de editar
            let botonEditar = document.createElement('a');
            botonEditar.href = '#'// path del html editar lab
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');


            botonEditar.dataset._id = listaSedes[i]['_id'];

            botonEditar.addEventListener('click', buscar_por_id);
            botonEditar.addEventListener('click', function () {
                popup = document.querySelector('#sct_registrar');
                popup.style.display = "block";
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

        }

    }


};

// Registrar
// Registrar
// Registrar

let botonRegistrar = document.querySelector("#btnRegistrar");
let botonActualizar = document.querySelector("#btnActualizar");
let popup;
botonActualizar.hidden = true;

botonRegistrar.addEventListener('click', obtenerDatosRegistro);
botonActualizar.addEventListener('click', obtenerDatosActualizar);

let inputIdSede = document.querySelector('#txtId');
let inputNombreSede = document.querySelector("#txtNombre");
let inputDirExactaSede = document.querySelector("#txtDirExacta");
let inputLatitudSede = document.querySelector("#numLatitud");
let inputLongitudSede = document.querySelector("#numLongitud");


let sNombreSede = '';
let sDirExactaSede = '';
let sLatitudSede = 0;
let sLongitudSede = 0;
let sIdSede = '';

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexSoloNumeros = /^[0-99]+$/;

function obtenerDatosRegistro() {
    let infoSede = [];
    let bError = false;

    sIdSede = inputIdSede.value;
    sNombreSede = inputNombreSede.value;
    sDirExactaSede = inputDirExactaSede.value;
    sLatitudSede = inputLatitudSede.value;
    sLongitudSede = inputLongitudSede.value;

    infoSede.push(sIdSede, sNombreSede, sDirExactaSede, sLatitudSede, sLongitudSede);

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
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        registrarSede(infoSede);
        limpiarFormulario();
    }
};

function obtenerDatosActualizar() {
    let infoSede = [];
    let bError = false;


    sIdSede = inputIdSede.value;
    sNombreSede = inputNombreSede.value;
    sDirExactaSede = inputDirExactaSede.value;
    sLatitudSede = inputLatitudSede.value;
    sLongitudSede = inputLongitudSede.value;

    infoSede.push(sIdSede, sNombreSede, sDirExactaSede, sLatitudSede, sLongitudSede);

    bError = validarSedes();
    if (bError) {
        swal({
            title: 'Actualización incorrecta',
            text: 'No se pudo actualizar la sede, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Actualización correcto',
            text: 'La sede se actualizó correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        actualizarSede(infoSede);
        limpiarFormulario();
        botonRegistrar.hidden = false;
        botonActualizar.hidden = true;
    }

};

function validarSedes() {
    let bError = false;
    let arregloInputs = [];
    arregloInputs = document.querySelectorAll('input:required');

    sNombreSede = inputNombreSede.value;
    sLatitudSede = inputLatitudSede.value;
    sLongitudSede = inputLongitudSede.value;

    // Validacion contra blancos
    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInputs');
        } else {
            arregloInputs[i].classList.remove('errorInputs');
        }

        // Validacion para el nombre
        if (regexSoloLetras.test(sNombreSede) == false) {
            bError = true;
            inputNombreSede.classList.add('errorInputs');
        } else {
            inputNombreSede.classList.remove('errorInputs');
        }

        // Validacion para la longitud
        if (regexSoloNumeros.test(sLongitudSede) == false) {
            bError = true;
            inputLongitudSede.classList.add('errorInputs');
        } else {
            inputLongitudSede.classList.remove('errorInputs');
        }

        // Validacion para la latitud
        if (regexSoloNumeros.test(sLatitudSede) == false) {
            bError = true;
            inputLatitudSede.classList.add('errorInputs');
        } else {
            inputLatitudSede.classList.remove('errorInputs');
        }
    }
    return bError
};

function limpiarFormulario() {
    inputNombreSede.value = "";
    inputDirExactaSede.value = "";
    inputLatitudSede.value = 0;
    inputLongitudSede.value = 0;
};


function buscar_por_id() {
    //Binding
    let _id = this.dataset._id;
    botonRegistrar.hidden = true;
    botonActualizar.hidden = false;
    let sede = obtener_sede_por_id(_id);

    console.log(sede);

    inputIdSede.value = sede['_id'];
    inputNombreSede.value = sede['nombre_sede'];
    inputDirExactaSede.value = sede['dirExacta_sede'];
    inputLatitudSede.value = sede['latitud_sede'];
    inputLongitudSede.value = sede['longitud_sede'];
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
            obtenerListaSedes();
            mostrarListaSedes();
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
