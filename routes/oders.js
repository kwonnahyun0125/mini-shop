const express = require('express');
const { assert } = require('superstruct');
const { CreateDto } = require('../dtos/orders.dto');
const { db } = require('../utils/db');

const router = express.Router();

router.post('/create', async function (req, res, next) {
  assert(req.body, CreateDto);

  const { userId, productId } = req.body;

  try {
    const result = await db.$transaction(async (prisma) => {
      // 유저 확인
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new Error('User not found');

      // 상품 확인
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) throw new Error('Product not found');

      if (product.stock <= 0) throw new Error('Product out of stock');

      // 주문 생성
      const order = await prisma.order.create({
        data: { userId, productId },
      });

      // 재고 감소
      await prisma.product.update({
        where: { id: productId },
        data: {
          stock: {
            decrement: 1,
          },
        },
      });

      return order;
    });

    res.json({ id: result.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;