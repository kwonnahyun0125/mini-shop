const express = require('express');
const { assert } = require('superstruct');
const { CreateDto } = require('../dtos/products.dto');
const { db } = require('../utils/db');

const router = express.Router();

// GET /products/list
router.get('/list', async function(req, res, next) {
  const products = await db.product.findMany();
  res.json(products);
});

// POST /products/create
router.post('/create', async function(req, res, next) {
  assert(req.body, CreateDto);

  const { name, description, category, price } = req.body;

  const product = await db.product.create({
    data: { name, description, category, price },
  });

  res.json({ id: product.id });
});

module.exports = router;