require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Rutas para el acortador de URL
app.post('/api/shorturl', function(req, res) {
  const originalUrl = req.body.url; // Suponiendo que el cliente envía la URL en el cuerpo de la solicitud
  const shortUrl = generateShortUrl(); // Implementa tu lógica para generar un short URL aquí

  // Almacenar la relación short URL - original URL en la base de datos o en memoria
  // Esto es solo un ejemplo, debes ajustarlo según tu configuración
  shortUrlDatabase[shortUrl] = originalUrl;

  res.json({ original_url: originalUrl, short_url: shortUrl });
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrl = req.params.short_url;
  const originalUrl = shortUrlDatabase[shortUrl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'Invalid short URL' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
