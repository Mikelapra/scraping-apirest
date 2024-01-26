const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// con estas líneas podremos leer, guardar y usar los datos del archivo `noticias.json` para poder trabajar con ellos.

// ```javascript 
let noticias = [];

// Leer datos desde el archivo JSON
function leerDatos() {
  try {
    const data = fs.readFileSync('noticias.json', 'utf-8');
    noticias = JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo noticias.json:', error.message);
  }
}

// Guardar datos en el archivo JSON
function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
  }

app.get('/noticias', (req, res) => {
    leerDatos();
    res.json(noticias);
  });

app.post('/noticias', (req, res) => {
    leerDatos();
    const nuevaNoticia = req.body;
    noticias.push(nuevaNoticia);

    guardarDatos()})


    app.listen(3001, () => {
    console.log('Express está escuchando en el puerto http://localhost:3001');
});

