const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// "Base de datos" en memoria
let products = [
  { id: 1, nombre: 'Teclado mecánico', precio: 180000, stock: 25 },
  { id: 2, nombre: 'Mouse inalámbrico', precio: 65000, stock: 40 },
  { id: 3, nombre: 'Monitor 24"', precio: 620000, stock: 10 }
];
let nextId = 4;

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de productos - Tienda Virtual',
    endpoints: [
      'GET /products',
      'GET /products/:id',
      'POST /products',
      'PUT /products/:id',
      'DELETE /products/:id'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;
