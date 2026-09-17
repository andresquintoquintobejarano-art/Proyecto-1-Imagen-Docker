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

// GET /products -> listar todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// GET /products/:id -> obtener un producto por id
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: `Producto con id ${id} no encontrado` });
  }

  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;
