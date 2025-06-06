const express = require('express');
const { assert } = require('superstruct');
const { SignUpDto } = require('../dtos/users.dto');
const { db } = require('../utils/db');

const router = express.Router();

// GET /users/list
router.get('/list', async function(req, res, next) {
  const users = await db.user.findMany({
    include: {
      userPreference: true,
    },
  });

  res.json(users);
});

// POST /users/signup
router.post('/signup', async function(req, res, next) {
  assert(req.body, SignUpDto);

  const { email, firstName, lastName, userPreference } = req.body;
  const { receiveEmail } = userPreference;

  const result = await db.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: { email, firstName, lastName },
    });

    await prisma.userPreference.create({
      data: { receiveEmail, userId: user.id }
    });

    return user;
  });

  res.json({ id: result.id });
});

// ✅ 라우터 전체를 내보내는 건 바깥에 있어야 함!
module.exports = router;