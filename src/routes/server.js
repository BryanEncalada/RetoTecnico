const express = require('express');
const { dbConnection } = require('../config/database');
const cors = require('cors');
const morgan = require('morgan');

class Server {

    constructor() {
        this.app = express()
        this.puerto = process.env.PORT;
        this.FilmPatch = '/api/Films';

        this.concetarBD();
        this.middlewares();
        this.routes();

    }


    async concetarBD() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.FilmPatch, require('../routes/filmRoutes'));
    }

    listen() {
        this.app.listen(this.puerto, () => {

            console.log('Servidor corriendo en el puerto', process.env.PORT);
        })
    }
}

module.exports = Server;