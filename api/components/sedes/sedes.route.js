'use strict';
const express = require('express');
const router = express.Router();
const sedes = require('./sedes.api');

router.route('/registrar_sedes')
    .post(function (req, res) {
        sedes.registrar(req, res);
    });

router.route('/listar_sedes')
    .get(function (req, res) {
        sedes.listar(req, res);
    });

router.route('/buscar_sede_id')
    .post(function (req, res) {
        sedes.buscar_sede_por_id(req, res);
    });

router.route('/modificar_sede')
    .post(function (req, res) {
        sedes.modificar_sede(req, res);
    });

router.route('/eliminar_sede')
    .post(function (req, res) {
        sedes.eliminar_sede(req, res);
    });


module.exports = router;