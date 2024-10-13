const Server = require("./routes/server");
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../swaggerOptions'); 
require("dotenv").config();

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen((process.env.PORTDOC), () => {
  console.log("Servidor corriendo en http://localhost:" + process.env.PORTDOC);
  console.log("Documentación disponible en http://localhost:"+ process.env.PORTDOC +"/api-docs");
});
 
const serve = new Server();
serve.listen();