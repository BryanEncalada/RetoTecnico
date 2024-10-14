const Server = require("./routes/server");
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../swaggerOptions'); 
const { Router } = require("express");
const router = Router();
const { getFilmsData, addFilmData } = require("./controllers/filmsController");
require("dotenv").config();

const app = express();
app.use(express.json()); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen((process.env.PORTDOC), () => {
  console.log("Servidor corriendo en http://localhost:" + process.env.PORTDOC);
  console.log("Documentación disponible en http://localhost:"+ process.env.PORTDOC +"/api-docs");
}); 

app.get("/films", getFilmsData); // Se define la ruta para obtener los datos de Films
app.post("/films", addFilmData); // Se define la ruta para agregar datos de Films

module.exports.getFilmsData = getFilmsData;  // Se exporta la función getFilmsData
module.exports.addFilmData = addFilmData;    // Se exporta la función addFilmData


 //Se uso para realizar pruebas de funcionamiento de manera local con npm  start en node.js
// const serve = new Server();
//  serve.listen();