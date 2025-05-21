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

  const user = await db.user.create({
    data: { email, firstName, lastName },
  });

  await db.userPreference.create({
    data: { receiveEmail, userId: user.id }
  });

  res.json({ id: user.id });
});

module.exports = router;