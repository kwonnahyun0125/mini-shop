var express = require('express');

const { assert } = require('superstruct');
const { SignUpDto } = require('../dtos/oders.dto');
const { db } = require('../utils/db');

var router = express.Router();

router.post('/create', async function(req, res, next) {
  assert(req.body, CreateDto);

  const { user_id, product_id } = req.body;

  // user_id 가 존재하는지 확인
  const user = await db.user.findUnique({
    where: { id: user_id },
  });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // product_id 가 존재하는지 확인
  const product = await db.product.findUnique({
    where: { id: product_id },
  });
  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }

  const order = await db.order.create({
    data: { user_id, product_id },
  });

  await db.product.update({
    where: { id: product_id },
    data: {
      stock: {
        decrement: 1,
      },
    },
  });

  res.json({ id: order.id });
});

module.exports = router;