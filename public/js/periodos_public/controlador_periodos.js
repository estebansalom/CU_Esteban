'use strict';
mostrarListaPeriodos();

let inputBuscar = document.querySelector('#txtBusqueda');
let popup;

// Buscar
// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaPeriodos(busqueda);
});

// Listar
// Listar
// Listar
function mostrarListaPeriodos(paBuscar) {
    let listaPeriodos = obtenerListaPeriodos();
    let tbody = document.querySelector('#tblPeriodos tbody');
    tbody.innerHTML = '';
    if (paBuscar != undefined) {
        for (let i = 0; i < listaPeriodos.length; i++) {
            if (listaPeriodos[i]['nombre_periodo'].toLowerCase().includes(paBuscar.toLowerCase())) {
                let fila = tbody.insertRow();
                let celdaNombre = fila.insertCell();
                let celdaEstado = fila.insertCell();
                let celdaOpciones = fila.insertCell();

                celdaNombre.innerHTML = listaPeriodos[i]['nombre_periodo'];
                celdaEstado.innerHTML = listaPeriodos[i]['estado_periodo'];
                // Fecha de creacion

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
        for (let i = 0; i < listaPeriodos.length; i++) {
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            celdaNombre.innerHTML = listaPeriodos[i]['nombre_periodo'];
            celdaEstado.innerHTML = listaPeriodos[i]['estado_periodo'];


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
botonRegistrar.addEventListener('click', obtenerDatos)

let inputNombre = document.querySelector("#txtNombre");
let inputEstado = document.querySelector("#txtEstado");

let sNombre = '';
let sEstado = '';

let regexCodigo = /^[a-zA-Z0-9-]+$/;

function obtenerDatos() {
    let infoPeriodo = [];

    sNombre = inputNombre.value;
    sEstado = inputEstado.value;

    let bError = false;
    bError = validar();

    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la Periodo, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'La Periodo se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoPeriodo.push(sNombre, sEstado);
        registrarPeriodo(infoPeriodo);
        $('.swal2-confirm').click(function () {
            clean();
            reload();
        });
        limpiarFormulario();
    }
};
function validar() {
    let bError = false;
    sNombre = inputNombre.value;
    sEstado = inputEstado.value;

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

    // Validacion para el nombre
    if (regexCodigo.test(sNombre) == false) {
        bError = true;
        inputNombre.classList.add('errorInput');
    } else {
        inputNombre.classList.remove('errorInput');
    };

}
function limpiarFormulario() {
    inputNombre.value = "";
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
function reload(){
    location.reload();
}
// Esto es para que despliegue el formulario