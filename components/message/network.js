const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
const path = require('path');

// Se sube a carpeta public/files/ y se agrega con la extensión original del archivo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const upload = multer({
    storage: storage
});

const router = express.Router();

router.get('/', function(req, res) {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages).then((messageList) => {
        response.success(req, res, messageList, 200);
    })
    .catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    })
});

router.post('/', upload.single('file'), function(req, res) {

    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then(fullMessage => {
        response.success(req, res, fullMessage, 201);
    })
    .catch(e => {
        response.error(req, res, 'Información invalida', 400, 'Error en el controlador');
    });
});

router.patch('/:id', function(req, res) {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.delete('/:id', function(req, res) {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;