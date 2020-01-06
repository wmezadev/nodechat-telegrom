require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

db.connect(process.env.DB_URI);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);

router(app);

app.use('/app', express.static('public'));
server.listen(process.env.APP_PORT, function() {
    console.log(`La aplicación está escuchando en ${process.env.APP_URL}:${process.env.APP_PORT}`);
});