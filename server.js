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

// POST /products -> crear un nuevo producto
app.post('/products', (req, res) => {
  const { nombre, precio, stock } = req.body;

  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({
      error: 'Los campos nombre, precio y stock son obligatorios'
    });
  }

  const newProduct = {
    id: nextId++,
    nombre,
    precio,
    stock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /products/:id -> actualizar un producto existente
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: `Producto con id ${id} no encontrado` });
  }

  const { nombre, precio, stock } = req.body;
  if (nombre !== undefined) product.nombre = nombre;
  if (precio !== undefined) product.precio = precio;
  if (stock !== undefined) product.stock = stock;

  res.json(product);
});

// DELETE /products/:id -> eliminar un producto
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Producto con id ${id} no encontrado` });
  }

  const deleted = products.splice(index, 1)[0];
  res.json({ mensaje: 'Producto eliminado', producto: deleted });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;
