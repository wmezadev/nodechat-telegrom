const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', function(req, res) {
    controller.getUser()
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, 'Información invalida', 500, 'Error en el controlador');
    })
});

router.post('/', function(req, res) {
    controller.addUser(req.body.name)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(e => {
        response.error(req, res, 'Información invalida', 500, 'Error en el controlador');
    });
});


module.exports = router;