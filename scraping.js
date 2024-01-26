const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');

const app = express();
const url = 'https://elpais.com/ultimas-noticias/';


app.get('/', async (req, res) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        let noticias = [];

        $('.b-st_a article.c.c-d.c--m').each((index, element) => {
            const titulo = $(element).find('header.c_h').text().trim();
            const imagen = $(element).find('img').attr('src');
            const descripcion = $(element).find('p.c_d').text().trim();
            const enlace = $(element).find('a').attr('href');
        
        
        const noticia = {
            titulo: titulo,
            imagen: imagen,
            descripcion: descripcion,
            enlace: enlace,
          };

        noticias.push(noticia)
        console.log(noticias)
        })
        
        //   Una vez tengamos todo guardaremos los datos del array de la siguiente manera
        //   ```javascript 

        fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
        console.log(noticias)
       
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
})

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000');
});


