'use strict';

let sedeModel = require('./sedes.model');

module.exports.registrar = function (req, res) {
    let nuevaSede = new sedeModel({
        nombre_sede: req.body.nombre_sede,
        dirExacta_sede: req.body.dirExacta_sede,
        latitud_sede: req.body.latitud_sede,
        longitud_sede: req.body.longitud_sede,
        estado_sede: req.body.estado_sede,
    });

    nuevaSede.save(function (error) {
        if (error) {
            res.json({
                succes: false,
                msj: 'La sede no pudo ser registrada: ' + error
            });

        } else {
            res.json({
                succes: true,
                msjs: 'La sede ha sido registrada con éxito'
            });
        }
    });
};

module.exports.listar = function (req, res) {
    sedeModel.find().sort({ nombre_sede: 'asc' }).then(
        function (sedes) {
            res.send(sedes);
        });
};

module.exports.buscar_sede_por_id = function (req, res) {
    sedeModel.findById({ _id: req.body._id }).then(
        function (sede) {
            res.send(sede);
        }
    );
};

module.exports.modificar_sede = function (req, res) {
    sedeModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'La sede no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

module.exports.eliminar_sede = function (req, res) {
    sedeModel.findByIdAndDelete(req.body._id,
        function (err, sede) {
            if (err) {
                res.json({ success: false, msg: 'La sede no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};