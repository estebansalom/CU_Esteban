'use strict';
const express = require('express');
const router = express.Router();
const periodos = require('./periodos.api');

router.route('/registrar_periodo')
    .post(function(req, res){
    periodos.registrar_periodo(req, res);
});

router.route('/listar_periodos')
    .get(function(req, res) {
        periodos.listar(req, res);
});

module.exports = router;