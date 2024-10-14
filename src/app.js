const Server = require("./routes/server");
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../swaggerOptions'); 
const { Router } = require("express");
const router = Router();
const { getFilmsData, addFilmData } = require("./controllers/filmsController");
require("dotenv").config();

const app = express();
app.use(express.json()); // Para poder leer el cuerpo de las solicitudes en formato JSON
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen((process.env.PORTDOC), () => {
  console.log("Servidor corriendo en http://localhost:" + process.env.PORTDOC);
  console.log("Documentación disponible en http://localhost:"+ process.env.PORTDOC +"/api-docs");
});


app.get("/films", getFilmsData);
app.post("/films", addFilmData);


module.exports.getFilmsData = getFilmsData;  // Asegúrate de que esta línea esté aquí
module.exports.addFilmData = addFilmData;    // Y esta también





 
// const serve = new Server();
//  serve.listen();